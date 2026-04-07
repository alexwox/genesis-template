"use client";

import { LoaderCircle, Share2, Users2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { DashboardListItem } from "@/components/workspace/workspace-types";
import { getInitials } from "@/components/workspace/workspace-types";

type DashboardShareRowProps = {
  canManageShares: boolean;
  dashboardId: string;
  onRevokeShare: (dashboardId: string, memberId: string) => Promise<void>;
  share: DashboardListItem["shares"][number];
};

type DashboardCardProps = {
  canManageShares: boolean;
  dashboard: DashboardListItem;
  onRevokeShare: (dashboardId: string, memberId: string) => Promise<void>;
  onShareDashboard: (dashboard: DashboardListItem) => void;
};

type DashboardListProps = {
  canManageShares: boolean;
  dashboards: DashboardListItem[];
  isLoading: boolean;
  onRevokeShare: (dashboardId: string, memberId: string) => Promise<void>;
  onShareDashboard: (dashboard: DashboardListItem) => void;
};

function DashboardShareRow({
  canManageShares,
  dashboardId,
  onRevokeShare,
  share,
}: DashboardShareRowProps) {
  return (
    <div className="surface-muted-panel-row">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar size="sm">
          <AvatarFallback>
            {getInitials(share.member.user.name, share.member.user.email)}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="truncate text-sm font-medium">
            {share.member.user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {share.member.user.email} • {share.permission}
          </p>
        </div>
      </div>

      {canManageShares ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            void onRevokeShare(dashboardId, share.member.id);
          }}
        >
          Remove access
        </Button>
      ) : null}
    </div>
  );
}

function DashboardCard({
  canManageShares,
  dashboard,
  onRevokeShare,
  onShareDashboard,
}: DashboardCardProps) {
  return (
    <div className="surface-muted-panel">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold">{dashboard.title}</h3>
            <p className="text-sm text-muted-foreground">
              /{dashboard.slug}
            </p>
            {dashboard.description ? (
              <p className="mt-1 text-sm leading-7 text-muted-foreground">
                {dashboard.description}
              </p>
            ) : null}
          </div>

          {canManageShares ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => onShareDashboard(dashboard)}
            >
              <Share2 data-icon="inline-start" />
              Share dashboard
            </Button>
          ) : null}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Avatar size="sm">
            <AvatarFallback>
              {getInitials(
                dashboard.createdByUser.name,
                dashboard.createdByUser.email,
              )}
            </AvatarFallback>
          </Avatar>
          <span>Created by {dashboard.createdByUser.name}</span>
          <span>•</span>
          <span>{dashboard.shareCount} shares</span>
        </div>

        {dashboard.shares.length > 0 ? (
          <div className="flex flex-col gap-3">
            {dashboard.shares.map((share) => (
              <DashboardShareRow
                key={share.id}
                canManageShares={canManageShares}
                dashboardId={dashboard.id}
                onRevokeShare={onRevokeShare}
                share={share}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            This dashboard is not yet shared with any additional members.
          </p>
        )}
      </div>
    </div>
  );
}

export function DashboardList({
  canManageShares,
  dashboards,
  isLoading,
  onRevokeShare,
  onShareDashboard,
}: DashboardListProps) {
  return (
    <section className="surface-shell-muted">
      <div className="flex items-center gap-3">
        <div className="surface-icon-badge-soft flex size-11 items-center justify-center">
          <Users2 className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Shared dashboards</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Each share record stays inside the active organization boundary and
            is tied to an existing member.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {isLoading ? (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <LoaderCircle className="animate-spin" />
            Loading dashboards...
          </div>
        ) : dashboards.length === 0 ? (
          <p className="text-sm leading-7 text-muted-foreground">
            No dashboards exist for this organization yet.
          </p>
        ) : (
          dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard.id}
              canManageShares={canManageShares}
              dashboard={dashboard}
              onRevokeShare={onRevokeShare}
              onShareDashboard={onShareDashboard}
            />
          ))
        )}
      </div>
    </section>
  );
}
