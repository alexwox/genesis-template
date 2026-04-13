import type { CommerceCartItemSnapshot } from "@/lib/db/schema/commerce";
import { CommerceError } from "@/lib/commerce/errors";
import { getCommerceProduct, resolveProviderCatalogIds } from "@/lib/commerce/catalog";
import { getPaymentsEnv, assertProviderEnv } from "@/lib/payments/config";
import { getPolarClient } from "@/lib/payments/polar/client";
import { getStripeClient } from "@/lib/payments/stripe/client";

type ProviderCheckoutInput = {
  checkoutId: string;
  buyerEmail: string;
  successUrl: string;
  cancelUrl: string;
  cartSnapshot: CommerceCartItemSnapshot[];
  requiresShipping: boolean;
};

async function createStripeGuestCheckout(input: ProviderCheckoutInput): Promise<{
  url: string;
  providerCheckoutId: string | null;
  providerOrderId: string | null;
  providerCustomerId: string | null;
}> {
  const stripe = getStripeClient();
  const lineItems = input.cartSnapshot.map((item) => {
    const product = getCommerceProduct(item.sku);
    if (!product) {
      throw new CommerceError(`Unknown product sku '${item.sku}'.`, "VALIDATION");
    }
    const ids = resolveProviderCatalogIds("stripe", product);
    if (!ids.stripePriceId) {
      throw new CommerceError(
        `Missing Stripe price id for sku '${item.sku}'.`,
        "CONFIG",
      );
    }
    return { price: ids.stripePriceId, quantity: item.quantity };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    customer_email: input.buyerEmail,
    metadata: { commerceCheckoutId: input.checkoutId },
    shipping_address_collection: input.requiresShipping
      ? { allowed_countries: ["US", "CA", "GB", "DE", "FR", "SE"] }
      : undefined,
  });

  if (!session.url) {
    throw new CommerceError("Stripe did not return a checkout URL.", "PROVIDER");
  }

  return {
    url: session.url,
    providerCheckoutId: session.id,
    providerOrderId: session.payment_intent ? String(session.payment_intent) : null,
    providerCustomerId: typeof session.customer === "string" ? session.customer : null,
  };
}

async function createPolarGuestCheckout(input: ProviderCheckoutInput): Promise<{
  url: string;
  providerCheckoutId: string | null;
  providerOrderId: string | null;
  providerCustomerId: string | null;
}> {
  const polar = getPolarClient();
  const products: string[] = [];
  for (const item of input.cartSnapshot) {
    const product = getCommerceProduct(item.sku);
    if (!product) {
      throw new CommerceError(`Unknown product sku '${item.sku}'.`, "VALIDATION");
    }
    const ids = resolveProviderCatalogIds("polar", product).polarProductIds ?? [];
    if (ids.length === 0) {
      throw new CommerceError(
        `Missing Polar product id for sku '${item.sku}'.`,
        "CONFIG",
      );
    }

    for (let i = 0; i < item.quantity; i += 1) {
      products.push(...ids);
    }
  }

  const checkout = await polar.checkouts.create({
    products,
    successUrl: input.successUrl,
    returnUrl: input.cancelUrl,
    customerEmail: input.buyerEmail,
    metadata: { commerceCheckoutId: input.checkoutId },
  });

  return {
    url: checkout.url,
    providerCheckoutId: checkout.id,
    providerOrderId: null,
    providerCustomerId: null,
  };
}

export async function createProviderCheckoutSessionForGuest(input: {
  checkoutId: string;
  buyerEmail: string;
  successUrl: string;
  cancelUrl: string;
  cartSnapshot: CommerceCartItemSnapshot[];
  requiresShipping: boolean;
}): Promise<{
  url: string;
  providerCheckoutId: string | null;
  providerOrderId: string | null;
  providerCustomerId: string | null;
}> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);
  return env.provider === "stripe"
    ? createStripeGuestCheckout(input)
    : createPolarGuestCheckout(input);
}
