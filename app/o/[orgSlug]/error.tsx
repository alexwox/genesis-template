"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RefreshCw, ShieldAlert } from "lucide-react";

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
    <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl items-center">
      <section className="surface-shell">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Workspace error
        </p>
        <div className="mt-4 flex items-start gap-3">
          <div className="surface-error-icon">
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
            onClick={() => {
              reset();
            }}
          >
            <RefreshCw data-icon="inline-start" />
            Try again
          </Button>
          <Button asChild type="button" variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
