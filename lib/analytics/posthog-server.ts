import { PostHog } from "posthog-node";

const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.POSTHOG_HOST ?? "https://eu.i.posthog.com";

/**
 * Server-side PostHog client for short-lived serverless invocations.
 * Call `await client.shutdown()` after each batch of work (or use {@link withPostHog}).
 */
export function createPostHogServerClient(): PostHog | null {
  if (!apiKey) {
    return null;
  }

  return new PostHog(apiKey, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
}

type TrackServerEventArgs = {
  distinctId: string;
  event: string;
  properties?: Record<string, unknown>;
  groups?: Record<string, string | number>;
};

/**
 * Capture one server-side event and flush. Safe when PostHog is not configured.
 */
export async function captureServerEvent({
  distinctId,
  event,
  properties,
  groups,
}: TrackServerEventArgs): Promise<void> {
  const client = createPostHogServerClient();
  if (!client) {
    return;
  }

  try {
    client.capture({
      distinctId,
      event,
      properties,
      groups,
    });
  } finally {
    await client.shutdown();
  }
}
