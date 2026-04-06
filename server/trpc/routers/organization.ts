import { getOrganizationPermissionState } from "@/lib/auth/permissions";
import { organizationProcedure, createTRPCRouter } from "@/server/trpc/init";

export const organizationRouter = createTRPCRouter({
  current: organizationProcedure.query(({ ctx }) => {
    return {
      activeMember: ctx.activeMember,
      activeOrganization: ctx.activeOrganization,
      permissions: getOrganizationPermissionState(ctx.activeMember.role),
    };
  }),
});
