"use client";

import { useState } from "react";
import { LoaderCircle, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import type { ResolvedOrganization } from "@/lib/organization-server";
import { slugify } from "@/lib/slug";

import {
  getOrganizationActionError,
  SettingsSection,
} from "./organization-settings-utils";

type GeneralSettingsSectionProps = {
  canUpdateOrganization: boolean;
  organization: ResolvedOrganization;
};

function useGeneralSettings(organization: ResolvedOrganization) {
  const router = useRouter();
  const [name, setName] = useState(organization.name);
  const [slug, setSlug] = useState(organization.slug);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextSlug = slugify(slug);
    if (!nextSlug) {
      setError("Add a valid slug for the organization settings route.");
      return;
    }
    setError(null);
    setSuccess(null);
    setIsPending(true);
    const actionError = await getOrganizationActionError(
      authClient.organization.update({
        data: { name: name.trim(), slug: nextSlug },
        organizationId: organization.id,
      }),
    );
    if (actionError) {
      setError(actionError);
      setIsPending(false);
      return;
    }
    setSuccess("Organization settings updated.");
    setIsPending(false);
    if (nextSlug !== organization.slug) {
      router.push(`/o/${nextSlug}/settings`);
    }
    router.refresh();
  }

  return { error, handleSubmit, isPending, name, setName, setSlug, slug, success };
}

export function GeneralSettingsSection({
  canUpdateOrganization,
  organization,
}: GeneralSettingsSectionProps) {
  const { error, handleSubmit, isPending, name, setName, setSlug, slug, success } =
    useGeneralSettings(organization);

  return (
    <SettingsSection
      icon={<Settings2 className="size-5" />}
      title="General"
      description="Update the public-facing organization metadata used across the workspace."
    >
      <form
        className="mt-6"
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
      >
        <FieldGroup>
          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="organization-name">Organization name</FieldLabel>
            <Input
              id="organization-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              disabled={!canUpdateOrganization || isPending}
            />
          </Field>
          <Field data-invalid={Boolean(error)}>
            <FieldLabel htmlFor="organization-slug">Workspace slug</FieldLabel>
            <Input
              id="organization-slug"
              value={slug}
              onChange={(event) => setSlug(slugify(event.target.value))}
              required
              disabled={!canUpdateOrganization || isPending}
            />
            <FieldDescription>
              Keep URLs human-readable and stable for the people sharing this
              workspace.
            </FieldDescription>
          </Field>
        </FieldGroup>
        {error ? (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-4 text-sm text-muted-foreground">{success}</p>
        ) : null}
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={!canUpdateOrganization || isPending}
          >
            {isPending ? (
              <>
                <LoaderCircle className="animate-spin" data-icon="inline-start" />
                Saving changes...
              </>
            ) : (
              "Save organization"
            )}
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}
