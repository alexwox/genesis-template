import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/auth";
import type { statements } from "@/lib/auth/permissions";
import { db } from "@/lib/db";
import { dashboard, dashboardShare } from "@/lib/db/schema";
import { slugify } from "@/lib/slug";
import { createTRPCRouter, protectedProcedure } from "@/server/trpc/init";

async function getOrganizationAccess(userId: string, organizationSlug: string) {
  const scopedOrganization = await db.query.organization.findFirst({
    where: (organizations, { eq }) => eq(organizations.slug, organizationSlug),
  });

  if (!scopedOrganization) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Organization not found.",
    });
  }

  const membership = await db.query.member.findFirst({
    where: (members, { and, eq }) =>
      and(
        eq(members.organizationId, scopedOrganization.id),
        eq(members.userId, userId),
      ),
  });

  if (!membership) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not a member of this organization.",
    });
  }

  return {
    membership,
    organization: scopedOrganization,
  };
}

async function ensurePermission(
  headers: Headers,
  organizationId: string,
  permissions: {
    [K in keyof typeof statements]?: Array<(typeof statements)[K][number]>;
  },
) {
  const hasPermission = await auth.api.hasPermission({
    headers,
    body: {
      organizationId,
      permissions,
    },
  });

  if (!hasPermission.success) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You do not have permission to access this dashboard resource.",
    });
  }
}

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

export const dashboardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      scopedDashboardInput.extend({
        description: z.string().trim().min(1).max(400).optional(),
        title: z.string().trim().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const access = await getOrganizationAccess(
        ctx.user.id,
        input.organizationSlug,
      );

      await ensurePermission(ctx.requestHeaders, access.organization.id, {
        dashboard: ["create"],
      });

      const createdDashboard = (
        await db
          .insert(dashboard)
          .values({
            id: crypto.randomUUID(),
            organizationId: access.organization.id,
            createdByUserId: ctx.user.id,
            description: input.description,
            slug: await createUniqueDashboardSlug(
              access.organization.id,
              input.title,
            ),
            title: input.title,
          })
          .returning()
      )[0];

      return createdDashboard;
    }),
  list: protectedProcedure
    .input(scopedDashboardInput)
    .query(async ({ ctx, input }) => {
      const access = await getOrganizationAccess(
        ctx.user.id,
        input.organizationSlug,
      );

      await ensurePermission(ctx.requestHeaders, access.organization.id, {
        dashboard: ["read"],
      });

      const dashboards = await db.query.dashboard.findMany({
        where: (dashboards, { eq }) =>
          eq(dashboards.organizationId, access.organization.id),
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
  revokeShare: protectedProcedure
    .input(
      scopedDashboardInput.extend({
        dashboardId: z.string().min(1),
        memberId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const access = await getOrganizationAccess(
        ctx.user.id,
        input.organizationSlug,
      );

      await ensurePermission(ctx.requestHeaders, access.organization.id, {
        dashboard: ["share"],
        dashboardShare: ["delete"],
      });

      await db
        .delete(dashboardShare)
        .where(
          and(
            eq(dashboardShare.dashboardId, input.dashboardId),
            eq(dashboardShare.memberId, input.memberId),
            eq(dashboardShare.organizationId, access.organization.id),
          ),
        );

      return {
        status: "ok" as const,
      };
    }),
  share: protectedProcedure
    .input(
      scopedDashboardInput.extend({
        dashboardId: z.string().min(1),
        memberId: z.string().min(1),
        permission: z.enum(["editor", "viewer"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const access = await getOrganizationAccess(
        ctx.user.id,
        input.organizationSlug,
      );

      await ensurePermission(ctx.requestHeaders, access.organization.id, {
        dashboard: ["share"],
        dashboardShare: ["create"],
      });

      const existingDashboard = await db.query.dashboard.findFirst({
        where: (dashboards, { and, eq }) =>
          and(
            eq(dashboards.id, input.dashboardId),
            eq(dashboards.organizationId, access.organization.id),
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
            eq(members.organizationId, access.organization.id),
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
            organizationId: access.organization.id,
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
