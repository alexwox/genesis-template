import { PaymentsError } from "@/lib/payments/errors";
import { resolveStripePriceId } from "@/lib/payments/plans";
import type { CreateCheckoutInput } from "@/lib/payments/types";
import { getStripeClient } from "@/lib/payments/stripe/client";

export async function createStripeCheckoutSession(
  input: CreateCheckoutInput,
  customerId: string,
): Promise<{ url: string }> {
  const stripe = getStripeClient();
  const priceId = resolveStripePriceId(
    input.planKey,
    input.mode,
    input.interval,
    input.mode === "one_time"
      ? (input.oneTimeKind ?? "creditsTopUp")
      : undefined,
  );
  if (!priceId) {
    throw new PaymentsError(
      "Missing Stripe price id for this plan. Set the STRIPE_PRICE_* env vars.",
      "CONFIG",
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: input.mode === "subscription" ? "subscription" : "payment",
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: input.seats && input.seats > 0 ? input.seats : 1,
      },
    ],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      referenceType: input.reference.type,
      referenceId: input.reference.id,
      planKey: input.planKey,
    },
    subscription_data:
      input.mode === "subscription"
        ? {
            metadata: {
              referenceType: input.reference.type,
              referenceId: input.reference.id,
              planKey: input.planKey,
            },
          }
        : undefined,
  });

  if (!session.url) {
    throw new PaymentsError(
      "Stripe did not return a checkout URL.",
      "PROVIDER",
    );
  }
  return { url: session.url };
}
