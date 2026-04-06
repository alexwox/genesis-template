import type { BillingReference } from "@/lib/payments/types";

/** Stable external key for provider customer mapping (user id or org-prefixed id). */
export function externalCustomerKey(reference: BillingReference): string {
  if (reference.type === "user") {
    return reference.id;
  }
  return `org:${reference.id}`;
}
