"use client";

import { useState } from "react";
import { Users2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { authClient } from "@/lib/auth-client";
import type { ResolvedOrganization } from "@/lib/organization-server";

import {
  type AssignableRole,
  getDisplayRole,
  getInitials,
  getOrganizationActionError,
  memberRoleOptions,
  SettingsSection,
} from "./organization-settings-utils";

type MembersSectionProps = {
  canManageMembers: boolean;
  organization: ResolvedOrganization;
};

type MemberCardProps = {
  canManageMembers: boolean;
  member: ResolvedOrganization["members"][number];
  organizationId: string;
};

function MemberCard({ canManageMembers, member, organizationId }: MemberCardProps) {
  const router = useRouter();
  const [isActionPending, setIsActionPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const displayRole = getDisplayRole(member.role);
  const isOwner = member.role.includes("owner");
  const initials = getInitials(member.user.name, member.user.email);

  async function handleRoleChange(nextRole: string) {
    setError(null);
    setIsActionPending(true);
    const actionError = await getOrganizationActionError(
      authClient.organization.updateMemberRole({
        memberId: member.id,
        organizationId,
        role: nextRole as AssignableRole,
      }),
    );
    setIsActionPending(false);
    if (actionError) {
      setError(actionError);
      return;
    }
    router.refresh();
  }

  return (
    <div className="surface-muted-panel">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <p className="truncate font-medium">{member.user.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {member.user.email}
            </p>
          </div>
          <div className="surface-role-chip">
            {displayRole}
          </div>
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        ) : null}
        {canManageMembers && !isOwner ? (
          <FieldSet>
            <FieldLegend variant="label">Role</FieldLegend>
            <ToggleGroup
              type="single"
              value={displayRole}
              onValueChange={(value) => {
                if (!value || value === displayRole) return;
                void handleRoleChange(value);
              }}
              variant="outline"
            >
              {memberRoleOptions.map((role) => (
                <ToggleGroupItem
                  key={role}
                  value={role}
                  disabled={isActionPending}
                >
                  {role}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>
        ) : (
          <p className="text-sm text-muted-foreground">
            {isOwner
              ? "Owner role changes stay protected to avoid leaving the organization without an owner."
              : "You do not have permission to update member roles in this organization."}
          </p>
        )}
      </div>
    </div>
  );
}

export function MembersSection({
  canManageMembers,
  organization,
}: MembersSectionProps) {
  return (
    <SettingsSection
      icon={<Users2 className="size-5" />}
      title="Members"
      description="Role changes are scoped to this organization and never leak into other workspaces."
    >
      <div className="mt-6 flex flex-col gap-4">
        {organization.members.map((member) => (
          <MemberCard
            key={member.id}
            canManageMembers={canManageMembers}
            member={member}
            organizationId={organization.id}
          />
        ))}
      </div>
    </SettingsSection>
  );
}
