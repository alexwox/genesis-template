import Link from "next/link";
import { Compass, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalNotFoundPage() {
  return (
    <main className="min-h-screen">
      <header className="surface-header-sticky">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="surface-icon-badge flex size-11 items-center justify-center shadow-sm">
              <ShieldCheck className="size-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Genesis
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl items-center px-6 py-16">
        <section className="surface-shell">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            404
          </p>
          <div className="mt-4 flex items-start gap-3">
            <div className="surface-icon-inline">
              <Compass className="size-5" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                The page you requested does not exist, was moved, or is unavailable.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button asChild type="button" variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
