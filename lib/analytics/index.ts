/**
 * Client-safe analytics surface. Server code must import from
 * `@/lib/analytics/posthog-server` directly so `posthog-node` is not bundled for the browser.
 */
export { AnalyticsEvents, type AnalyticsEventName } from "@/lib/analytics/event-names";
export { trackClientEvent } from "@/lib/analytics/client-track";
