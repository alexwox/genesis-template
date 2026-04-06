import { OrganizationWorkspace } from "@/components/organization-workspace";
import { requireOrganizationPageData } from "@/lib/organization-server";

type OrganizationWorkspacePageProps = {
  params: Promise<{
    orgSlug: string;
  }>;
};

export default async function OrganizationWorkspacePage({
  params,
}: OrganizationWorkspacePageProps) {
  const { orgSlug } = await params;
  const data = await requireOrganizationPageData(orgSlug);

  return (
    <OrganizationWorkspace
      canCreateDashboard={data.permissions.canCreateDashboard}
      canManageDashboardShares={data.permissions.canManageDashboardShares}
      organization={data.organization}
    />
  );
}
