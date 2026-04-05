"use client";

import { useState } from "react";

import type { AuthFormProps } from "@/components/auth/shared";
import { AuthAlerts, getBaseUrl, SubmitButton } from "@/components/auth/shared";
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

async function submitForgotPassword(
  props: AuthFormProps,
  setIsPending: (v: boolean) => void,
) {
  const { email, onError, onMessage } = props;
  setIsPending(true);
  onError(null);
  onMessage(null);

  const { data: result, error } = await tryCatch(
    authClient.requestPasswordReset({
      email,
      redirectTo: `${getBaseUrl()}/reset-password`,
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

  onMessage("Reset email sent.");
  setIsPending(false);
}

export function ForgotPasswordForm(props: AuthFormProps) {
  const { email, onEmailChange, error, message } = props;
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void submitForgotPassword(props, setIsPending);
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
            <FieldDescription>Reset link by email.</FieldDescription>
          </Field>

          <AuthAlerts error={error} message={message} />
        </FieldGroup>

        <SubmitButton isPending={isPending} label="Send reset email" />
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <button
          type="button"
          className="underline-offset-4 hover:text-foreground hover:underline"
          onClick={() => {
            props.onError(null);
            props.onMessage(null);
            props.onModeChange("sign-in");
          }}
        >
          Back to sign in
        </button>
      </div>
    </>
  );
}
