import type { PaymentProviderId } from "@/lib/db/schema/billing";

export type PaymentsEnv = {
  provider: PaymentProviderId;
  appUrl: string;
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  polarAccessToken?: string;
  polarWebhookSecret?: string;
  polarServer: "production" | "sandbox";
};

function requireEnv(name: string): string {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`${name} is required when payments are enabled`);
  }
  return v;
}

export function getPaymentsEnv(): PaymentsEnv {
  const raw = process.env.PAYMENT_PROVIDER?.trim().toLowerCase();

  const provider: PaymentProviderId = raw === "polar" ? "polar" : "stripe";

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL?.trim() ??
    process.env.SITE_URL?.trim() ??
    "http://localhost:3000";

  const polarServer =
    process.env.POLAR_SERVER?.trim().toLowerCase() === "sandbox"
      ? "sandbox"
      : "production";

  return {
    provider,
    appUrl,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY?.trim(),
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET?.trim(),
    polarAccessToken: process.env.POLAR_ACCESS_TOKEN?.trim(),
    polarWebhookSecret: process.env.POLAR_WEBHOOK_SECRET?.trim(),
    polarServer,
  };
}

export function assertProviderEnv(provider: PaymentProviderId): void {
  if (provider === "stripe") {
    requireEnv("STRIPE_SECRET_KEY");
    return;
  }
  requireEnv("POLAR_ACCESS_TOKEN");
}
