import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (stripeSingleton) {
    return stripeSingleton;
  }
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  stripeSingleton = new Stripe(key, {
    typescript: true,
  });
  return stripeSingleton;
}
