"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AnalyticsEvents, trackClientEvent } from "@/lib/analytics";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-utils";
import { slugify } from "@/lib/slug";
import { tryCatch } from "@/lib/try-catch";

type OrganizationCreateDialogProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

async function submitCreateOrganization(name: string) {
  const nextSlug = slugify(name);

  if (!nextSlug) {
    return {
      error: "Add an organization name to generate a valid slug.",
      slug: null,
      organizationId: null,
    };
  }

  const { data: result, error } = await tryCatch(
    authClient.organization.create({
      keepCurrentActiveOrganization: false,
      name: name.trim(),
      slug: nextSlug,
    }),
  );

  if (error) return { error: getErrorMessage(error), slug: null, organizationId: null };
  if (result.error) {
    return { error: getErrorMessage(result.error), slug: null, organizationId: null };
  }

  const data = result.data as { slug: string; id?: string };
  return {
    error: null,
    slug: data.slug,
    organizationId: data.id ?? null,
  };
}

function CreateOrganizationForm({
  error,
  isPending,
  name,
  onNameChange,
  onSubmit,
}: {
  error: string | null;
  isPending: boolean;
  name: string;
  onNameChange: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="mt-4" onSubmit={onSubmit}>
      <FieldGroup>
        <Field data-invalid={Boolean(error)}>
          <FieldLabel htmlFor="organization-name">Organization name</FieldLabel>
          <Input
            id="organization-name"
            name="organizationName"
            placeholder="Acme Corp"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            required
            disabled={isPending}
          />
          <FieldDescription>
            This is the tenant your users and dashboards will belong to. You can
            edit the generated workspace URL later in organization settings.
          </FieldDescription>
        </Field>
      </FieldGroup>

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-end gap-3">
        <Button type="submit" className="rounded-full" disabled={isPending}>
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
              Creating workspace...
            </>
          ) : (
            "Create workspace"
          )}
        </Button>
      </div>
    </form>
  );
}

export function OrganizationCreateDialog({
  onOpenChange,
  open,
}: OrganizationCreateDialogProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const result = await submitCreateOrganization(name);

    if (result.error) {
      setError(result.error);
      setIsPending(false);
      return;
    }

    trackClientEvent(AnalyticsEvents.orgCreated, {
      organization_slug: result.slug,
      ...(result.organizationId
        ? { organization_id: result.organizationId }
        : {}),
    });

    onOpenChange(false);
    setIsPending(false);
    setName("");
    router.push(`/o/${result.slug}`);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border/60 bg-background/95 sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Create workspace</DialogTitle>
          <DialogDescription>
            Set up a customer-facing organization that can own dashboards,
            members, and shared permissions.
          </DialogDescription>
        </DialogHeader>

        <CreateOrganizationForm
          error={error}
          isPending={isPending}
          name={name}
          onNameChange={setName}
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
