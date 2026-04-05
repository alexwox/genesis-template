"use client";

import { useState } from "react";

import type { AuthFormProps } from "@/components/auth/shared";
import { AuthAlerts, getBaseUrl, SubmitButton } from "@/components/auth/shared";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/error-utils";
import { tryCatch } from "@/lib/try-catch";

async function submitSignUp(
  props: AuthFormProps,
  name: string,
  password: string,
  setIsPending: (v: boolean) => void,
) {
  const { email, onError, onMessage, onModeChange } = props;
  setIsPending(true);
  onError(null);
  onMessage(null);

  const { data: result, error } = await tryCatch(
    authClient.signUp.email({
      email,
      password,
      name,
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

  onMessage("Check your inbox to verify your email.");
  onModeChange("sign-in");
  setIsPending(false);
}

export function SignUpForm(props: AuthFormProps) {
  const { email, onEmailChange, error, message } = props;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void submitSignUp(props, name, password, setIsPending);
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="Alex Broker"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

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

        <SubmitButton isPending={isPending} label="Create account" />
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
          Already have an account?
        </button>
      </div>
    </>
  );
}
