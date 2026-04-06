"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

import { authClient } from "@/lib/auth-client";

const hasPostHogKey = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

/**
 * Syncs Better Auth session to PostHog: identify user, attach organization group,
 * opt in to capturing (logged-in users are treated as having accepted analytics).
 */
export function PostHogIdentify() {
  const { data: session, isPending } = authClient.useSession();
  const { data: activeOrganization } = authClient.useActiveOrganization();

  useEffect(() => {
    if (!hasPostHogKey) {
      return;
    }

    if (isPending) {
      return;
    }

    if (!session?.user) {
      posthog.reset();
      return;
    }

    posthog.opt_in_capturing();
    posthog.identify(session.user.id, {
      email: session.user.email,
      name: session.user.name,
    });

    if (activeOrganization) {
      posthog.group("company", activeOrganization.id, {
        name: activeOrganization.name,
        slug: activeOrganization.slug,
      });
    }
  }, [session, activeOrganization, isPending]);

  return null;
}
