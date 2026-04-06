/**
 * Canonical plan catalog. Map each plan to provider-specific price/product IDs via env.
 * Replace placeholder env names per project.
 */
import type { BillingInterval } from "@/lib/payments/types";

export type PlanDefinition = {
  key: string;
  label: string;
  limits: {
    seats: number;
    projects: number;
    storageGb: number;
  };
  stripe: {
    subscription?: Partial<Record<BillingInterval, string>>;
    oneTime?: { creditsTopUp?: string };
  };
  polar: {
    subscription?: Partial<Record<BillingInterval, string[]>>;
    oneTime?: { creditsTopUp?: string[] };
  };
};

function env(name: string): string | undefined {
  const v = process.env[name]?.trim();
  return v ?? undefined;
}

/**
 * Default catalog keys: `free`, `pro`.
 * `free` has no provider IDs — used for entitlement defaults only.
 */
export const PLAN_CATALOG: Record<string, PlanDefinition> = {
  free: {
    key: "free",
    label: "Free",
    limits: { seats: 3, projects: 3, storageGb: 1 },
    stripe: {},
    polar: {},
  },
  pro: {
    key: "pro",
    label: "Pro",
    limits: { seats: 25, projects: 50, storageGb: 100 },
    stripe: {
      subscription: {
        month: env("STRIPE_PRICE_PRO_MONTHLY"),
        year: env("STRIPE_PRICE_PRO_YEARLY"),
      },
      oneTime: {
        creditsTopUp: env("STRIPE_PRICE_CREDITS_TOPUP"),
      },
    },
    polar: {
      subscription: {
        month: env("POLAR_PRODUCT_PRO_MONTHLY")?.split(",").map((s) => s.trim()),
        year: env("POLAR_PRODUCT_PRO_YEARLY")?.split(",").map((s) => s.trim()),
      },
      oneTime: {
        creditsTopUp: env("POLAR_PRODUCT_CREDITS_TOPUP")?.split(",").map((s) => s.trim()),
      },
    },
  },
};

export function getPlanDefinition(planKey: string): PlanDefinition | undefined {
  return PLAN_CATALOG[planKey];
}

export function resolveStripePriceId(
  planKey: string,
  mode: "subscription" | "one_time",
  interval: BillingInterval | undefined,
  oneTimeKind?: "creditsTopUp",
): string | undefined {
  const plan = getPlanDefinition(planKey);
  if (!plan) {
    return undefined;
  }
  if (mode === "subscription") {
    if (!interval) {
      return undefined;
    }
    return plan.stripe.subscription?.[interval];
  }
  if (oneTimeKind === "creditsTopUp") {
    return plan.stripe.oneTime?.creditsTopUp;
  }
  return undefined;
}

export function resolvePolarProductIds(
  planKey: string,
  mode: "subscription" | "one_time",
  interval: BillingInterval | undefined,
  oneTimeKind?: "creditsTopUp",
): string[] {
  const plan = getPlanDefinition(planKey);
  if (!plan) {
    return [];
  }
  if (mode === "subscription") {
    if (!interval) {
      return [];
    }
    return plan.polar.subscription?.[interval]?.filter(Boolean) ?? [];
  }
  if (oneTimeKind === "creditsTopUp") {
    return plan.polar.oneTime?.creditsTopUp?.filter(Boolean) ?? [];
  }
  return [];
}
