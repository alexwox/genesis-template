import { redirect } from "next/navigation";

import { SiteHeader } from "../components/site-header";
import { getHomePageJsonLd } from "@/lib/seo/home-json-ld";
import { getHomeRedirectPath } from "@/lib/organization-server";

export default async function HomePage() {
  const redirectPath = await getHomeRedirectPath();

  if (redirectPath) {
    redirect(redirectPath);
  }

  const jsonLd = getHomePageJsonLd();

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <SiteHeader />

      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-6xl items-center px-6 py-16">
        <section className="flex max-w-3xl flex-col gap-5">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
            Genesis
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Your workspace awaits.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Sign in or create an account to get started.
          </p>
        </section>
      </div>
    </main>
  );
}
