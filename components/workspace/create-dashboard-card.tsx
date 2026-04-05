"use client";

import { useState } from "react";
import { LayoutDashboard, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";
import { useTRPCClient } from "@/trpc/client";

type CreateDashboardFormProps = {
  organizationSlug: string;
  onDashboardCreated: () => Promise<void>;
};

type CreateDashboardCardProps = CreateDashboardFormProps & {
  canCreateDashboard: boolean;
};

function CreateDashboardForm({
  organizationSlug,
  onDashboardCreated,
}: CreateDashboardFormProps) {
  const trpcClient = useTRPCClient();
  const [createError, setCreateError] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [isCreatePending, setIsCreatePending] = useState(false);
  const [title, setTitle] = useState("");

  async function handleCreateDashboard(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateError(null);
    setIsCreatePending(true);

    const { error } = await tryCatch(
      trpcClient.dashboards.create.mutate({
        description: description.trim() || undefined,
        organizationSlug,
        title: title.trim(),
      }),
    );

    if (error) {
      setCreateError(getErrorMessage(error));
      setIsCreatePending(false);
      return;
    }

    setDescription("");
    setTitle("");
    await onDashboardCreated();
    setIsCreatePending(false);
  }

  return (
    <form className="mt-6" onSubmit={(e) => { void handleCreateDashboard(e); }}>
      <FieldGroup>
        <Field data-invalid={Boolean(createError)}>
          <FieldLabel htmlFor="dashboard-title">Dashboard title</FieldLabel>
          <Input
            id="dashboard-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Renewals by broker"
            required
            disabled={isCreatePending}
          />
        </Field>
        <Field data-invalid={Boolean(createError)}>
          <FieldLabel htmlFor="dashboard-description">Description</FieldLabel>
          <Input
            id="dashboard-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Operational overview for policy renewals."
            disabled={isCreatePending}
          />
          <FieldDescription>
            Slugs are generated automatically per organization when the dashboard
            is created.
          </FieldDescription>
        </Field>
      </FieldGroup>

      {createError ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {createError}
        </p>
      ) : null}

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="rounded-full" disabled={isCreatePending}>
          {isCreatePending ? (
            <>
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
              Creating dashboard...
            </>
          ) : (
            "Create dashboard"
          )}
        </Button>
      </div>
    </form>
  );
}

export function CreateDashboardCard({
  canCreateDashboard,
  organizationSlug,
  onDashboardCreated,
}: CreateDashboardCardProps) {
  return (
    <section className="rounded-4xl border border-border/60 bg-background/90 p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-muted/50">
          <LayoutDashboard className="size-5" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold">Create dashboard</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Use the org-scoped permissions model to control who can create and
            share analytics work.
          </p>
        </div>
      </div>

      {canCreateDashboard ? (
        <CreateDashboardForm
          organizationSlug={organizationSlug}
          onDashboardCreated={onDashboardCreated}
        />
      ) : (
        <p className="mt-6 text-sm leading-7 text-muted-foreground">
          Your current role can view dashboards in this workspace, but cannot
          create new ones.
        </p>
      )}
    </section>
  );
}
