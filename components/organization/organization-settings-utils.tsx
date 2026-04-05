import type { ReactNode } from "react";

import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";

export const inviteRoleOptions = ["viewer", "editor", "admin"] as const;
export const memberRoleOptions = ["viewer", "editor", "admin"] as const;

export type AssignableRole = (typeof inviteRoleOptions)[number];

type ErrorCarrier = {
  error?: unknown;
};

export function getInitials(name: string, email: string) {
  const source = name.trim() || email.trim();
  const parts = source.split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return "G";
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function getDisplayRole(role: string) {
  return role === "member" ? "viewer" : role;
}

export async function getOrganizationActionError<T extends ErrorCarrier>(
  action: Promise<T>,
) {
  const { data: result, error } = await tryCatch(action);
  if (error) return getErrorMessage(error);
  if (result.error) return getErrorMessage(result.error);
  return null;
}

type SettingsSectionProps = {
  children: ReactNode;
  description: string;
  icon: ReactNode;
  title: string;
};

export function SettingsSection({
  children,
  description,
  icon,
  title,
}: SettingsSectionProps) {
  return (
    <section className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-muted/50">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}
