import type Stripe from "stripe";

import { logger } from "@/lib/logger";
import { tryInsertBillingEvent } from "@/lib/payments/repository";
import { syncStripeCustomerSubscriptions } from "@/lib/payments/stripe/sync";
import { getStripeClient } from "@/lib/payments/stripe/client";
import type { BillingReference } from "@/lib/payments/types";

const log = logger.child({ scope: "payments.stripe.webhook" });

function referenceFromMetadata(
  metadata: Stripe.Metadata | null | undefined,
): BillingReference | null {
  if (!metadata) {
    return null;
  }
  const rt = metadata.referenceType;
  const rid = metadata.referenceId;
  if (
    (rt === "user" || rt === "organization") &&
    typeof rid === "string" &&
    rid.length > 0
  ) {
    return { type: rt, id: rid };
  }
  return null;
}

function referenceFromCustomer(
  customer: Stripe.Customer | Stripe.DeletedCustomer,
): BillingReference | null {
  if ("deleted" in customer && customer.deleted) {
    return null;
  }
  return referenceFromMetadata(customer.metadata);
}

async function resolveReferenceForEvent(
  event: Stripe.Event,
  stripe: Stripe,
): Promise<BillingReference | null> {
  if (event.type === "checkout.session.completed") {
    const fromSession = referenceFromMetadata(
      event.data.object.metadata,
    );
    if (fromSession) {
      return fromSession;
    }
  }

  const obj = event.data.object as {
    customer?: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  };

  const customerId =
    typeof obj.customer === "string"
      ? obj.customer
      : obj.customer && "id" in obj.customer
        ? obj.customer.id
        : null;

  if (!customerId) {
    return null;
  }

  const customer = await stripe.customers.retrieve(customerId);
  return referenceFromCustomer(customer);
}

export async function processStripeWebhookEvent(
  event: Stripe.Event,
): Promise<void> {
  const stripe = getStripeClient();

  const inserted = await tryInsertBillingEvent({
    id: crypto.randomUUID(),
    provider: "stripe",
    providerEventId: event.id,
    eventType: event.type,
    payloadSummary: { type: event.type },
  });

  if (!inserted) {
    log.debug("Duplicate Stripe webhook event skipped", {
      eventId: event.id,
    });
    return;
  }

  const relevant: Stripe.Event.Type[] = [
    "checkout.session.completed",
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "invoice.paid",
    "invoice.payment_failed",
  ];

  if (!relevant.includes(event.type)) {
    return;
  }

  const reference = await resolveReferenceForEvent(event, stripe);
  if (!reference) {
    log.warn("Stripe webhook could not resolve billing reference", {
      type: event.type,
      id: event.id,
    });
    return;
  }

  await syncStripeCustomerSubscriptions({
    stripe,
    reference,
  });
}
