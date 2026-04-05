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
      <DialogContent className="overflow-hidden border-border/60 bg-background/95 p-0 sm:max-w-[560px]">
        <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_38%),linear-gradient(180deg,rgba(22,24,30,0.96),rgba(12,14,18,0.98))] p-8 text-white md:flex md:flex-col md:justify-between">
            <div className="flex flex-col gap-5">
              <p className="text-xs uppercase tracking-[0.35em] text-white/55">
                Genesis
              </p>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold leading-tight">
                  Simple access.
                </h2>
                <p className="text-sm leading-7 text-white/70">
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
