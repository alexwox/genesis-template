CREATE TABLE "commerce_checkout" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"status" text NOT NULL,
	"buyer_email" text NOT NULL,
	"buyer_name" text,
	"buyer_phone" text,
	"currency" text NOT NULL,
	"subtotal_amount" integer NOT NULL,
	"tax_amount" integer DEFAULT 0 NOT NULL,
	"shipping_amount" integer DEFAULT 0 NOT NULL,
	"total_amount" integer NOT NULL,
	"requires_shipping" boolean DEFAULT false NOT NULL,
	"shipping_address" jsonb,
	"cart_snapshot" jsonb NOT NULL,
	"provider_checkout_id" text,
	"provider_order_id" text,
	"provider_customer_id" text,
	"checkout_url" text,
	"metadata" jsonb,
	"expires_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"canceled_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commerce_order" (
	"id" text PRIMARY KEY NOT NULL,
	"checkout_id" text,
	"provider" text NOT NULL,
	"status" text NOT NULL,
	"buyer_email" text NOT NULL,
	"buyer_name" text,
	"buyer_phone" text,
	"buyer_user_id" text,
	"currency" text NOT NULL,
	"subtotal_amount" integer NOT NULL,
	"tax_amount" integer DEFAULT 0 NOT NULL,
	"shipping_amount" integer DEFAULT 0 NOT NULL,
	"total_amount" integer NOT NULL,
	"requires_shipping" boolean DEFAULT false NOT NULL,
	"shipping_address" jsonb,
	"provider_checkout_id" text,
	"provider_order_id" text,
	"provider_customer_id" text,
	"paid_at" timestamp with time zone,
	"claimed_at" timestamp with time zone,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commerce_order_claim" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"email" text NOT NULL,
	"token_hash" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"claimed_by_user_id" text,
	"expires_at" timestamp with time zone NOT NULL,
	"claimed_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commerce_order_item" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"sku" text NOT NULL,
	"title" text NOT NULL,
	"kind" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit_amount" integer NOT NULL,
	"total_amount" integer NOT NULL,
	"currency" text NOT NULL,
	"requires_shipping" boolean DEFAULT false NOT NULL,
	"fulfillment_status" text DEFAULT 'pending' NOT NULL,
	"fulfillment_metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "commerce_order" ADD CONSTRAINT "commerce_order_checkout_id_commerce_checkout_id_fk" FOREIGN KEY ("checkout_id") REFERENCES "public"."commerce_checkout"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commerce_order" ADD CONSTRAINT "commerce_order_buyer_user_id_user_id_fk" FOREIGN KEY ("buyer_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commerce_order_claim" ADD CONSTRAINT "commerce_order_claim_order_id_commerce_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."commerce_order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commerce_order_claim" ADD CONSTRAINT "commerce_order_claim_claimed_by_user_id_user_id_fk" FOREIGN KEY ("claimed_by_user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commerce_order_item" ADD CONSTRAINT "commerce_order_item_order_id_commerce_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."commerce_order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "commerce_checkout_status_idx" ON "commerce_checkout" USING btree ("status");--> statement-breakpoint
CREATE INDEX "commerce_checkout_buyer_email_idx" ON "commerce_checkout" USING btree ("buyer_email");--> statement-breakpoint
CREATE INDEX "commerce_checkout_provider_checkout_idx" ON "commerce_checkout" USING btree ("provider","provider_checkout_id");--> statement-breakpoint
CREATE INDEX "commerce_order_checkout_idx" ON "commerce_order" USING btree ("checkout_id");--> statement-breakpoint
CREATE INDEX "commerce_order_buyer_email_idx" ON "commerce_order" USING btree ("buyer_email");--> statement-breakpoint
CREATE INDEX "commerce_order_buyer_user_idx" ON "commerce_order" USING btree ("buyer_user_id");--> statement-breakpoint
CREATE INDEX "commerce_order_provider_checkout_idx" ON "commerce_order" USING btree ("provider","provider_checkout_id");--> statement-breakpoint
CREATE UNIQUE INDEX "commerce_order_provider_order_idx" ON "commerce_order" USING btree ("provider","provider_order_id");--> statement-breakpoint
CREATE INDEX "commerce_order_claim_order_idx" ON "commerce_order_claim" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "commerce_order_claim_email_idx" ON "commerce_order_claim" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "commerce_order_claim_token_idx" ON "commerce_order_claim" USING btree ("token_hash");--> statement-breakpoint
CREATE INDEX "commerce_order_item_order_idx" ON "commerce_order_item" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "commerce_order_item_sku_idx" ON "commerce_order_item" USING btree ("sku");