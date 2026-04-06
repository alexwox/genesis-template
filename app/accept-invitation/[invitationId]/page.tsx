"use client";

import Link from "next/link";
import { use, useState } from "react";
import { CheckCircle2, LoaderCircle, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AnalyticsEvents, trackClientEvent } from "@/lib/analytics";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";

type AcceptInvitationPageProps = {
  params: Promise<{
    invitationId: string;
  }>;
};

function InvitationAlerts({
  error,
  success,
}: {
  error: string | null;
  success: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <Alert>
        <ShieldAlert />
        <AlertTitle>Sign in required</AlertTitle>
        <AlertDescription>
          Sign in with the invited email before accepting this invitation.
        </AlertDescription>
      </Alert>

      {error ? (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Could not accept invitation</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {success ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Invitation accepted</AlertTitle>
          <AlertDescription>
            You can now open your workspace and continue from the organization
            switcher.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

export default function AcceptInvitationPage({
  params,
}: AcceptInvitationPageProps) {
  const router = useRouter();
  const { invitationId } = use(params);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAcceptInvitation() {
    if (!invitationId) {
      setError("This invitation link is missing an invitation id.");
      return;
    }

    setError(null);
    setIsPending(true);

    const { data: result, error } = await tryCatch(
      authClient.organization.acceptInvitation({
        invitationId,
      }),
    );

    if (error) {
      setError(getErrorMessage(error));
      setIsPending(false);
      return;
    }

    if (result.error) {
      setError(getErrorMessage(result.error));
      setIsPending(false);
      return;
    }

    trackClientEvent(AnalyticsEvents.inviteAccepted, {
      invitation_id: invitationId,
    });

    setSuccess(true);
    setIsPending(false);
    router.refresh();
  }

  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-3xl items-center px-6 py-16">
        <section className="w-full rounded-4xl border border-border/60 bg-background/95 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            Organization invitation
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Accept your workspace invitation
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
            Sign in with the invited email address, then accept the invitation to
            join the organization workspace.
          </p>

          <InvitationAlerts error={error} success={success} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              className="rounded-full"
              disabled={isPending || success}
              onClick={() => {
                void handleAcceptInvitation();
              }}
            >
              {isPending ? (
                <>
                  <LoaderCircle className="animate-spin" data-icon="inline-start" />
                  Accepting invitation...
                </>
              ) : (
                "Accept invitation"
              )}
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
