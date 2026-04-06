import { SiteHeader } from "@/components/site-header";
import { requireOrganizationPageData } from "@/lib/organization-server";

type OrganizationLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    orgSlug: string;
  }>;
};

export default async function OrganizationLayout({
  children,
  params,
}: OrganizationLayoutProps) {
  const { orgSlug } = await params;
  await requireOrganizationPageData(orgSlug);

  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        {children}
      </div>
    </main>
  );
}
