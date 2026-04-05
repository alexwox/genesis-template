import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { tryCatch } from "@/lib/try-catch";

const trpcContextLogger = logger.child({ scope: "trpc.context" });

export async function createTRPCContext(opts: FetchCreateContextFnOptions) {
  const { data: authSession, error: sessionError } = await tryCatch(
    auth.api.getSession({
      headers: opts.req.headers,
    }),
  );

  if (sessionError) {
    trpcContextLogger.warn("Unable to resolve auth session for request context.", {
      error: sessionError,
      path: opts.req.url,
    });
  }

  const activeOrganizationId = authSession?.session.activeOrganizationId ?? null;
  const activeMemberResult = activeOrganizationId
    ? await tryCatch(
        auth.api.getActiveMember({
          headers: opts.req.headers,
        }),
      )
    : { data: null, error: null };

  if (activeMemberResult.error) {
    trpcContextLogger.debug("Unable to resolve active member for request context.", {
      activeOrganizationId,
      error: activeMemberResult.error,
      path: opts.req.url,
    });
  }

  const activeOrganizationResult = activeOrganizationId
    ? await tryCatch(
        auth.api.getFullOrganization({
          headers: opts.req.headers,
        }),
      )
    : { data: null, error: null };

  if (activeOrganizationResult.error) {
    trpcContextLogger.debug("Unable to resolve active organization for request context.", {
      activeOrganizationId,
      error: activeOrganizationResult.error,
      path: opts.req.url,
    });
  }

  const activeMember = activeMemberResult.data ?? null;
  const activeOrganization = activeOrganizationResult.data ?? null;

  return {
    activeMember,
    activeOrganization,
    activeOrganizationId,
    authSession,
    requestHeaders: opts.req.headers,
    session: authSession?.session ?? null,
    user: authSession?.user ?? null,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
