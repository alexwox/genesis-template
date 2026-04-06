import { createPolarCheckoutSession } from "@/lib/payments/checkout-polar";
import { createStripeCheckoutSession } from "@/lib/payments/checkout-stripe";
import { getPaymentsEnv, assertProviderEnv } from "@/lib/payments/config";
import { PaymentsError } from "@/lib/payments/errors";
import { getPolarClient } from "@/lib/payments/polar/client";
import { processPolarWebhook } from "@/lib/payments/polar/webhook";
import { syncPolarReference } from "@/lib/payments/polar/sync";
import { externalCustomerKey } from "@/lib/payments/reference";
import { listBillingDocumentSummaries } from "@/lib/payments/read-model";
import type { CreateCheckoutInput } from "@/lib/payments/types";
import {
  findBillingCustomer,
  upsertBillingCustomer,
} from "@/lib/payments/repository";
import { syncStripeCustomerSubscriptions } from "@/lib/payments/stripe/sync";
import { getStripeClient } from "@/lib/payments/stripe/client";
import { processStripeWebhookEvent } from "@/lib/payments/stripe/webhook";
import type {
  BillingDocumentSummary,
  BillingReference,
} from "@/lib/payments/types";

export type EnsureCustomerProfile = {
  email: string;
  name?: string | null;
};

async function ensureStripeCustomer(
  reference: BillingReference,
  profile: EnsureCustomerProfile,
): Promise<{ customerId: string }> {
  const existing = await findBillingCustomer(
    reference.type,
    reference.id,
    "stripe",
  );
  if (existing) {
    return { customerId: existing.providerCustomerId };
  }

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: profile.email,
    name: profile.name ?? undefined,
    metadata: {
      referenceType: reference.type,
      referenceId: reference.id,
    },
  });

  await upsertBillingCustomer({
    id: crypto.randomUUID(),
    referenceType: reference.type,
    referenceId: reference.id,
    provider: "stripe",
    providerCustomerId: customer.id,
  });

  return { customerId: customer.id };
}

async function ensurePolarCustomer(
  reference: BillingReference,
  profile: EnsureCustomerProfile,
): Promise<{ customerId: string }> {
  const existing = await findBillingCustomer(
    reference.type,
    reference.id,
    "polar",
  );
  if (existing) {
    return { customerId: existing.providerCustomerId };
  }

  const polar = getPolarClient();
  const externalId = externalCustomerKey(reference);
  const created = await polar.customers.create({
    type: "individual",
    email: profile.email,
    name: profile.name ?? undefined,
    externalId,
    metadata: {
      referenceType: reference.type,
      referenceId: reference.id,
    },
  });

  await upsertBillingCustomer({
    id: crypto.randomUUID(),
    referenceType: reference.type,
    referenceId: reference.id,
    provider: "polar",
    providerCustomerId: created.id,
  });

  return { customerId: created.id };
}

export async function ensureCustomer(
  reference: BillingReference,
  profile: EnsureCustomerProfile,
): Promise<{ customerId: string }> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);
  if (env.provider === "stripe") {
    return ensureStripeCustomer(reference, profile);
  }
  return ensurePolarCustomer(reference, profile);
}

export async function createCheckoutSession(
  input: CreateCheckoutInput,
  profile: EnsureCustomerProfile,
): Promise<{ url: string }> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);
  const { customerId } = await ensureCustomer(input.reference, profile);

  if (env.provider === "stripe") {
    return createStripeCheckoutSession(input, customerId);
  }
  return createPolarCheckoutSession(input, profile, customerId);
}

export async function createBillingPortalSession(input: {
  reference: BillingReference;
  returnUrl: string;
  profile: EnsureCustomerProfile;
}): Promise<{ url: string }> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);

  let customerRow = await findBillingCustomer(
    input.reference.type,
    input.reference.id,
    env.provider,
  );
  if (!customerRow) {
    await ensureCustomer(input.reference, input.profile);
    customerRow = await findBillingCustomer(
      input.reference.type,
      input.reference.id,
      env.provider,
    );
  }
  if (!customerRow) {
    throw new PaymentsError("Billing customer not found.", "NOT_FOUND");
  }

  if (env.provider === "stripe") {
    const stripe = getStripeClient();
    const session = await stripe.billingPortal.sessions.create({
      customer: customerRow.providerCustomerId,
      return_url: input.returnUrl,
    });
    return { url: session.url };
  }

  const polar = getPolarClient();
  const session = await polar.customerSessions.create({
    externalCustomerId: externalCustomerKey(input.reference),
    returnUrl: input.returnUrl,
  });
  return { url: session.customerPortalUrl };
}

export async function syncReference(
  reference: BillingReference,
): Promise<void> {
  const env = getPaymentsEnv();
  assertProviderEnv(env.provider);
  if (env.provider === "stripe") {
    const stripe = getStripeClient();
    await syncStripeCustomerSubscriptions({ stripe, reference });
    return;
  }
  await syncPolarReference(reference);
}

export async function handleProviderWebhook(input: {
  provider: "stripe" | "polar";
  rawBody: string;
  headers: Headers;
}): Promise<{ accepted: true }> {
  if (input.provider === "stripe") {
    const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    if (!secret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set");
    }
    const sig = input.headers.get("stripe-signature");
    if (!sig) {
      throw new PaymentsError("Missing Stripe-Signature header.", "VALIDATION");
    }
    const stripe = getStripeClient();
    const event = await stripe.webhooks.constructEventAsync(
      input.rawBody,
      sig,
      secret,
    );
    await processStripeWebhookEvent(event);
    return { accepted: true };
  }

  await processPolarWebhook(input.rawBody, input.headers);
  return { accepted: true };
}

export async function listBillingDocuments(input: {
  reference: BillingReference;
  limit?: number;
}): Promise<BillingDocumentSummary[]> {
  return listBillingDocumentSummaries(input.reference, input.limit ?? 20);
}
