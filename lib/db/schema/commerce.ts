import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { user } from "@/lib/db/schema/auth";
import type { PaymentProviderId } from "@/lib/db/schema/billing";

export type CommerceItemKind = "digital" | "physical";
export type CommerceCheckoutStatus =
  | "draft"
  | "provider_pending"
  | "completed"
  | "expired"
  | "canceled";
export type CommerceOrderStatus =
  | "pending_payment"
  | "paid"
  | "failed"
  | "refunded"
  | "canceled";
export type CommerceFulfillmentStatus =
  | "pending"
  | "ready"
  | "fulfilled"
  | "shipped"
  | "failed";
export type CommerceClaimStatus = "pending" | "claimed" | "expired" | "revoked";

export type CommerceAddress = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type CommerceCartItemSnapshot = {
  sku: string;
  title: string;
  kind: CommerceItemKind;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
  currency: string;
  requiresShipping: boolean;
  metadata?: Record<string, unknown>;
};

export const commerceCheckout = pgTable(
  "commerce_checkout",
  {
    id: text("id").primaryKey(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    status: text("status").notNull().$type<CommerceCheckoutStatus>(),
    buyerEmail: text("buyer_email").notNull(),
    buyerName: text("buyer_name"),
    buyerPhone: text("buyer_phone"),
    currency: text("currency").notNull(),
    subtotalAmount: integer("subtotal_amount").notNull(),
    taxAmount: integer("tax_amount").notNull().default(0),
    shippingAmount: integer("shipping_amount").notNull().default(0),
    totalAmount: integer("total_amount").notNull(),
    requiresShipping: boolean("requires_shipping").notNull().default(false),
    shippingAddress: jsonb("shipping_address").$type<CommerceAddress | null>(),
    cartSnapshot: jsonb("cart_snapshot")
      .notNull()
      .$type<CommerceCartItemSnapshot[]>(),
    providerCheckoutId: text("provider_checkout_id"),
    providerOrderId: text("provider_order_id"),
    providerCustomerId: text("provider_customer_id"),
    checkoutUrl: text("checkout_url"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("commerce_checkout_status_idx").on(table.status),
    index("commerce_checkout_buyer_email_idx").on(table.buyerEmail),
    index("commerce_checkout_provider_checkout_idx").on(
      table.provider,
      table.providerCheckoutId,
    ),
  ],
);

export const commerceOrder = pgTable(
  "commerce_order",
  {
    id: text("id").primaryKey(),
    checkoutId: text("checkout_id").references(() => commerceCheckout.id, {
      onDelete: "set null",
    }),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    status: text("status").notNull().$type<CommerceOrderStatus>(),
    buyerEmail: text("buyer_email").notNull(),
    buyerName: text("buyer_name"),
    buyerPhone: text("buyer_phone"),
    buyerUserId: text("buyer_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    currency: text("currency").notNull(),
    subtotalAmount: integer("subtotal_amount").notNull(),
    taxAmount: integer("tax_amount").notNull().default(0),
    shippingAmount: integer("shipping_amount").notNull().default(0),
    totalAmount: integer("total_amount").notNull(),
    requiresShipping: boolean("requires_shipping").notNull().default(false),
    shippingAddress: jsonb("shipping_address").$type<CommerceAddress | null>(),
    providerCheckoutId: text("provider_checkout_id"),
    providerOrderId: text("provider_order_id"),
    providerCustomerId: text("provider_customer_id"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    claimedAt: timestamp("claimed_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("commerce_order_checkout_idx").on(table.checkoutId),
    index("commerce_order_buyer_email_idx").on(table.buyerEmail),
    index("commerce_order_buyer_user_idx").on(table.buyerUserId),
    index("commerce_order_provider_checkout_idx").on(
      table.provider,
      table.providerCheckoutId,
    ),
    uniqueIndex("commerce_order_provider_order_idx").on(
      table.provider,
      table.providerOrderId,
    ),
  ],
);

export const commerceOrderItem = pgTable(
  "commerce_order_item",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => commerceOrder.id, { onDelete: "cascade" }),
    sku: text("sku").notNull(),
    title: text("title").notNull(),
    kind: text("kind").notNull().$type<CommerceItemKind>(),
    quantity: integer("quantity").notNull(),
    unitAmount: integer("unit_amount").notNull(),
    totalAmount: integer("total_amount").notNull(),
    currency: text("currency").notNull(),
    requiresShipping: boolean("requires_shipping").notNull().default(false),
    fulfillmentStatus: text("fulfillment_status")
      .notNull()
      .$type<CommerceFulfillmentStatus>()
      .default("pending"),
    fulfillmentMetadata: jsonb("fulfillment_metadata").$type<
      Record<string, unknown> | null
    >(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("commerce_order_item_order_idx").on(table.orderId),
    index("commerce_order_item_sku_idx").on(table.sku),
  ],
);

export const commerceOrderClaim = pgTable(
  "commerce_order_claim",
  {
    id: text("id").primaryKey(),
    orderId: text("order_id")
      .notNull()
      .references(() => commerceOrder.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull(),
    status: text("status").notNull().$type<CommerceClaimStatus>().default("pending"),
    claimedByUserId: text("claimed_by_user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    claimedAt: timestamp("claimed_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("commerce_order_claim_order_idx").on(table.orderId),
    index("commerce_order_claim_email_idx").on(table.email),
    uniqueIndex("commerce_order_claim_token_idx").on(table.tokenHash),
  ],
);

export const commerceCheckoutRelations = relations(commerceCheckout, ({ many }) => ({
  orders: many(commerceOrder),
}));

export const commerceOrderRelations = relations(commerceOrder, ({ many, one }) => ({
  checkout: one(commerceCheckout, {
    fields: [commerceOrder.checkoutId],
    references: [commerceCheckout.id],
  }),
  buyerUser: one(user, {
    fields: [commerceOrder.buyerUserId],
    references: [user.id],
  }),
  items: many(commerceOrderItem),
  claims: many(commerceOrderClaim),
}));

export const commerceOrderItemRelations = relations(commerceOrderItem, ({ one }) => ({
  order: one(commerceOrder, {
    fields: [commerceOrderItem.orderId],
    references: [commerceOrder.id],
  }),
}));

export const commerceOrderClaimRelations = relations(commerceOrderClaim, ({ one }) => ({
  order: one(commerceOrder, {
    fields: [commerceOrderClaim.orderId],
    references: [commerceOrder.id],
  }),
  claimedByUser: one(user, {
    fields: [commerceOrderClaim.claimedByUserId],
    references: [user.id],
  }),
}));
