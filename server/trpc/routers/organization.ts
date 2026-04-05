import { auth } from "@/lib/auth";
import { organizationProcedure, createTRPCRouter } from "@/server/trpc/init";

async function getPermissionState(headers: Headers, organizationId: string) {
  const [
    canCreateDashboard,
    canInviteMembers,
    canManageDashboardShares,
    canManageMembers,
    canUpdateOrganization,
  ] = await Promise.all([
    auth.api.hasPermission({
      headers,
      body: {
        organizationId,
        permissions: {
          dashboard: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers,
      body: {
        organizationId,
        permissions: {
          invitation: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers,
      body: {
        organizationId,
        permissions: {
          dashboardShare: ["create"],
        },
      },
    }),
    auth.api.hasPermission({
      headers,
      body: {
        organizationId,
        permissions: {
          member: ["update"],
        },
      },
    }),
    auth.api.hasPermission({
      headers,
      body: {
        organizationId,
        permissions: {
          organization: ["update"],
        },
      },
    }),
  ]);

  return {
    canCreateDashboard: canCreateDashboard.success,
    canInviteMembers: canInviteMembers.success,
    canManageDashboardShares: canManageDashboardShares.success,
    canManageMembers: canManageMembers.success,
    canUpdateOrganization: canUpdateOrganization.success,
  };
}

export const organizationRouter = createTRPCRouter({
  current: organizationProcedure.query(async ({ ctx }) => {
    return {
      activeMember: ctx.activeMember,
      activeOrganization: ctx.activeOrganization,
      permissions: await getPermissionState(
        ctx.requestHeaders,
        ctx.activeOrganizationId,
      ),
    };
  }),
});
