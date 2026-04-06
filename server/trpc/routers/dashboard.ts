import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { dashboard, dashboardShare } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";
import { createTRPCRouter, permissionedProcedure } from "@/server/trpc/init";

async function createUniqueDashboardSlug(
  organizationId: string,
  title: string,
): Promise<string> {
  const baseSlug = slugify(title) || "dashboard";
  let candidate = baseSlug;
  let suffix = 2;

  for (;;) {
    const existingDashboard = await db.query.dashboard.findFirst({
      where: (dashboards, { and, eq }) =>
        and(
          eq(dashboards.organizationId, organizationId),
          eq(dashboards.slug, candidate),
        ),
    });

    if (!existingDashboard) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

const scopedDashboardInput = z.object({
  organizationSlug: z.string().min(1),
});

function assertActiveOrganizationSlug(
  activeOrganizationSlug: string,
  requestedOrganizationSlug: string,
) {
  if (activeOrganizationSlug === requestedOrganizationSlug) {
    return;
  }

  throw new TRPCError({
    code: "FORBIDDEN",
    message:
      "The requested organization does not match your active workspace. Switch workspaces before trying again.",
  });
}

export const dashboardRouter = createTRPCRouter({
  create: permissionedProcedure({
    dashboard: ["create"],
  })
    .input(
      scopedDashboardInput.extend({
        description: z.string().trim().min(1).max(400).optional(),
        title: z.string().trim().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      assertActiveOrganizationSlug(
        ctx.activeOrganization.slug,
        input.organizationSlug,
      );
      const organizationId = ctx.activeOrganization.id;

      const createdDashboard = (
        await db
          .insert(dashboard)
          .values({
            id: crypto.randomUUID(),
            organizationId,
            createdByUserId: ctx.user.id,
            description: input.description,
            slug: await createUniqueDashboardSlug(organizationId, input.title),
            title: input.title,
          })
          .returning()
      )[0];

      return createdDashboard;
    }),
  list: permissionedProcedure({
    dashboard: ["read"],
  })
    .input(scopedDashboardInput)
    .query(async ({ ctx, input }) => {
      assertActiveOrganizationSlug(
        ctx.activeOrganization.slug,
        input.organizationSlug,
      );
      const organizationId = ctx.activeOrganization.id;

      const dashboards = await db.query.dashboard.findMany({
        where: (dashboards, { eq }) =>
          eq(dashboards.organizationId, organizationId),
        orderBy: (dashboards, { desc }) => [desc(dashboards.updatedAt)],
        with: {
          createdByUser: true,
          shares: {
            with: {
              member: {
                with: {
                  user: true,
                },
              },
            },
          },
        },
      });

      return dashboards.map((currentDashboard) => ({
        ...currentDashboard,
        shareCount: currentDashboard.shares.length,
      }));
    }),
  revokeShare: permissionedProcedure({
    dashboard: ["share"],
    dashboardShare: ["delete"],
  })
    .input(
      scopedDashboardInput.extend({
        dashboardId: z.string().min(1),
        memberId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      assertActiveOrganizationSlug(
        ctx.activeOrganization.slug,
        input.organizationSlug,
      );
      const organizationId = ctx.activeOrganization.id;

      await db
        .delete(dashboardShare)
        .where(
          and(
            eq(dashboardShare.dashboardId, input.dashboardId),
            eq(dashboardShare.memberId, input.memberId),
            eq(dashboardShare.organizationId, organizationId),
          ),
        );

      return {
        status: "ok" as const,
      };
    }),
  share: permissionedProcedure({
    dashboard: ["share"],
    dashboardShare: ["create"],
  })
    .input(
      scopedDashboardInput.extend({
        dashboardId: z.string().min(1),
        memberId: z.string().min(1),
        permission: z.enum(["editor", "viewer"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      assertActiveOrganizationSlug(
        ctx.activeOrganization.slug,
        input.organizationSlug,
      );
      const organizationId = ctx.activeOrganization.id;

      const existingDashboard = await db.query.dashboard.findFirst({
        where: (dashboards, { and, eq }) =>
          and(
            eq(dashboards.id, input.dashboardId),
            eq(dashboards.organizationId, organizationId),
          ),
      });

      if (!existingDashboard) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Dashboard not found.",
        });
      }

      const targetMember = await db.query.member.findFirst({
        where: (members, { and, eq }) =>
          and(
            eq(members.id, input.memberId),
            eq(members.organizationId, organizationId),
          ),
      });

      if (!targetMember) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Member not found.",
        });
      }

      const sharedDashboard = (
        await db
          .insert(dashboardShare)
          .values({
            id: crypto.randomUUID(),
            createdByUserId: ctx.user.id,
            dashboardId: existingDashboard.id,
            memberId: targetMember.id,
            organizationId,
            permission: input.permission,
          })
          .onConflictDoUpdate({
            target: [dashboardShare.dashboardId, dashboardShare.memberId],
            set: {
              createdByUserId: ctx.user.id,
              permission: input.permission,
            },
          })
          .returning()
      )[0];

      return sharedDashboard;
    }),
});
