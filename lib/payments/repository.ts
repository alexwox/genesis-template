import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  billingCustomer,
  billingDocument,
  billingEvent,
  billingOrder,
  billingSubscription,
  type BillingReferenceType,
  type PaymentProviderId,
} from "@/lib/db/schema/billing";

export async function findBillingCustomer(
  referenceType: BillingReferenceType,
  referenceId: string,
  provider: PaymentProviderId,
) {
  const rows = await db
    .select()
    .from(billingCustomer)
    .where(
      and(
        eq(billingCustomer.referenceType, referenceType),
        eq(billingCustomer.referenceId, referenceId),
        eq(billingCustomer.provider, provider),
      ),
    )
    .limit(1);
  return rows[0];
}

export async function upsertBillingCustomer(input: {
  id: string;
  referenceType: BillingReferenceType;
  referenceId: string;
  provider: PaymentProviderId;
  providerCustomerId: string;
}) {
  await db
    .insert(billingCustomer)
    .values({
      id: input.id,
      referenceType: input.referenceType,
      referenceId: input.referenceId,
      provider: input.provider,
      providerCustomerId: input.providerCustomerId,
    })
    .onConflictDoUpdate({
      target: [
        billingCustomer.referenceType,
        billingCustomer.referenceId,
        billingCustomer.provider,
      ],
      set: {
        providerCustomerId: input.providerCustomerId,
        updatedAt: new Date(),
      },
    });
}

export async function upsertBillingSubscription(input: {
  id: string;
  referenceType: BillingReferenceType;
  referenceId: string;
  provider: PaymentProviderId;
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  planKey: string;
  status: string;
  interval: string | null;
  seats: number | null;
  periodStart: Date | null;
  periodEnd: Date | null;
  cancelAtPeriodEnd: boolean | null;
  canceledAt: Date | null;
  endedAt: Date | null;
  trialStart: Date | null;
  trialEnd: Date | null;
  metadata: Record<string, unknown> | null;
}) {
  const existingRows = input.providerSubscriptionId
    ? await db
        .select()
        .from(billingSubscription)
        .where(
          and(
            eq(billingSubscription.provider, input.provider),
            eq(
              billingSubscription.providerSubscriptionId,
              input.providerSubscriptionId,
            ),
          ),
        )
        .limit(1)
    : [];
  const existing = existingRows[0];

  if (existing) {
    await db
      .update(billingSubscription)
      .set({
        ...input,
        lastSyncedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(billingSubscription.id, existing.id));
    return;
  }

  await db.insert(billingSubscription).values({
    ...input,
    lastSyncedAt: new Date(),
  });
}

export async function listSubscriptionsForReference(
  referenceType: BillingReferenceType,
  referenceId: string,
) {
  return db
    .select()
    .from(billingSubscription)
    .where(
      and(
        eq(billingSubscription.referenceType, referenceType),
        eq(billingSubscription.referenceId, referenceId),
      ),
    )
    .orderBy(desc(billingSubscription.updatedAt));
}

export async function tryInsertBillingEvent(input: {
  id: string;
  provider: PaymentProviderId;
  providerEventId: string;
  eventType: string;
  payloadSummary?: Record<string, unknown> | null;
}): Promise<boolean> {
  try {
    await db.insert(billingEvent).values({
      id: input.id,
      provider: input.provider,
      providerEventId: input.providerEventId,
      eventType: input.eventType,
      payloadSummary: input.payloadSummary ?? null,
    });
    return true;
  } catch {
    return false;
  }
}

export async function upsertBillingOrder(input: {
  id: string;
  referenceType: BillingReferenceType;
  referenceId: string;
  provider: PaymentProviderId;
  providerOrderId: string | null;
  providerCheckoutId: string | null;
  planKey: string | null;
  status: string;
  mode: string;
  currency: string | null;
  amount: number | null;
  metadata: Record<string, unknown> | null;
}) {
  const existingRows = input.providerOrderId
    ? await db
        .select()
        .from(billingOrder)
        .where(
          and(
            eq(billingOrder.provider, input.provider),
            eq(billingOrder.providerOrderId, input.providerOrderId),
          ),
        )
        .limit(1)
    : [];
  const existing = existingRows[0];

  if (existing) {
    await db
      .update(billingOrder)
      .set({
        ...input,
        lastSyncedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(billingOrder.id, existing.id));
    return;
  }

  await db.insert(billingOrder).values({
    ...input,
    lastSyncedAt: new Date(),
  });
}

export async function listDocumentsForReference(
  referenceType: BillingReferenceType,
  referenceId: string,
  limit: number,
) {
  return db
    .select()
    .from(billingDocument)
    .where(
      and(
        eq(billingDocument.referenceType, referenceType),
        eq(billingDocument.referenceId, referenceId),
      ),
    )
    .orderBy(desc(billingDocument.issuedAt))
    .limit(limit);
}
