import type { PaymentProviderId } from "@/lib/db/schema/billing";
import type { ProviderCapabilities } from "@/lib/payments/types";

export function getProviderCapabilities(
  provider: PaymentProviderId,
): ProviderCapabilities {
  if (provider === "stripe") {
    return {
      hostedBillingPortal: true,
      hostedInvoices: true,
      subscriptions: true,
      oneTimePurchases: true,
      seatBasedPricing: true,
      usageBasedBilling: true,
    };
  }
  return {
    hostedBillingPortal: true,
    hostedInvoices: true,
    subscriptions: true,
    oneTimePurchases: true,
    seatBasedPricing: true,
    usageBasedBilling: true,
  };
}
