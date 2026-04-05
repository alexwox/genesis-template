import { redirect } from "next/navigation";

import { OrganizationWorkspace } from "@/components/organization-workspace";
import { SiteHeader } from "@/components/site-header";
import { getOrganizationPageData } from "@/lib/organization-server";

type OrganizationWorkspacePageProps = {
  params: Promise<{
    orgSlug: string;
  }>;
};

export default async function OrganizationWorkspacePage({
  params,
}: OrganizationWorkspacePageProps) {
  const { orgSlug } = await params;
  const data = await getOrganizationPageData(orgSlug);

  if (!data) {
    redirect("/");
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <OrganizationWorkspace
          canCreateDashboard={data.permissions.canCreateDashboard}
          canManageDashboardShares={data.permissions.canManageDashboardShares}
          organization={data.organization}
        />
      </div>
    </main>
  );
}
