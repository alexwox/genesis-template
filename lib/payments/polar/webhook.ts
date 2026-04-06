import { createHash } from "node:crypto";

import { validateEvent } from "@polar-sh/sdk/webhooks";

import { logger } from "@/lib/logger";
import { tryInsertBillingEvent } from "@/lib/payments/repository";
import { syncPolarCustomerStateToDatabase } from "@/lib/payments/polar/sync";

const log = logger.child({ scope: "payments.polar.webhook" });

function headerRecord(headers: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  headers.forEach((value, key) => {
    out[key] = value;
  });
  return out;
}

function stableEventId(rawBody: string, headers: Headers): string {
  const whId =
    headers.get("webhook-id") ??
    headers.get("Webhook-Id") ??
    headers.get("webhook_id");
  if (whId) {
    return whId;
  }
  return createHash("sha256").update(rawBody).digest("hex");
}

export async function processPolarWebhook(
  rawBody: string,
  headers: Headers,
): Promise<void> {
  const secret = process.env.POLAR_WEBHOOK_SECRET?.trim();
  if (!secret) {
    throw new Error("POLAR_WEBHOOK_SECRET is not set");
  }

  const event = validateEvent(rawBody, headerRecord(headers), secret);

  const providerEventId = stableEventId(rawBody, headers);

  const eventType = event.type;

  const inserted = await tryInsertBillingEvent({
    id: crypto.randomUUID(),
    provider: "polar",
    providerEventId,
    eventType,
    payloadSummary: { type: eventType },
  });

  if (!inserted) {
    log.debug("Duplicate Polar webhook event skipped", { providerEventId });
    return;
  }

  if (event.type === "customer.state_changed") {
    await syncPolarCustomerStateToDatabase(event.data);
  }
}
