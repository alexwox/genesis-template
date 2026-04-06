import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate.js";

import { resolvePlanKeyFromPolarProductId } from "@/lib/payments/plan-resolve";
import {
  findBillingCustomer,
  upsertBillingSubscription,
} from "@/lib/payments/repository";
import { getPolarClient } from "@/lib/payments/polar/client";
import { externalCustomerKey } from "@/lib/payments/reference";
import type { BillingReference } from "@/lib/payments/types";

export function referenceFromPolarCustomerState(
  state: CustomerState,
): BillingReference | null {
  const ext = state.externalId;
  if (!ext || ext.length === 0) {
    return null;
  }
  if (ext.startsWith("org:")) {
    return { type: "organization", id: ext.slice(4) };
  }
  return { type: "user", id: ext };
}

function mapInterval(
  recurring: { toString(): string } | string | null | undefined,
): string | null {
  if (recurring == null) {
    return null;
  }
  return typeof recurring === "string" ? recurring : recurring.toString();
}

export async function syncPolarCustomerStateToDatabase(
  state: CustomerState,
): Promise<void> {
  const reference = referenceFromPolarCustomerState(state);
  if (!reference) {
    return;
  }

  const customerRow = await findBillingCustomer(
    reference.type,
    reference.id,
    "polar",
  );
  const providerCustomerId = customerRow?.providerCustomerId ?? state.id;

  const active = state.activeSubscriptions[0];
  if (!active) {
    return;
  }

  const planKey = resolvePlanKeyFromPolarProductId(active.productId);

  await upsertBillingSubscription({
    id: active.id,
    referenceType: reference.type,
    referenceId: reference.id,
    provider: "polar",
    providerCustomerId,
    providerSubscriptionId: active.id,
    planKey,
    status: String(active.status),
    interval: mapInterval(active.recurringInterval),
    seats: null,
    periodStart: active.currentPeriodStart,
    periodEnd: active.currentPeriodEnd,
    cancelAtPeriodEnd: active.cancelAtPeriodEnd,
    canceledAt: active.canceledAt,
    endedAt: active.endsAt,
    trialStart: active.trialStart,
    trialEnd: active.trialEnd,
    metadata: {
      productId: active.productId,
    },
  });
}

export async function syncPolarReference(
  reference: BillingReference,
): Promise<void> {
  const polar = getPolarClient();
  const externalId = externalCustomerKey(reference);
  const state = await polar.customers.getStateExternal({ externalId });
  await syncPolarCustomerStateToDatabase(state);
}
