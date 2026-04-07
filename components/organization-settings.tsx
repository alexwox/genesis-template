"use client";

import { OrganizationShellHero } from "@/components/organization/organization-shell-hero";
import type { ResolvedOrganization } from "@/lib/organization-server";

import { GeneralSettingsSection } from "./organization/general-settings-section";
import { InvitationsSection } from "./organization/invitations-section";
import { MembersSection } from "./organization/members-section";

type OrganizationSettingsProps = {
  canInviteMembers: boolean;
  canManageMembers: boolean;
  canUpdateOrganization: boolean;
  organization: ResolvedOrganization;
};

export function OrganizationSettings({
  canInviteMembers,
  canManageMembers,
  canUpdateOrganization,
  organization,
}: OrganizationSettingsProps) {
  return (
    <div className="flex flex-col gap-8">
      <OrganizationShellHero
        kicker="Organization Settings"
        title={organization.name}
        description="Manage your workspace identity, invitations, and member roles in one place."
        aside={
          <div className="surface-pill-muted">
            /o/{organization.slug}
          </div>
        }
      />

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-8">
          <GeneralSettingsSection
            canUpdateOrganization={canUpdateOrganization}
            organization={organization}
          />
          <InvitationsSection
            canInviteMembers={canInviteMembers}
            organization={organization}
          />
        </div>
        <MembersSection
          canManageMembers={canManageMembers}
          organization={organization}
        />
      </section>
    </div>
  );
}
