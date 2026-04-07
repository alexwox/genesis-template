"use client";

import { useCallback, useEffect, useState } from "react";

import { OrganizationShellHero } from "@/components/organization/organization-shell-hero";
import { CreateDashboardCard } from "@/components/workspace/create-dashboard-card";
import { DashboardList } from "@/components/workspace/dashboard-list";
import { ShareDashboardDialog } from "@/components/workspace/share-dashboard-dialog";
import type { DashboardListItem } from "@/components/workspace/workspace-types";
import { getErrorMessage } from "@/lib/error-utils";
import type { ResolvedOrganization } from "@/lib/organization-server";
import { tryCatch } from "@/lib/try-catch";
import { useTRPCClient } from "@/trpc/client";

type OrganizationWorkspaceProps = {
  canCreateDashboard: boolean;
  canManageDashboardShares: boolean;
  organization: ResolvedOrganization;
};

function useDashboards(organizationSlug: string) {
  const trpcClient = useTRPCClient();
  const [dashboards, setDashboards] = useState<DashboardListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);

    const { data, error: loadError } = await tryCatch(
      trpcClient.dashboards.list.query({
        organizationSlug,
      }),
    );

    setIsLoading(false);

    if (loadError) {
      setError(getErrorMessage(loadError));
      return;
    }

    setDashboards(data);
  }, [organizationSlug, trpcClient.dashboards.list]);

  useEffect(() => {
    const sync = async () => {
      await load();
    };

    void sync();
  }, [load]);

  const revokeShare = useCallback(
    async (dashboardId: string, memberId: string) => {
      setError(null);

      const { error: revokeError } = await tryCatch(
        trpcClient.dashboards.revokeShare.mutate({
          dashboardId,
          memberId,
          organizationSlug,
        }),
      );

      if (revokeError) {
        setError(getErrorMessage(revokeError));
        return;
      }

      await load();
    },
    [organizationSlug, trpcClient.dashboards.revokeShare, load],
  );

  return { dashboards, error, isLoading, load, revokeShare, setError };
}

export function OrganizationWorkspace({
  canCreateDashboard,
  canManageDashboardShares,
  organization,
}: OrganizationWorkspaceProps) {
  const { dashboards, error, isLoading, load, revokeShare, setError } =
    useDashboards(organization.slug);
  const [selectedDashboard, setSelectedDashboard] =
    useState<DashboardListItem | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <OrganizationShellHero
        kicker="Workspace"
        title={organization.name}
        description="Dashboards are scoped to this organization and only visible to members with matching permissions."
        aside={
          <div className="surface-pill-muted">
            {organization.members.length} members
          </div>
        }
      />

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <CreateDashboardCard
          canCreateDashboard={canCreateDashboard}
          organizationSlug={organization.slug}
          onDashboardCreated={load}
        />
        <DashboardList
          canManageShares={canManageDashboardShares}
          dashboards={dashboards}
          isLoading={isLoading}
          onRevokeShare={revokeShare}
          onShareDashboard={setSelectedDashboard}
        />
      </section>

      <ShareDashboardDialog
        dashboard={selectedDashboard}
        error={error}
        members={organization.members}
        organizationName={organization.name}
        organizationSlug={organization.slug}
        onClose={() => {
          setSelectedDashboard(null);
          setError(null);
        }}
        onErrorChange={setError}
        onShareComplete={load}
      />
    </div>
  );
}
