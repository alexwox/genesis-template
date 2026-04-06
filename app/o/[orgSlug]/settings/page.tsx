import { notFound } from "next/navigation";

import { OrganizationSettings } from "@/components/organization-settings";
import { SiteHeader } from "@/components/site-header";
import { getOrganizationPageData } from "@/lib/organization-server";

type OrganizationSettingsPageProps = {
  params: Promise<{
    orgSlug: string;
  }>;
};

export default async function OrganizationSettingsPage({
  params,
}: OrganizationSettingsPageProps) {
  const { orgSlug } = await params;
  const data = await getOrganizationPageData(orgSlug);

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <OrganizationSettings
          canInviteMembers={data.permissions.canInviteMembers}
          canManageMembers={data.permissions.canManageMembers}
          canUpdateOrganization={data.permissions.canUpdateOrganization}
          organization={data.organization}
        />
      </div>
    </main>
  );
}
