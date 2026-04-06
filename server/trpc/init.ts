import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import { checkPermission, type PermissionInput } from "@/lib/auth/permissions";
import {
  getActiveMember,
  getFullOrganization,
  getSession,
} from "@/lib/auth-session";
import type { TRPCContext } from "@/server/trpc/context";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

const requireSession = t.middleware(async ({ ctx, next }) => {
  const authSession = await getSession();

  if (!authSession) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to access this resource.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      authSession,
      session: authSession.session,
      user: authSession.user,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(requireSession);
export const organizationProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const activeOrganizationId = ctx.session.activeOrganizationId;

    if (!activeOrganizationId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "An active organization is required to access this resource.",
      });
    }

    const [activeMember, activeOrganization] = await Promise.all([
      getActiveMember(),
      getFullOrganization(),
    ]);

    if (activeOrganization?.id !== activeOrganizationId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "An active organization is required to access this resource.",
      });
    }

    return next({
      ctx: {
        ...ctx,
        activeMember,
        activeOrganization,
        activeOrganizationId,
      },
    });
  },
);
export const permissionedProcedure = (permissions: PermissionInput) =>
  organizationProcedure.use(({ ctx, next }) => {
    const hasAccess = checkPermission(ctx.activeMember.role, permissions);

    if (!hasAccess) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to perform this action.",
      });
    }

    return next();
  });
