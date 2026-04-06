import type { PaymentProviderId } from "@/lib/db/schema/billing";

export type BillingReference = {
  type: "user" | "organization";
  id: string;
};

export type CheckoutMode = "subscription" | "one_time";

export type BillingInterval = "month" | "year";

export type PlanLimits = {
  seats?: number;
  projects?: number;
  storageGb?: number;
  features?: Record<string, boolean>;
};

export type AccessState = {
  reference: BillingReference;
  planKey: string;
  /** True when subscription is active or trialing, or a valid one-time entitlement applies */
  hasPaidAccess: boolean;
  subscriptionStatus: string | null;
  interval: string | null;
  seats: number | null;
  periodEnd: Date | null;
  limits: PlanLimits;
};

export type SubscriptionSnapshot = {
  id: string;
  reference: BillingReference;
  provider: PaymentProviderId;
  planKey: string;
  status: string;
  interval: string | null;
  seats: number | null;
  periodStart: Date | null;
  periodEnd: Date | null;
  cancelAtPeriodEnd: boolean | null;
};

export type BillingDocumentSummary = {
  id: string;
  provider: PaymentProviderId;
  documentType: string;
  status: string | null;
  currency: string | null;
  amount: number | null;
  hostedUrl: string | null;
  issuedAt: Date | null;
};

export type CreateCheckoutInput = {
  reference: BillingReference;
  mode: CheckoutMode;
  planKey: string;
  interval?: BillingInterval;
  successUrl: string;
  cancelUrl: string;
  seats?: number;
  /** For one-time purchases mapped in plan catalog (e.g. credits top-up). */
  oneTimeKind?: "creditsTopUp";
};

export type ProviderCapabilities = {
  hostedBillingPortal: boolean;
  hostedInvoices: boolean;
  subscriptions: boolean;
  oneTimePurchases: boolean;
  seatBasedPricing: boolean;
  usageBasedBilling: boolean;
};
