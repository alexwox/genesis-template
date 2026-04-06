import posthog from "posthog-js";

import type { AnalyticsEventName } from "@/lib/analytics/event-names";

const hasPostHogKey = Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);

/**
 * Client-side analytics. No-ops when PostHog is not configured.
 * Never pass email, name, tokens, or other PII in `properties`.
 */
export function trackClientEvent(
  event: AnalyticsEventName,
  properties?: Record<string, unknown>,
): void {
  if (!hasPostHogKey) {
    return;
  }
  posthog.capture(event, properties);
}
