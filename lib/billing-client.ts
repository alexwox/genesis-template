"use client";

import type { AccessState, BillingReference } from "@/lib/payments/types";

const base = () => process.env.NEXT_PUBLIC_APP_URL ?? "";

export const billingClient = {
  async checkout(body: {
    reference: BillingReference;
    mode: "subscription" | "one_time";
    planKey: string;
    interval?: "month" | "year";
    successUrl: string;
    cancelUrl: string;
    seats?: number;
    oneTimeKind?: "creditsTopUp";
  }): Promise<{ url: string }> {
    const res = await fetch(`${base()}/api/billing/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { url?: string; error?: unknown };
    if (!res.ok) {
      throw new Error(
        typeof data.error === "string"
          ? data.error
          : "Checkout failed",
      );
    }
    if (!data.url) {
      throw new Error("Missing checkout URL");
    }
    return { url: data.url };
  },

  async portal(body: {
    reference: BillingReference;
    returnUrl: string;
  }): Promise<{ url: string }> {
    const res = await fetch(`${base()}/api/billing/portal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { url?: string; error?: unknown };
    if (!res.ok) {
      throw new Error(
        typeof data.error === "string" ? data.error : "Portal failed",
      );
    }
    if (!data.url) {
      throw new Error("Missing portal URL");
    }
    return { url: data.url };
  },

  async access(reference: BillingReference): Promise<AccessState> {
    const params = new URLSearchParams({
      referenceType: reference.type,
      referenceId: reference.id,
    });
    const res = await fetch(`${base()}/api/billing/access?${params}`, {
      credentials: "include",
    });
    const data = (await res.json()) as AccessState & { error?: string };
    if (!res.ok) {
      throw new Error(data.error ?? "Access failed");
    }
    return data;
  },

  async sync(reference: BillingReference): Promise<void> {
    const res = await fetch(`${base()}/api/billing/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ reference }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      throw new Error(data.error ?? "Sync failed");
    }
  },
};
