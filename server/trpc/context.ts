import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export function createTRPCContext(opts: FetchCreateContextFnOptions) {
  return {
    requestHeaders: opts.req.headers,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
