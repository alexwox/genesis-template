import { createTRPCRouter, publicProcedure } from "@/server/trpc/init";
import { dashboardRouter } from "@/server/trpc/routers/dashboard";
import { organizationRouter } from "@/server/trpc/routers/organization";

export const appRouter = createTRPCRouter({
  dashboards: dashboardRouter,
  health: publicProcedure.query(() => {
    return {
      status: "ok" as const,
    };
  }),
  organization: organizationRouter,
});

export type AppRouter = typeof appRouter;
