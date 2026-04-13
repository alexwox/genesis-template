import type { PaymentProviderId } from "@/lib/db/schema/billing";
import type {
  CommerceAddress,
  CommerceCartItemSnapshot,
} from "@/lib/db/schema/commerce";

export type CommerceLineItemInput = {
  sku: string;
  quantity: number;
};

export type GuestCheckoutInput = {
  buyerEmail: string;
  buyerName?: string;
  buyerPhone?: string;
  items: CommerceLineItemInput[];
  successUrl: string;
  cancelUrl: string;
  shippingAddress?: CommerceAddress;
  metadata?: Record<string, unknown>;
};

export type CheckoutDraftTotals = {
  currency: string;
  subtotalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
};

export type CheckoutDraft = {
  id: string;
  provider: PaymentProviderId;
  buyerEmail: string;
  buyerName?: string;
  buyerPhone?: string;
  requiresShipping: boolean;
  shippingAddress: CommerceAddress | null;
  cartSnapshot: CommerceCartItemSnapshot[];
  totals: CheckoutDraftTotals;
  metadata?: Record<string, unknown>;
};

export type FinalizeGuestCheckoutInput = {
  provider: PaymentProviderId;
  checkoutId: string;
  providerCheckoutId?: string | null;
  providerOrderId?: string | null;
  providerCustomerId?: string | null;
  paidAt?: Date | null;
  metadata?: Record<string, unknown>;
};

export type GuestCheckoutResponse = {
  checkoutId: string;
  url: string;
};

export type ClaimGuestOrderInput = {
  token: string;
  userId: string;
  email: string;
};
