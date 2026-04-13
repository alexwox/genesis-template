import type { PaymentProviderId } from "@/lib/db/schema/billing";

import type { CommerceItemKind } from "@/lib/db/schema/commerce";

type CommerceProduct = {
  sku: string;
  title: string;
  kind: CommerceItemKind;
  currency: string;
  unitAmount: number;
  requiresShipping: boolean;
  stripePriceId?: string;
  polarProductIds?: string[];
};

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : undefined;
}

/**
 * Replace these starter SKUs with your own product catalog.
 * They are intentionally simple to bootstrap guest checkout.
 */
const COMMERCE_CATALOG: Record<string, CommerceProduct> = {
  digital_starter: {
    sku: "digital_starter",
    title: "Digital Starter Pack",
    kind: "digital",
    currency: "usd",
    unitAmount: 4900,
    requiresShipping: false,
    stripePriceId: env("STRIPE_PRICE_COMMERCE_DIGITAL_STARTER"),
    polarProductIds: env("POLAR_PRODUCT_COMMERCE_DIGITAL_STARTER")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },
  physical_starter: {
    sku: "physical_starter",
    title: "Physical Starter Kit",
    kind: "physical",
    currency: "usd",
    unitAmount: 7900,
    requiresShipping: true,
    stripePriceId: env("STRIPE_PRICE_COMMERCE_PHYSICAL_STARTER"),
    polarProductIds: env("POLAR_PRODUCT_COMMERCE_PHYSICAL_STARTER")
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },
};

export function getCommerceProduct(sku: string): CommerceProduct | undefined {
  return COMMERCE_CATALOG[sku];
}

export function resolveProviderCatalogIds(
  provider: PaymentProviderId,
  product: CommerceProduct,
): { stripePriceId?: string; polarProductIds?: string[] } {
  if (provider === "stripe") {
    return { stripePriceId: product.stripePriceId };
  }
  return { polarProductIds: product.polarProductIds };
}
