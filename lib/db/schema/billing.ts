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


/** Who is billed: a user account or an organization (team). */
export const billingReferenceTypeEnum = ["user", "organization"] as const;
export type BillingReferenceType = (typeof billingReferenceTypeEnum)[number];

/** Active payment provider for this deployment. */
export const paymentProviderEnum = ["stripe", "polar"] as const;
export type PaymentProviderId = (typeof paymentProviderEnum)[number];

/**
 * Maps an internal user or org to a provider customer id.
 * One row per (reference, provider) when billing is enabled.
 */
export const billingCustomer = pgTable(
  "billing_customer",
  {
    id: text("id").primaryKey(),
    referenceType: text("reference_type").notNull().$type<BillingReferenceType>(),
    referenceId: text("reference_id").notNull(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    providerCustomerId: text("provider_customer_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("billing_customer_ref_provider_idx").on(
      table.referenceType,
      table.referenceId,
      table.provider,
    ),
    index("billing_customer_referenceId_idx").on(table.referenceId),
  ],
);

/**
 * Normalized subscription snapshot for entitlements and UI.
 * Source of truth after sync from webhooks + reconciliation.
 */
export const billingSubscription = pgTable(
  "billing_subscription",
  {
    id: text("id").primaryKey(),
    referenceType: text("reference_type").notNull().$type<BillingReferenceType>(),
    referenceId: text("reference_id").notNull(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    providerCustomerId: text("provider_customer_id"),
    providerSubscriptionId: text("provider_subscription_id"),
    planKey: text("plan_key").notNull(),
    status: text("status").notNull(),
    interval: text("interval"),
    seats: integer("seats"),
    periodStart: timestamp("period_start", { withTimezone: true }),
    periodEnd: timestamp("period_end", { withTimezone: true }),
    cancelAtPeriodEnd: boolean("cancel_at_period_end"),
    canceledAt: timestamp("canceled_at", { withTimezone: true }),
    endedAt: timestamp("ended_at", { withTimezone: true }),
    trialStart: timestamp("trial_start", { withTimezone: true }),
    trialEnd: timestamp("trial_end", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("billing_subscription_reference_idx").on(
      table.referenceType,
      table.referenceId,
    ),
    index("billing_subscription_provider_sub_idx").on(
      table.provider,
      table.providerSubscriptionId,
    ),
  ],
);

/**
 * One-time purchases and top-ups (normalized order snapshot).
 */
export const billingOrder = pgTable(
  "billing_order",
  {
    id: text("id").primaryKey(),
    referenceType: text("reference_type").notNull().$type<BillingReferenceType>(),
    referenceId: text("reference_id").notNull(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    providerOrderId: text("provider_order_id"),
    providerCheckoutId: text("provider_checkout_id"),
    planKey: text("plan_key"),
    status: text("status").notNull(),
    mode: text("mode").notNull(),
    currency: text("currency"),
    amount: integer("amount"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("billing_order_reference_idx").on(
      table.referenceType,
      table.referenceId,
    ),
    index("billing_order_provider_order_idx").on(
      table.provider,
      table.providerOrderId,
    ),
  ],
);

/**
 * Optional local summary of hosted invoices/receipts for future UI or analytics.
 */
export const billingDocument = pgTable(
  "billing_document",
  {
    id: text("id").primaryKey(),
    referenceType: text("reference_type").notNull().$type<BillingReferenceType>(),
    referenceId: text("reference_id").notNull(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    providerDocumentId: text("provider_document_id").notNull(),
    documentType: text("document_type").notNull(),
    status: text("status"),
    currency: text("currency"),
    amount: integer("amount"),
    hostedUrl: text("hosted_url"),
    issuedAt: timestamp("issued_at", { withTimezone: true }),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("billing_document_reference_idx").on(
      table.referenceType,
      table.referenceId,
    ),
    uniqueIndex("billing_document_provider_doc_idx").on(
      table.provider,
      table.providerDocumentId,
    ),
  ],
);

/**
 * Idempotent webhook processing: store provider event ids to dedupe retries.
 */
export const billingEvent = pgTable(
  "billing_event",
  {
    id: text("id").primaryKey(),
    provider: text("provider").notNull().$type<PaymentProviderId>(),
    providerEventId: text("provider_event_id").notNull(),
    eventType: text("event_type").notNull(),
    processedAt: timestamp("processed_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    payloadSummary: jsonb("payload_summary").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("billing_event_provider_event_idx").on(
      table.provider,
      table.providerEventId,
    ),
  ],
);

export const billingCustomerRelations = relations(billingCustomer, () => ({}));

export const billingSubscriptionRelations = relations(
  billingSubscription,
  () => ({}),
);

export const billingOrderRelations = relations(billingOrder, () => ({}));

export const billingDocumentRelations = relations(billingDocument, () => ({}));

export const billingEventRelations = relations(billingEvent, () => ({}));
