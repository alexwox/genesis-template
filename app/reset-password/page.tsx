"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { CheckCircle2, Info, LoaderCircle, ShieldAlert } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";

function getResetTokenErrorMessage(error: string | null) {
  if (!error) {
    return null;
  }

  switch (error) {
    case "INVALID_TOKEN":
      return "This reset link is invalid or has expired. Request a new password reset email.";
    default:
      return "This reset link could not be verified. Request a new password reset email.";
  }
}

function ResetAlerts({
  submitError,
  successMessage,
  token,
  tokenError,
}: {
  submitError: string | null;
  successMessage: string | null;
  token: string | null;
  tokenError: string | null;
}) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {tokenError ? (
        <Alert variant="destructive">
          <ShieldAlert />
          <AlertTitle>Reset link expired</AlertTitle>
          <AlertDescription>{tokenError}</AlertDescription>
        </Alert>
      ) : null}

      {!token && !tokenError ? (
        <Alert variant="destructive">
          <Info />
          <AlertTitle>Reset link missing</AlertTitle>
          <AlertDescription>
            This page needs a valid reset link. Request a new password reset email from
            the sign-in flow.
          </AlertDescription>
        </Alert>
      ) : null}

      {submitError ? (
        <Alert variant="destructive">
          <Info />
          <AlertTitle>Could not reset password</AlertTitle>
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Password updated</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}

function ResetPasswordForm({
  isTokenReady,
  onSubmit,
}: {
  isTokenReady: boolean;
  onSubmit: (newPassword: string) => Promise<void>;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    await onSubmit(newPassword);
    setNewPassword("");
    setIsPending(false);
  }

  return (
    <form
      className="mt-6"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="new-password">New password</FieldLabel>
          <Input
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            required
            minLength={8}
            disabled={!isTokenReady || isPending}
          />
          <FieldDescription>
            Use at least 8 characters for your new password.
          </FieldDescription>
        </Field>
      </FieldGroup>

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="submit"
          className="w-full rounded-full"
          disabled={!isTokenReady || isPending}
        >
          {isPending ? (
            <>
              <LoaderCircle className="animate-spin" data-icon="inline-start" />
              Updating password...
            </>
          ) : (
            "Update password"
          )}
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </form>
  );
}

function ResetPasswordPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = getResetTokenErrorMessage(searchParams.get("error"));
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isTokenReady = Boolean(token) && !tokenError;

  async function handleResetPassword(newPassword: string) {
    if (!token) {
      setSubmitError("This reset link is missing a token. Request a new password reset email.");
      return;
    }

    setSubmitError(null);
    setSuccessMessage(null);

    const { data: result, error } = await tryCatch(
      authClient.resetPassword({ newPassword, token }),
    );

    if (error) {
      setSubmitError(getErrorMessage(error));
      return;
    }

    if (result.error) {
      setSubmitError(getErrorMessage(result.error));
      return;
    }

    setSuccessMessage("Password updated. You can now sign in with your new password.");
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <section className="w-full rounded-4xl border border-border/60 bg-background/95 p-8 shadow-sm">
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Genesis
            </p>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                Reset your password
              </h1>
              <p className="text-sm leading-7 text-muted-foreground">
                Choose a new password to finish recovering your account.
              </p>
            </div>
          </div>

          <ResetAlerts
            submitError={submitError}
            successMessage={successMessage}
            token={token}
            tokenError={tokenError}
          />

          {successMessage ? (
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild className="rounded-full">
                <Link href="/">Return to homepage</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/">Open sign in</Link>
              </Button>
            </div>
          ) : (
            <ResetPasswordForm
              isTokenReady={isTokenReady}
              onSubmit={handleResetPassword}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <ResetPasswordPageContent />
    </Suspense>
  );
}
