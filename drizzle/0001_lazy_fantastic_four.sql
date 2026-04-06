CREATE TABLE "billing_customer" (
	"id" text PRIMARY KEY NOT NULL,
	"reference_type" text NOT NULL,
	"reference_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_customer_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_document" (
	"id" text PRIMARY KEY NOT NULL,
	"reference_type" text NOT NULL,
	"reference_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_document_id" text NOT NULL,
	"document_type" text NOT NULL,
	"status" text,
	"currency" text,
	"amount" integer,
	"hosted_url" text,
	"issued_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_event" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"provider_event_id" text NOT NULL,
	"event_type" text NOT NULL,
	"processed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"payload_summary" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_order" (
	"id" text PRIMARY KEY NOT NULL,
	"reference_type" text NOT NULL,
	"reference_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_order_id" text,
	"provider_checkout_id" text,
	"plan_key" text,
	"status" text NOT NULL,
	"mode" text NOT NULL,
	"currency" text,
	"amount" integer,
	"metadata" jsonb,
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "billing_subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"reference_type" text NOT NULL,
	"reference_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_customer_id" text,
	"provider_subscription_id" text,
	"plan_key" text NOT NULL,
	"status" text NOT NULL,
	"interval" text,
	"seats" integer,
	"period_start" timestamp with time zone,
	"period_end" timestamp with time zone,
	"cancel_at_period_end" boolean,
	"canceled_at" timestamp with time zone,
	"ended_at" timestamp with time zone,
	"trial_start" timestamp with time zone,
	"trial_end" timestamp with time zone,
	"metadata" jsonb,
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "billing_customer_ref_provider_idx" ON "billing_customer" USING btree ("reference_type","reference_id","provider");--> statement-breakpoint
CREATE INDEX "billing_customer_referenceId_idx" ON "billing_customer" USING btree ("reference_id");--> statement-breakpoint
CREATE INDEX "billing_document_reference_idx" ON "billing_document" USING btree ("reference_type","reference_id");--> statement-breakpoint
CREATE UNIQUE INDEX "billing_document_provider_doc_idx" ON "billing_document" USING btree ("provider","provider_document_id");--> statement-breakpoint
CREATE UNIQUE INDEX "billing_event_provider_event_idx" ON "billing_event" USING btree ("provider","provider_event_id");--> statement-breakpoint
CREATE INDEX "billing_order_reference_idx" ON "billing_order" USING btree ("reference_type","reference_id");--> statement-breakpoint
CREATE INDEX "billing_order_provider_order_idx" ON "billing_order" USING btree ("provider","provider_order_id");--> statement-breakpoint
CREATE INDEX "billing_subscription_reference_idx" ON "billing_subscription" USING btree ("reference_type","reference_id");--> statement-breakpoint
CREATE INDEX "billing_subscription_provider_sub_idx" ON "billing_subscription" USING btree ("provider","provider_subscription_id");