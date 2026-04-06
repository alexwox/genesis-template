/**
 * Canonical PostHog event names for the template (`domain:action`).
 * Do not log PII in properties (email, name, tokens).
 */
export const AnalyticsEvents = {
  signupBegan: "signup:began",
  signupCompleted: "signup:completed",
  signupVerified: "signup:verified",
  authSignedIn: "auth:signed_in",
  authSignedOut: "auth:signed_out",
  orgCreated: "org:created",
  orgSwitched: "org:switched",
  inviteAccepted: "invite:accepted",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];
