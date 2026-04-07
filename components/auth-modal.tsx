"use client";

import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AuthMode } from "@/components/auth/shared";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

type AuthModalProps = {
  defaultMode?: Exclude<AuthMode, "reset-password">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthModal({
  defaultMode = "sign-in",
  open,
  onOpenChange,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const title = useMemo(() => {
    if (mode === "sign-up") return "Create account";
    if (mode === "reset-password") return "Reset password";
    return "Sign in";
  }, [mode]);

  const description = useMemo(() => {
    if (mode === "sign-up") return "We'll send a verification email.";
    if (mode === "reset-password") return "We'll send a reset link.";
    return "Use your email and password.";
  }, [mode]);

  function resetModalState(nextOpen: boolean) {
    if (!nextOpen) {
      setMode(defaultMode);
      setMessage(null);
      setError(null);
    }

    onOpenChange(nextOpen);
  }

  const formProps = {
    email,
    onEmailChange: setEmail,
    error,
    message,
    onError: setError,
    onMessage: setMessage,
    onModeChange: setMode,
    onClose: () => onOpenChange(false),
  };

  return (
    <Dialog open={open} onOpenChange={resetModalState}>
      <DialogContent className="surface-dialog overflow-hidden p-0 sm:max-w-[560px]">
        <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
          <div className="auth-modal-marketing hidden p-8 md:flex md:flex-col md:justify-between">
            <div className="flex flex-col gap-5">
              <p className="text-xs uppercase tracking-[0.35em] text-auth-marketing-fg-muted">
                Genesis
              </p>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold leading-tight text-auth-marketing-fg">
                  Simple access.
                </h2>
                <p className="text-sm leading-7 text-auth-marketing-fg-muted">
                  Sign in, create an account, or reset your password.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {mode === "sign-in" ? (
              <SignInForm {...formProps} />
            ) : mode === "sign-up" ? (
              <SignUpForm {...formProps} />
            ) : (
              <ForgotPasswordForm {...formProps} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
