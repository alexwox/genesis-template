import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  commerceCheckout,
  commerceOrder,
  commerceOrderClaim,
  commerceOrderItem,
  type CommerceAddress,
  type CommerceCartItemSnapshot,
  type CommerceCheckoutStatus,
  type CommerceFulfillmentStatus,
  type CommerceOrderStatus,
} from "@/lib/db/schema/commerce";
import type { PaymentProviderId } from "@/lib/db/schema/billing";

export async function insertCheckoutDraft(input: {
  id: string;
  provider: PaymentProviderId;
  buyerEmail: string;
  buyerName?: string;
  buyerPhone?: string;
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  requiresShipping: boolean;
  shippingAddress: CommerceAddress | null;
  cartSnapshot: CommerceCartItemSnapshot[];
  status: CommerceCheckoutStatus;
  expiresAt: Date;
  metadata?: Record<string, unknown>;
}) {
  await db.insert(commerceCheckout).values({
    ...input,
    buyerName: input.buyerName ?? null,
    buyerPhone: input.buyerPhone ?? null,
    metadata: input.metadata ?? null,
  });
}

export async function attachProviderCheckoutToDraft(input: {
  checkoutId: string;
  providerCheckoutId: string | null;
  providerOrderId: string | null;
  providerCustomerId: string | null;
  checkoutUrl: string;
  status: CommerceCheckoutStatus;
}) {
  await db
    .update(commerceCheckout)
    .set({
      providerCheckoutId: input.providerCheckoutId,
      providerOrderId: input.providerOrderId,
      providerCustomerId: input.providerCustomerId,
      checkoutUrl: input.checkoutUrl,
      status: input.status,
      updatedAt: new Date(),
    })
    .where(eq(commerceCheckout.id, input.checkoutId));
}

export async function findCheckoutById(checkoutId: string) {
  const rows = await db
    .select()
    .from(commerceCheckout)
    .where(eq(commerceCheckout.id, checkoutId))
    .limit(1);
  return rows[0];
}

export async function findCheckoutByProviderCheckoutId(
  provider: PaymentProviderId,
  providerCheckoutId: string,
) {
  const rows = await db
    .select()
    .from(commerceCheckout)
    .where(
      and(
        eq(commerceCheckout.provider, provider),
        eq(commerceCheckout.providerCheckoutId, providerCheckoutId),
      ),
    )
    .limit(1);
  return rows[0];
}

export async function markCheckoutCompleted(input: {
  checkoutId: string;
  providerCheckoutId?: string | null;
  providerOrderId?: string | null;
  providerCustomerId?: string | null;
  status: CommerceCheckoutStatus;
  metadata?: Record<string, unknown>;
}) {
  await db
    .update(commerceCheckout)
    .set({
      providerCheckoutId: input.providerCheckoutId ?? null,
      providerOrderId: input.providerOrderId ?? null,
      providerCustomerId: input.providerCustomerId ?? null,
      completedAt: new Date(),
      status: input.status,
      metadata: input.metadata ?? null,
      updatedAt: new Date(),
    })
    .where(eq(commerceCheckout.id, input.checkoutId));
}

export async function findOrderByCheckoutId(checkoutId: string) {
  const rows = await db
    .select()
    .from(commerceOrder)
    .where(eq(commerceOrder.checkoutId, checkoutId))
    .limit(1);
  return rows[0];
}

export async function findOrderById(orderId: string) {
  const rows = await db
    .select()
    .from(commerceOrder)
    .where(eq(commerceOrder.id, orderId))
    .limit(1);
  return rows[0];
}

export async function insertOrderFromCheckout(input: {
  orderId: string;
  checkoutId: string;
  provider: PaymentProviderId;
  status: CommerceOrderStatus;
  buyerEmail: string;
  buyerName?: string | null;
  buyerPhone?: string | null;
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  requiresShipping: boolean;
  shippingAddress: CommerceAddress | null;
  providerCheckoutId?: string | null;
  providerOrderId?: string | null;
  providerCustomerId?: string | null;
  paidAt?: Date | null;
  metadata?: Record<string, unknown>;
  cartSnapshot: CommerceCartItemSnapshot[];
}) {
  await db.insert(commerceOrder).values({
    id: input.orderId,
    checkoutId: input.checkoutId,
    provider: input.provider,
    status: input.status,
    buyerEmail: input.buyerEmail,
    buyerName: input.buyerName ?? null,
    buyerPhone: input.buyerPhone ?? null,
    currency: input.currency,
    subtotalAmount: input.subtotalAmount,
    taxAmount: input.taxAmount,
    shippingAmount: input.shippingAmount,
    totalAmount: input.totalAmount,
    requiresShipping: input.requiresShipping,
    shippingAddress: input.shippingAddress,
    providerCheckoutId: input.providerCheckoutId ?? null,
    providerOrderId: input.providerOrderId ?? null,
    providerCustomerId: input.providerCustomerId ?? null,
    paidAt: input.paidAt ?? new Date(),
    metadata: input.metadata ?? null,
  });

  if (input.cartSnapshot.length === 0) {
    return;
  }

  await db.insert(commerceOrderItem).values(
    input.cartSnapshot.map((item) => {
      const fulfillmentStatus: CommerceFulfillmentStatus =
        item.kind === "digital" ? "ready" : "pending";
      return {
        id: crypto.randomUUID(),
        orderId: input.orderId,
        sku: item.sku,
        title: item.title,
        kind: item.kind,
        quantity: item.quantity,
        unitAmount: item.unitAmount,
        totalAmount: item.totalAmount,
        currency: item.currency,
        requiresShipping: item.requiresShipping,
        fulfillmentStatus,
        fulfillmentMetadata: item.metadata ?? null,
      };
    }),
  );
}

export async function createOrderClaim(input: {
  id: string;
  orderId: string;
  email: string;
  tokenHash: string;
  expiresAt: Date;
}) {
  await db.insert(commerceOrderClaim).values({
    id: input.id,
    orderId: input.orderId,
    email: input.email,
    tokenHash: input.tokenHash,
    status: "pending",
    expiresAt: input.expiresAt,
  });
}

export async function findOrderClaimByTokenHash(tokenHash: string) {
  const rows = await db
    .select()
    .from(commerceOrderClaim)
    .where(eq(commerceOrderClaim.tokenHash, tokenHash))
    .limit(1);
  return rows[0];
}

export async function markOrderClaimed(input: {
  claimId: string;
  userId: string;
}) {
  await db
    .update(commerceOrderClaim)
    .set({
      status: "claimed",
      claimedAt: new Date(),
      claimedByUserId: input.userId,
      updatedAt: new Date(),
    })
    .where(eq(commerceOrderClaim.id, input.claimId));
}

export async function attachOrderToUser(input: {
  orderId: string;
  userId: string;
}) {
  await db
    .update(commerceOrder)
    .set({
      buyerUserId: input.userId,
      claimedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(commerceOrder.id, input.orderId));
}
