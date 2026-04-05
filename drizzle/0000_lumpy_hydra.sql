CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp,
	"inviter_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"logo" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organization_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"active_organization_id" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dashboard" (
	"id" text PRIMARY KEY NOT NULL,
	"organization_id" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dashboard_share" (
	"id" text PRIMARY KEY NOT NULL,
	"dashboard_id" text NOT NULL,
	"organization_id" text NOT NULL,
	"member_id" text NOT NULL,
	"created_by_user_id" text NOT NULL,
	"permission" text DEFAULT 'viewer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviter_id_user_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member" ADD CONSTRAINT "member_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_active_organization_id_organization_id_fk" FOREIGN KEY ("active_organization_id") REFERENCES "public"."organization"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard_share" ADD CONSTRAINT "dashboard_share_dashboard_id_dashboard_id_fk" FOREIGN KEY ("dashboard_id") REFERENCES "public"."dashboard"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard_share" ADD CONSTRAINT "dashboard_share_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard_share" ADD CONSTRAINT "dashboard_share_member_id_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."member"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dashboard_share" ADD CONSTRAINT "dashboard_share_created_by_user_id_user_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "invitation_organizationId_idx" ON "invitation" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "invitation_email_idx" ON "invitation" USING btree ("email");--> statement-breakpoint
CREATE INDEX "invitation_status_idx" ON "invitation" USING btree ("status");--> statement-breakpoint
CREATE INDEX "member_organizationId_idx" ON "member" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "member_userId_idx" ON "member" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "member_organizationId_userId_idx" ON "member" USING btree ("organization_id","user_id");--> statement-breakpoint
CREATE INDEX "organization_slug_idx" ON "organization" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_activeOrganizationId_idx" ON "session" USING btree ("active_organization_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "dashboard_organizationId_idx" ON "dashboard" USING btree ("organization_id");--> statement-breakpoint
CREATE INDEX "dashboard_createdByUserId_idx" ON "dashboard" USING btree ("created_by_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "dashboard_organizationId_slug_idx" ON "dashboard" USING btree ("organization_id","slug");--> statement-breakpoint
CREATE INDEX "dashboardShare_dashboardId_idx" ON "dashboard_share" USING btree ("dashboard_id");--> statement-breakpoint
CREATE INDEX "dashboardShare_memberId_idx" ON "dashboard_share" USING btree ("member_id");--> statement-breakpoint
CREATE UNIQUE INDEX "dashboardShare_dashboardId_memberId_idx" ON "dashboard_share" USING btree ("dashboard_id","member_id");