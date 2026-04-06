import { PaymentsError } from "@/lib/payments/errors";
import { getPolarClient } from "@/lib/payments/polar/client";
import { resolvePolarProductIds } from "@/lib/payments/plans";
import type { CreateCheckoutInput } from "@/lib/payments/types";

export async function createPolarCheckoutSession(
  input: CreateCheckoutInput,
  profile: { email: string },
  customerId: string,
): Promise<{ url: string }> {
  const polar = getPolarClient();
  const products = resolvePolarProductIds(
    input.planKey,
    input.mode,
    input.interval,
    input.mode === "one_time"
      ? (input.oneTimeKind ?? "creditsTopUp")
      : undefined,
  );
  if (products.length === 0) {
    throw new PaymentsError(
      "Missing Polar product id for this plan. Set POLAR_PRODUCT_* env vars.",
      "CONFIG",
    );
  }

  const checkout = await polar.checkouts.create({
    products,
    successUrl: input.successUrl,
    returnUrl: input.cancelUrl,
    customerId,
    customerEmail: profile.email,
    metadata: {
      referenceType: input.reference.type,
      referenceId: input.reference.id,
      planKey: input.planKey,
    },
    seats: input.seats ?? undefined,
  });

  return { url: checkout.url };
}
