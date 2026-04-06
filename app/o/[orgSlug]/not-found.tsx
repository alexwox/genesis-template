import Link from "next/link";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OrganizationNotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl items-center px-6 py-16">
      <section className="w-full rounded-4xl border border-border/60 bg-background/95 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Workspace
        </p>
        <div className="mt-4 flex items-start gap-3">
          <div className="rounded-full border border-border/70 bg-muted/40 p-2 text-muted-foreground">
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Workspace not found
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              This workspace slug does not exist or you no longer have access to it.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button asChild type="button" variant="outline" className="rounded-full">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
