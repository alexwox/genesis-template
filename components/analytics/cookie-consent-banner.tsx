"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent";

const hasPostHogKey = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

type ConsentState = "pending" | "unset" | "accepted" | "declined";

/**
 * Anonymous visitors choose analytics opt-in; logged-in users are handled by {@link PostHogIdentify}.
 * Initial `consent` is `pending` so the banner does not SSR with a mismatch before localStorage is read.
 */
export function CookieConsentBanner() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    // Intentional client-only hydration: read localStorage after mount (component is loaded with ssr:false).
    /* eslint-disable react-hooks/set-state-in-effect -- client-only consent state from localStorage */
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw === "accepted") {
        posthog.opt_in_capturing();
        setConsent("accepted");
        return;
      }
      if (raw === "declined") {
        posthog.opt_out_capturing();
        setConsent("declined");
        return;
      }
      setConsent("unset");
    } catch {
      setConsent("unset");
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (!hasPostHogKey || sessionPending || session?.user) {
    return null;
  }

  if (consent !== "unset") {
    return null;
  }

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    posthog.opt_in_capturing();
    setConsent("accepted");
  }

  function decline() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // ignore
    }
    posthog.opt_out_capturing();
    setConsent("declined");
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-border/60 bg-background/95 p-5 shadow-lg backdrop-blur-xl sm:max-w-2xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6 md:max-w-3xl lg:max-w-4xl lg:gap-8 xl:max-w-5xl">
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-relaxed lg:max-w-prose xl:max-w-160">
          We use cookies and similar technologies to understand how you use our site and to improve it. You can
          change your mind anytime by clearing site data for this origin.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2 sm:flex-nowrap sm:justify-end">
          <Button type="button" variant="outline" className="min-h-11 flex-1 rounded-full sm:min-h-10 sm:flex-initial" onClick={decline}>
            Decline
          </Button>
          <Button type="button" className="min-h-11 flex-1 rounded-full sm:min-h-10 sm:flex-initial" onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
