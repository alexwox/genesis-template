"use client";

import { useMemo, useState } from "react";
import { LoaderCircle, Mail, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { authClient } from "@/lib/auth-client";
import type { ResolvedOrganization } from "@/lib/organization-server";

import {
  type AssignableRole,
  getDisplayRole,
  getOrganizationActionError,
  inviteRoleOptions,
  SettingsSection,
} from "./organization-settings-utils";

type InvitationsSectionProps = {
  canInviteMembers: boolean;
  organization: ResolvedOrganization;
};

type PendingInvitationCardProps = {
  canInviteMembers: boolean;
  invitation: ResolvedOrganization["invitations"][number];
  organizationId: string;
};

function useInviteForm(organization: ResolvedOrganization) {
  const router = useRouter();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<AssignableRole>("viewer");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const pendingInvitations = useMemo(
    () => organization.invitations.filter((inv) => inv.status === "pending"),
    [organization.invitations],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsPending(true);
    const actionError = await getOrganizationActionError(
      authClient.organization.inviteMember({
        email: inviteEmail.trim(),
        organizationId: organization.id,
        role: inviteRole,
      }),
    );
    if (actionError) {
      setError(actionError);
      setIsPending(false);
      return;
    }
    setInviteEmail("");
    setSuccess("Invitation sent.");
    setIsPending(false);
    router.refresh();
  }

  return {
    error,
    handleSubmit,
    inviteEmail,
    inviteRole,
    isPending,
    pendingInvitations,
    setInviteEmail,
    setInviteRole,
    success,
  };
}

function PendingInvitationCard({
  canInviteMembers,
  invitation,
  organizationId,
}: PendingInvitationCardProps) {
  const router = useRouter();
  const [isActionPending, setIsActionPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResend() {
    setError(null);
    setIsActionPending(true);
    const actionError = await getOrganizationActionError(
      authClient.organization.inviteMember({
        email: invitation.email,
        organizationId,
        resend: true,
        role: getDisplayRole(invitation.role) as AssignableRole,
      }),
    );
    setIsActionPending(false);
    if (actionError) {
      setError(actionError);
      return;
    }
    router.refresh();
  }

  async function handleCancel() {
    setError(null);
    setIsActionPending(true);
    const actionError = await getOrganizationActionError(
      authClient.organization.cancelInvitation({ invitationId: invitation.id }),
    );
    setIsActionPending(false);
    if (actionError) {
      setError(actionError);
      return;
    }
    router.refresh();
  }

  return (
    <div className="surface-invite-panel">
      <div className="flex flex-col gap-1">
        <p className="font-medium">{invitation.email}</p>
        <p className="text-sm text-muted-foreground">
          Invited as {getDisplayRole(invitation.role)}
        </p>
        {error ? (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={!canInviteMembers || isActionPending}
          onClick={() => {
            void handleResend();
          }}
        >
          <RotateCcw data-icon="inline-start" />
          Resend
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!canInviteMembers || isActionPending}
          onClick={() => {
            void handleCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

type InviteFormProps = {
  canInviteMembers: boolean;
  form: ReturnType<typeof useInviteForm>;
};

function InviteForm({ canInviteMembers, form }: InviteFormProps) {
  return (
    <form
      className="mt-6"
      onSubmit={(e) => {
        void form.handleSubmit(e);
      }}
    >
      <FieldGroup>
        <Field data-invalid={Boolean(form.error)}>
          <FieldLabel htmlFor="invite-email">Invite by email</FieldLabel>
          <Input
            id="invite-email"
            type="email"
            value={form.inviteEmail}
            onChange={(event) => form.setInviteEmail(event.target.value)}
            placeholder="teammate@example.com"
            required
            disabled={!canInviteMembers || form.isPending}
          />
        </Field>
        <FieldSet>
          <FieldLegend variant="label">Invite role</FieldLegend>
          <ToggleGroup
            type="single"
            value={form.inviteRole}
            onValueChange={(value) => {
              if (value) form.setInviteRole(value as AssignableRole);
            }}
            variant="outline"
          >
            {inviteRoleOptions.map((role) => (
              <ToggleGroupItem key={role} value={role}>
                {role}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </FieldSet>
      </FieldGroup>
      {form.error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {form.error}
        </p>
      ) : null}
      {form.success ? (
        <p className="mt-4 text-sm text-muted-foreground">{form.success}</p>
      ) : null}
      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          disabled={!canInviteMembers || form.isPending}
        >
          {form.isPending ? (
            <>
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
              Sending invitation...
            </>
          ) : (
            "Send invitation"
          )}
        </Button>
      </div>
    </form>
  );
}

export function InvitationsSection({
  canInviteMembers,
  organization,
}: InvitationsSectionProps) {
  const form = useInviteForm(organization);

  return (
    <SettingsSection
      icon={<Mail className="size-5" />}
      title="Invitations"
      description="Invite new members and manage pending invitations without leaving the workspace."
    >
      <InviteForm canInviteMembers={canInviteMembers} form={form} />

      <div className="mt-8 flex flex-col gap-4">
        {form.pendingInvitations.length === 0 ? (
          <p className="text-sm leading-7 text-muted-foreground">
            No pending invitations for this organization.
          </p>
        ) : (
          form.pendingInvitations.map((invitation) => (
            <PendingInvitationCard
              key={invitation.id}
              canInviteMembers={canInviteMembers}
              invitation={invitation}
              organizationId={organization.id}
            />
          ))
        )}
      </div>
    </SettingsSection>
  );
}
