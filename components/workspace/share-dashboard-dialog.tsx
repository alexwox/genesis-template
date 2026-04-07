"use client";

import { useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getErrorMessage } from "@/lib/error-utils";
import type { ResolvedOrganization } from "@/lib/organization-server";
import { tryCatch } from "@/lib/try-catch";
import { useTRPCClient } from "@/trpc/client";

import type {
  DashboardListItem,
  SharePermission,
} from "@/components/workspace/workspace-types";
import {
  getInitials,
  sharePermissionOptions,
} from "@/components/workspace/workspace-types";

type MemberPickerProps = {
  members: ResolvedOrganization["members"];
  selectedMemberId: string | null;
  onSelectMember: (id: string) => void;
};

type ShareDialogContentProps = {
  error: string | null;
  selectedMemberId: string | null;
  shareableMembers: ResolvedOrganization["members"];
  sharePermission: SharePermission;
  onClose: () => void;
  onPermissionChange: (permission: SharePermission) => void;
  onSelectMember: (id: string) => void;
  onShare: () => void;
};

export type ShareDashboardDialogProps = {
  dashboard: DashboardListItem | null;
  error: string | null;
  members: ResolvedOrganization["members"];
  organizationName: string;
  organizationSlug: string;
  onClose: () => void;
  onErrorChange: (error: string | null) => void;
  onShareComplete: () => Promise<void>;
};

function MemberPicker({
  members,
  selectedMemberId,
  onSelectMember,
}: MemberPickerProps) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Everyone in this organization already has an explicit share, or there are
        no additional members to target.
      </p>
    );
  }

  return (
    <>
      {members.map((member) => {
        const isSelected = selectedMemberId === member.id;

        return (
          <button
            key={member.id}
            type="button"
            className={
              isSelected ? "surface-selectable-selected" : "surface-selectable"
            }
            onClick={() => onSelectMember(member.id)}
          >
            <div className="flex min-w-0 items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>
                  {getInitials(member.user.name, member.user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-sm font-medium">
                  {member.user.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {member.user.email}
                </span>
              </div>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {member.role}
            </span>
          </button>
        );
      })}
    </>
  );
}

function ShareDialogContent({
  error,
  selectedMemberId,
  shareableMembers,
  sharePermission,
  onClose,
  onPermissionChange,
  onSelectMember,
  onShare,
}: ShareDialogContentProps) {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <FieldSet>
        <FieldLegend variant="label">Share with</FieldLegend>
        <div className="flex flex-col gap-3">
          <MemberPicker
            members={shareableMembers}
            selectedMemberId={selectedMemberId}
            onSelectMember={onSelectMember}
          />
        </div>
      </FieldSet>

      <FieldSet>
        <FieldLegend variant="label">Access level</FieldLegend>
        <ToggleGroup
          type="single"
          value={sharePermission}
          onValueChange={(value) => {
            if (value) {
              onPermissionChange(value as SharePermission);
            }
          }}
          variant="outline"
        >
          {sharePermissionOptions.map((permission) => (
            <ToggleGroupItem key={permission} value={permission}>
              {permission}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </FieldSet>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={!selectedMemberId}
          onClick={onShare}
        >
          Share dashboard
        </Button>
      </div>
    </div>
  );
}

export function ShareDashboardDialog({
  dashboard,
  error,
  members,
  organizationName,
  organizationSlug,
  onClose,
  onErrorChange,
  onShareComplete,
}: ShareDashboardDialogProps) {
  const trpcClient = useTRPCClient();
  const [selectedMemberIdState, setSelectedMemberId] = useState<string | null>(
    members[0]?.id ?? null,
  );
  const [sharePermission, setSharePermission] =
    useState<SharePermission>("viewer");

  const shareableMembers = useMemo(
    () =>
      members.filter(
        (m) => !dashboard?.shares.some((s) => s.member.id === m.id),
      ),
    [members, dashboard],
  );

  const selectedMemberId = useMemo(() => {
    if (selectedMemberIdState && shareableMembers.some((m) => m.id === selectedMemberIdState)) {
      return selectedMemberIdState;
    }
    return shareableMembers[0]?.id ?? null;
  }, [selectedMemberIdState, shareableMembers]);

  async function handleShareDashboard() {
    if (!dashboard || !selectedMemberId) return;

    onErrorChange(null);

    const { error: mutationError } = await tryCatch(
      trpcClient.dashboards.share.mutate({
        dashboardId: dashboard.id,
        memberId: selectedMemberId,
        organizationSlug,
        permission: sharePermission,
      }),
    );

    if (mutationError) {
      onErrorChange(getErrorMessage(mutationError));
      return;
    }

    onClose();
    await onShareComplete();
  }

  return (
    <Dialog
      open={Boolean(dashboard)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="surface-dialog sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>Share dashboard</DialogTitle>
          <DialogDescription>
            Grant access to a member of {organizationName}. Cross-organization
            sharing is intentionally disabled.
          </DialogDescription>
        </DialogHeader>

        {dashboard ? (
          <ShareDialogContent
            error={error}
            selectedMemberId={selectedMemberId}
            shareableMembers={shareableMembers}
            sharePermission={sharePermission}
            onClose={onClose}
            onPermissionChange={setSharePermission}
            onSelectMember={setSelectedMemberId}
            onShare={() => {
              void handleShareDashboard();
            }}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
