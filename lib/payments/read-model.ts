import { getPlanDefinition, type PlanDefinition } from "@/lib/payments/plans";
import type {
  AccessState,
  BillingDocumentSummary,
  BillingReference,
  PlanLimits,
  SubscriptionSnapshot,
} from "@/lib/payments/types";
import {
  listDocumentsForReference,
  listSubscriptionsForReference,
} from "@/lib/payments/repository";

function toPlanLimits(planKey: string): PlanLimits {
  const resolved = getPlanDefinition(planKey);
  const freeDef = getPlanDefinition("free");
  if (!freeDef) {
    throw new Error("Invariant: plan catalog must define `free`");
  }
  const def: PlanDefinition = resolved ?? freeDef;
  return {
    seats: def.limits.seats,
    projects: def.limits.projects,
    storageGb: def.limits.storageGb,
    features: {},
  };
}

export async function getSubscription(
  reference: BillingReference,
): Promise<SubscriptionSnapshot | null> {
  const rows = await listSubscriptionsForReference(
    reference.type,
    reference.id,
  );
  const active = rows.find(
    (s) => s.status === "active" || s.status === "trialing",
  );
  if (!active) {
    return null;
  }
  return {
    id: active.id,
    reference,
    provider: active.provider,
    planKey: active.planKey,
    status: active.status,
    interval: active.interval,
    seats: active.seats,
    periodStart: active.periodStart,
    periodEnd: active.periodEnd,
    cancelAtPeriodEnd: active.cancelAtPeriodEnd,
  };
}

export async function getPlanLimits(
  reference: BillingReference,
): Promise<PlanLimits> {
  const sub = await getSubscription(reference);
  const planKey = sub?.planKey ?? "free";
  return toPlanLimits(planKey);
}

export async function getAccessState(
  reference: BillingReference,
): Promise<AccessState> {
  const sub = await getSubscription(reference);
  const planKey = sub?.planKey ?? "free";
  const hasPaidAccess =
    !!sub && (sub.status === "active" || sub.status === "trialing");

  return {
    reference,
    planKey,
    hasPaidAccess,
    subscriptionStatus: sub?.status ?? null,
    interval: sub?.interval ?? null,
    seats: sub?.seats ?? null,
    periodEnd: sub?.periodEnd ?? null,
    limits: toPlanLimits(planKey),
  };
}

export async function listBillingDocumentSummaries(
  reference: BillingReference,
  limit: number,
): Promise<BillingDocumentSummary[]> {
  const rows = await listDocumentsForReference(
    reference.type,
    reference.id,
    limit,
  );
  return rows.map((d) => ({
    id: d.id,
    provider: d.provider,
    documentType: d.documentType,
    status: d.status,
    currency: d.currency,
    amount: d.amount,
    hostedUrl: d.hostedUrl,
    issuedAt: d.issuedAt,
  }));
}
