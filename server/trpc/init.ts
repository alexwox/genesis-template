import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";

import type { statements } from "@/lib/auth/permissions";
import { auth } from "@/lib/auth";
import type { TRPCContext } from "@/server/trpc/context";

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});

type PermissionsInput = {
  [K in keyof typeof statements]?: Array<(typeof statements)[K][number]>;
};

const requireSession = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to access this resource.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  });
});

const requireOrganization = t.middleware(({ ctx, next }) => {
  if (!ctx.activeOrganization || !ctx.activeMember || !ctx.activeOrganizationId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "An active organization is required to access this resource.",
    });
  }

  return next({
    ctx: {
      ...ctx,
      activeMember: ctx.activeMember,
      activeOrganization: ctx.activeOrganization,
      activeOrganizationId: ctx.activeOrganizationId,
    },
  });
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(requireSession);
export const organizationProcedure = protectedProcedure.use(requireOrganization);
export const permissionedProcedure = (permissions: PermissionsInput) =>
  organizationProcedure.use(async ({ ctx, next }) => {
    const hasPermission = await auth.api.hasPermission({
      headers: ctx.requestHeaders,
      body: {
        organizationId: ctx.activeOrganizationId || undefined,
        permissions,
      },
    });

    if (!hasPermission.success) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have permission to perform this action.",
      });
    }

    return next();
  });
