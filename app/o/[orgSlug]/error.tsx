"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RefreshCw, ShieldAlert, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/error-utils";
import { logger } from "@/lib/logger";

type OrganizationErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const organizationErrorLogger = logger.child({
  scope: "organization.error-boundary",
});

export default function OrganizationError({
  error,
  reset,
}: OrganizationErrorProps) {
  useEffect(() => {
    organizationErrorLogger.error("Organization route error boundary triggered.", {
      error,
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-muted/40 shadow-sm">
              <ShieldCheck className="size-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Genesis
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl items-center px-6 py-16">
        <section className="w-full rounded-4xl border border-border/60 bg-background/95 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Workspace error
          </p>
          <div className="mt-4 flex items-start gap-3">
            <div className="rounded-full border border-destructive/40 bg-destructive/10 p-2 text-destructive">
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight">
                We hit a problem loading this workspace.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {getErrorMessage(error)}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className="rounded-full"
              onClick={() => {
                reset();
              }}
            >
              <RefreshCw data-icon="inline-start" />
              Try again
            </Button>
            <Button asChild type="button" variant="outline" className="rounded-full">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
