import { CheckCircle2, Info, LoaderCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export type AuthMode = "sign-in" | "sign-up" | "reset-password";

export type AuthFormProps = {
  email: string;
  onEmailChange: (email: string) => void;
  error: string | null;
  message: string | null;
  onError: (error: string | null) => void;
  onMessage: (message: string | null) => void;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
};

export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function AuthAlerts({
  error,
  message,
}: {
  error: string | null;
  message: string | null;
}) {
  return (
    <>
      {error ? (
        <Alert variant="destructive">
          <Info />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {message ? (
        <Alert>
          <CheckCircle2 />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}

export function SubmitButton({
  isPending,
  label,
}: {
  isPending: boolean;
  label: string;
}) {
  return (
    <Button
      className="mt-6 w-full"
      type="submit"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <LoaderCircle className="animate-spin" data-icon="inline-start" />
          Working...
        </>
      ) : (
        label
      )}
    </Button>
  );
}
