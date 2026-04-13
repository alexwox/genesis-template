import { logger } from "@/lib/logger";
import { getPaymentsEnv, assertProviderEnv } from "@/lib/payments/config";
import type { CommerceAddress, CommerceCartItemSnapshot } from "@/lib/db/schema/commerce";
import { CommerceError } from "@/lib/commerce/errors";
import {
  attachProviderCheckoutToDraft,
  createOrderClaim,
  findCheckoutById,
  findCheckoutByProviderCheckoutId,
  findOrderByCheckoutId,
  insertCheckoutDraft,
  insertOrderFromCheckout,
  markCheckoutCompleted,
} from "@/lib/commerce/repository";
import { getCommerceProduct } from "@/lib/commerce/catalog";
import { createProviderCheckoutSessionForGuest } from "@/lib/commerce/provider-checkout";
import { createClaimToken } from "@/lib/commerce/claims";
import type {
  FinalizeGuestCheckoutInput,
  GuestCheckoutInput,
  GuestCheckoutResponse,
} from "@/lib/commerce/types";

export { claimGuestOrder } from "@/lib/commerce/claims";

const CLAIM_TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const checkoutLog = logger.child({ scope: "commerce.checkout" });
const webhookLog = logger.child({ scope: "commerce.webhook" });

type ValidatedCart = {
  cartSnapshot: CommerceCartItemSnapshot[];
  currency: string;
  subtotalAmount: number;
  requiresShipping: boolean;
};

function assertShippingAddress(address: CommerceAddress | undefined): CommerceAddress {
  if (!address) {
    throw new CommerceError(
      "Shipping address is required for physical products.",
      "VALIDATION",
    );
  }
  return address;
}

function validateCart(items: GuestCheckoutInput["items"]): ValidatedCart {
  let subtotalAmount = 0;
  let currency: string | null = null;
  let requiresShipping = false;
  const cartSnapshot: CommerceCartItemSnapshot[] = [];

  for (const item of items) {
    const product = getCommerceProduct(item.sku);
    if (!product) {
      throw new CommerceError(
        `Unknown product sku '${item.sku}'.`,
        "VALIDATION",
      );
    }

    if (currency && currency !== product.currency) {
      throw new CommerceError(
        "Mixed currencies in one checkout are not supported.",
        "VALIDATION",
      );
    }
    currency = product.currency;

    const totalAmount = product.unitAmount * item.quantity;
    subtotalAmount += totalAmount;
    requiresShipping = requiresShipping || product.requiresShipping;

    cartSnapshot.push({
      sku: product.sku,
      title: product.title,
      kind: product.kind,
      quantity: item.quantity,
      unitAmount: product.unitAmount,
      totalAmount,
      currency: product.currency,
      requiresShipping: product.requiresShipping,
    });
  }

  if (!currency) {
    throw new CommerceError("Checkout cannot be empty.", "VALIDATION");
  }

  return {
    cartSnapshot,
    currency,
    subtotalAmount,
    requiresShipping,
  };
}


export async function createGuestCheckoutSession(
  input: GuestCheckoutInput,
): Promise<GuestCheckoutResponse> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);

  const validated = validateCart(input.items);
  const shippingAddress = validated.requiresShipping
    ? assertShippingAddress(input.shippingAddress)
    : null;
  const checkoutId = crypto.randomUUID();
  const totals = {
    subtotalAmount: validated.subtotalAmount,
    taxAmount: 0,
    shippingAmount: 0,
    totalAmount: validated.subtotalAmount,
  };

  await insertCheckoutDraft({
    id: checkoutId,
    provider: env.provider,
    status: "draft",
    buyerEmail: input.buyerEmail,
    buyerName: input.buyerName,
    buyerPhone: input.buyerPhone,
    currency: validated.currency,
    requiresShipping: validated.requiresShipping,
    shippingAddress,
    cartSnapshot: validated.cartSnapshot,
    ...totals,
    expiresAt: new Date(Date.now() + 1000 * 60 * 30),
    metadata: input.metadata,
  });

  const providerCheckout = await createProviderCheckoutSessionForGuest({
    checkoutId,
    buyerEmail: input.buyerEmail,
    successUrl: input.successUrl,
    cancelUrl: input.cancelUrl,
    cartSnapshot: validated.cartSnapshot,
    requiresShipping: validated.requiresShipping,
  });

  await attachProviderCheckoutToDraft({
    checkoutId,
    providerCheckoutId: providerCheckout.providerCheckoutId,
    providerOrderId: providerCheckout.providerOrderId,
    providerCustomerId: providerCheckout.providerCustomerId,
    checkoutUrl: providerCheckout.url,
    status: "provider_pending",
  });

  checkoutLog.info("Guest checkout draft created", {
    checkoutId,
    provider: env.provider,
    itemCount: validated.cartSnapshot.length,
    requiresShipping: validated.requiresShipping,
  });

  return { checkoutId, url: providerCheckout.url };
}

export async function finalizeGuestCheckout(
  input: FinalizeGuestCheckoutInput,
): Promise<{ orderId: string; claimToken: string | null }> {
  const checkout = await findCheckoutById(input.checkoutId);
  if (!checkout) {
    throw new CommerceError("Checkout was not found.", "NOT_FOUND");
  }

  const existingOrder = await findOrderByCheckoutId(input.checkoutId);
  if (existingOrder) {
    return { orderId: existingOrder.id, claimToken: null };
  }

  await markCheckoutCompleted({
    checkoutId: input.checkoutId,
    providerCheckoutId: input.providerCheckoutId ?? checkout.providerCheckoutId,
    providerOrderId: input.providerOrderId ?? checkout.providerOrderId,
    providerCustomerId: input.providerCustomerId ?? checkout.providerCustomerId,
    status: "completed",
    metadata: {
      ...(checkout.metadata ?? {}),
      ...(input.metadata ?? {}),
    },
  });

  const orderId = crypto.randomUUID();
  await insertOrderFromCheckout({
    orderId,
    checkoutId: checkout.id,
    provider: input.provider,
    status: "paid",
    buyerEmail: checkout.buyerEmail,
    buyerName: checkout.buyerName,
    buyerPhone: checkout.buyerPhone,
    currency: checkout.currency,
    subtotalAmount: checkout.subtotalAmount,
    taxAmount: checkout.taxAmount,
    shippingAmount: checkout.shippingAmount,
    totalAmount: checkout.totalAmount,
    requiresShipping: checkout.requiresShipping,
    shippingAddress: checkout.shippingAddress,
    providerCheckoutId: input.providerCheckoutId ?? checkout.providerCheckoutId,
    providerOrderId: input.providerOrderId ?? checkout.providerOrderId,
    providerCustomerId: input.providerCustomerId ?? checkout.providerCustomerId,
    paidAt: input.paidAt ?? new Date(),
    metadata: input.metadata,
    cartSnapshot: checkout.cartSnapshot,
  });

  const claim = createClaimToken();
  await createOrderClaim({
    id: crypto.randomUUID(),
    orderId,
    email: checkout.buyerEmail,
    tokenHash: claim.hash,
    expiresAt: new Date(Date.now() + CLAIM_TOKEN_TTL_MS),
  });

  webhookLog.info("Guest checkout finalized", {
    checkoutId: checkout.id,
    orderId,
    provider: input.provider,
  });

  return { orderId, claimToken: claim.raw };
}

export async function finalizeGuestCheckoutByProviderCheckout(input: {
  provider: "stripe" | "polar";
  providerCheckoutId: string;
  providerOrderId?: string | null;
  providerCustomerId?: string | null;
  paidAt?: Date | null;
  metadata?: Record<string, unknown>;
}): Promise<{ orderId: string; claimToken: string | null } | null> {
  const checkout = await findCheckoutByProviderCheckoutId(
    input.provider,
    input.providerCheckoutId,
  );
  if (!checkout) {
    return null;
  }
  return finalizeGuestCheckout({
    provider: input.provider,
    checkoutId: checkout.id,
    providerCheckoutId: input.providerCheckoutId,
    providerOrderId: input.providerOrderId,
    providerCustomerId: input.providerCustomerId,
    paidAt: input.paidAt ?? new Date(),
    metadata: input.metadata,
  });
}
