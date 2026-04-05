"use client";

import { useState } from "react";

import type { AuthFormProps, AuthMode } from "@/components/auth/shared";
import { AuthAlerts, getBaseUrl, SubmitButton } from "@/components/auth/shared";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";

async function submitSignIn(
  props: AuthFormProps,
  password: string,
  setIsPending: (v: boolean) => void,
) {
  const { email, onError, onMessage, onClose } = props;
  setIsPending(true);
  onError(null);
  onMessage(null);

  const { data: result, error } = await tryCatch(
    authClient.signIn.email({
      email,
      password,
      callbackURL: getBaseUrl(),
    }),
  );

  if (error) {
    onError(getErrorMessage(error));
    setIsPending(false);
    return;
  }

  if (result.error) {
    onError(getErrorMessage(result.error));
    setIsPending(false);
    return;
  }

  onMessage("Signed in.");
  onClose();
  setIsPending(false);
}

async function resendVerification(
  props: AuthFormProps,
  setIsPending: (v: boolean) => void,
) {
  const { email, onError, onMessage } = props;
  setIsPending(true);
  onError(null);
  onMessage(null);

  const { data: result, error } = await tryCatch(
    authClient.sendVerificationEmail({
      email,
      callbackURL: getBaseUrl(),
    }),
  );

  if (error) {
    onError(getErrorMessage(error));
    setIsPending(false);
    return;
  }

  if (result.error) {
    onError(getErrorMessage(result.error));
    setIsPending(false);
    return;
  }

  onMessage("Verification email sent.");
  setIsPending(false);
}

function SignInLinks({
  email,
  isPending,
  onSwitchMode,
  onResendVerification,
}: {
  email: string;
  isPending: boolean;
  onSwitchMode: (mode: AuthMode) => void;
  onResendVerification: () => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <button
        type="button"
        className="underline-offset-4 hover:text-foreground hover:underline"
        onClick={() => onSwitchMode("sign-up")}
      >
        Create account
      </button>

      <button
        type="button"
        className="underline-offset-4 hover:text-foreground hover:underline"
        onClick={() => onSwitchMode("reset-password")}
      >
        Forgot password?
      </button>

      <button
        type="button"
        className="underline-offset-4 hover:text-foreground hover:underline"
        onClick={onResendVerification}
        disabled={isPending || !email}
      >
        Resend verifications
      </button>
    </div>
  );
}

export function SignInForm(props: AuthFormProps) {
  const { email, onEmailChange, error, message } = props;
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void submitSignIn(props, password, setIsPending);
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="alex@broker.gr"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
              aria-invalid={Boolean(error)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-invalid={Boolean(error)}
            />
          </Field>

          <AuthAlerts error={error} message={message} />
        </FieldGroup>

        <SubmitButton isPending={isPending} label="Sign in" />
      </form>

      <SignInLinks
        email={email}
        isPending={isPending}
        onSwitchMode={(mode) => {
          props.onError(null);
          props.onMessage(null);
          props.onModeChange(mode);
        }}
        onResendVerification={() => {
          void resendVerification(props, setIsPending);
        }}
      />
    </>
  );
}
