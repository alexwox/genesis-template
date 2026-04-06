import type Stripe from "stripe";

import type { BillingReferenceType } from "@/lib/db/schema/billing";
import { resolvePlanKeyFromStripePriceId } from "@/lib/payments/plan-resolve";
import { upsertBillingSubscription } from "@/lib/payments/repository";
import { getStripeClient } from "@/lib/payments/stripe/client";
import type { BillingReference } from "@/lib/payments/types";

function mapInterval(item: Stripe.SubscriptionItem): string | null {
  const recurring = item.price.recurring;
  if (!recurring?.interval) {
    return null;
  }
  return recurring.interval;
}

export async function syncStripeSubscriptionToDatabase(input: {
  stripe: Stripe;
  referenceType: BillingReferenceType;
  referenceId: string;
  subscription: Stripe.Subscription;
}): Promise<void> {
  const { subscription: sub } = input;
  const item = sub.items.data[0];
  if (!item) {
    return;
  }

  const priceId = item.price.id;
  const planKey = resolvePlanKeyFromStripePriceId(priceId);

  const c = sub.customer;
  const customerId = typeof c === "string" ? c : "id" in c ? c.id : null;

  const periodStart = item.current_period_start
    ? new Date(item.current_period_start * 1000)
    : null;
  const periodEnd = item.current_period_end
    ? new Date(item.current_period_end * 1000)
    : null;

  await upsertBillingSubscription({
    id: sub.id,
    referenceType: input.referenceType,
    referenceId: input.referenceId,
    provider: "stripe",
    providerCustomerId: customerId,
    providerSubscriptionId: sub.id,
    planKey,
    status: sub.status,
    interval: mapInterval(item),
    seats: item.quantity ?? null,
    periodStart,
    periodEnd,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
    canceledAt: sub.canceled_at
      ? new Date(sub.canceled_at * 1000)
      : null,
    endedAt: sub.ended_at ? new Date(sub.ended_at * 1000) : null,
    trialStart: sub.trial_start
      ? new Date(sub.trial_start * 1000)
      : null,
    trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
    metadata: {
      stripeSubscriptionId: sub.id,
      priceId,
    },
  });
}

export async function syncStripeCustomerSubscriptions(input: {
  stripe: Stripe;
  reference: BillingReference;
}): Promise<void> {
  const customerRow = await import("@/lib/payments/repository").then((m) =>
    m.findBillingCustomer(
      input.reference.type,
      input.reference.id,
      "stripe",
    ),
  );

  if (!customerRow) {
    return;
  }

  const subs = await input.stripe.subscriptions.list({
    customer: customerRow.providerCustomerId,
    status: "all",
    limit: 10,
  });

  const activeOrTrialing = subs.data.find(
    (s) => s.status === "active" || s.status === "trialing",
  );
  const chosen = activeOrTrialing ?? subs.data[0];

  if (!chosen) {
    return;
  }

  await syncStripeSubscriptionToDatabase({
    stripe: input.stripe,
    referenceType: input.reference.type,
    referenceId: input.reference.id,
    subscription: chosen,
  });
}

export async function syncStripeReference(reference: BillingReference): Promise<void> {
  const stripe = getStripeClient();
  await syncStripeCustomerSubscriptions({ stripe, reference });
}
