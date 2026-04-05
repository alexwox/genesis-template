import type { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/trpc/router";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type DashboardListItem = RouterOutput["dashboards"]["list"][number];

export const sharePermissionOptions = ["viewer", "editor"] as const;

export type SharePermission = (typeof sharePermissionOptions)[number];

export function getInitials(name: string, email: string) {
  const source = name.trim() || email.trim();
  const parts = source.split(/\s+/).filter(Boolean).slice(0, 2);

  if (parts.length === 0) {
    return "G";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}
