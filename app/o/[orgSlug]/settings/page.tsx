import { OrganizationSettings } from "@/components/organization-settings";
import { requireOrganizationPageData } from "@/lib/organization-server";

type OrganizationSettingsPageProps = {
  params: Promise<{
    orgSlug: string;
  }>;
};

export default async function OrganizationSettingsPage({
  params,
}: OrganizationSettingsPageProps) {
  const { orgSlug } = await params;
  const data = await requireOrganizationPageData(orgSlug);

  return (
    <OrganizationSettings
      canInviteMembers={data.permissions.canInviteMembers}
      canManageMembers={data.permissions.canManageMembers}
      canUpdateOrganization={data.permissions.canUpdateOrganization}
      organization={data.organization}
    />
  );
}
