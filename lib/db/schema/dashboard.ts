import { relations } from "drizzle-orm";
import {
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { member, organization, user } from "@/lib/db/schema/auth";

export const dashboard = pgTable(
  "dashboard",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    createdByUserId: text("created_by_user_id")
      .notNull()
      .references(() => user.id),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("dashboard_organizationId_idx").on(table.organizationId),
    index("dashboard_createdByUserId_idx").on(table.createdByUserId),
    uniqueIndex("dashboard_organizationId_slug_idx").on(
      table.organizationId,
      table.slug,
    ),
  ],
);

export const dashboardShare = pgTable(
  "dashboard_share",
  {
    id: text("id").primaryKey(),
    dashboardId: text("dashboard_id")
      .notNull()
      .references(() => dashboard.id, { onDelete: "cascade" }),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id, { onDelete: "cascade" }),
    memberId: text("member_id")
      .notNull()
      .references(() => member.id, { onDelete: "cascade" }),
    createdByUserId: text("created_by_user_id")
      .notNull()
      .references(() => user.id),
    permission: text("permission").notNull().default("viewer"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("dashboardShare_dashboardId_idx").on(table.dashboardId),
    index("dashboardShare_memberId_idx").on(table.memberId),
    uniqueIndex("dashboardShare_dashboardId_memberId_idx").on(
      table.dashboardId,
      table.memberId,
    ),
  ],
);

export const dashboardRelations = relations(dashboard, ({ many, one }) => ({
  createdByUser: one(user, {
    fields: [dashboard.createdByUserId],
    references: [user.id],
  }),
  organization: one(organization, {
    fields: [dashboard.organizationId],
    references: [organization.id],
  }),
  shares: many(dashboardShare),
}));

export const dashboardShareRelations = relations(dashboardShare, ({ one }) => ({
  dashboard: one(dashboard, {
    fields: [dashboardShare.dashboardId],
    references: [dashboard.id],
  }),
  member: one(member, {
    fields: [dashboardShare.memberId],
    references: [member.id],
  }),
  createdByUser: one(user, {
    fields: [dashboardShare.createdByUserId],
    references: [user.id],
  }),
  organization: one(organization, {
    fields: [dashboardShare.organizationId],
    references: [organization.id],
  }),
}));
