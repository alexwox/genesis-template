import { PLAN_CATALOG, type PlanDefinition } from "@/lib/payments/plans";

/** Find plan key by matching a Stripe price id against the catalog. */
export function resolvePlanKeyFromStripePriceId(
  priceId: string | undefined,
): string {
  if (!priceId) {
    return "free";
  }
  for (const [key, def] of Object.entries(PLAN_CATALOG)) {
    if (matchesStripe(def, priceId)) {
      return key;
    }
  }
  return "pro";
}

/** Find plan key by matching Polar product ids against the catalog. */
export function resolvePlanKeyFromPolarProductId(
  productId: string | undefined,
): string {
  if (!productId) {
    return "free";
  }
  for (const [key, def] of Object.entries(PLAN_CATALOG)) {
    if (matchesPolar(def, productId)) {
      return key;
    }
  }
  return "pro";
}

function matchesPolar(def: PlanDefinition, productId: string): boolean {
  const sub = def.polar.subscription;
  if (sub) {
    for (const ids of Object.values(sub)) {
      if (ids.includes(productId)) {
        return true;
      }
    }
  }
  const ot = def.polar.oneTime;
  if (ot) {
    for (const ids of Object.values(ot)) {
      if (ids.includes(productId)) {
        return true;
      }
    }
  }
  return false;
}

function matchesStripe(def: PlanDefinition, priceId: string): boolean {
  const sub = def.stripe.subscription;
  if (sub) {
    for (const v of Object.values(sub)) {
      if (v === priceId) {
        return true;
      }
    }
  }
  const ot = def.stripe.oneTime;
  if (ot) {
    for (const v of Object.values(ot)) {
      if (v === priceId) {
        return true;
      }
    }
  }
  return false;
}
