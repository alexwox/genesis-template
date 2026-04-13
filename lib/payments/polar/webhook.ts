import { createHash } from "node:crypto";

import { validateEvent } from "@polar-sh/sdk/webhooks";

import {
  finalizeGuestCheckout,
  finalizeGuestCheckoutByProviderCheckout,
} from "@/lib/commerce/service";
import { CommerceError } from "@/lib/commerce/errors";
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

function getString(
  value: Record<string, unknown>,
  key: string,
): string | undefined {
  const v = value[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

async function maybeFinalizeGuestPolarCheckout(input: {
  eventType: string;
  data: unknown;
  providerEventId: string;
}) {
  if (
    input.eventType !== "order.paid" &&
    input.eventType !== "checkout.updated" &&
    input.eventType !== "checkout.completed"
  ) {
    return;
  }
  if (!input.data || typeof input.data !== "object") {
    return;
  }

  const root = input.data as Record<string, unknown>;
  const metadata =
    root.metadata && typeof root.metadata === "object"
      ? (root.metadata as Record<string, unknown>)
      : null;

  const providerCheckoutId = getString(root, "checkoutId") ?? getString(root, "id");
  const providerOrderId = getString(root, "id");
  const providerCustomerId = getString(root, "customerId");
  const checkoutId =
    metadata && typeof metadata.commerceCheckoutId === "string"
      ? metadata.commerceCheckoutId
      : undefined;

  try {
    if (checkoutId) {
      await finalizeGuestCheckout({
        provider: "polar",
        checkoutId,
        providerCheckoutId: providerCheckoutId ?? null,
        providerOrderId: providerOrderId ?? null,
        providerCustomerId: providerCustomerId ?? null,
        paidAt: new Date(),
        metadata: { polarEventId: input.providerEventId, eventType: input.eventType },
      });
      return;
    }

    if (!providerCheckoutId) {
      return;
    }

    await finalizeGuestCheckoutByProviderCheckout({
      provider: "polar",
      providerCheckoutId,
      providerOrderId: providerOrderId ?? null,
      providerCustomerId: providerCustomerId ?? null,
      paidAt: new Date(),
      metadata: { polarEventId: input.providerEventId, eventType: input.eventType },
    });
  } catch (error) {
    if (error instanceof CommerceError && error.code === "NOT_FOUND") {
      log.warn("Polar commerce checkout id was not found", {
        providerEventId: input.providerEventId,
        checkoutId,
      });
      return;
    }
    throw error;
  }
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

  await maybeFinalizeGuestPolarCheckout({
    eventType,
    data: event.data,
    providerEventId,
  });

  if (event.type === "customer.state_changed") {
    await syncPolarCustomerStateToDatabase(event.data);
  }
}
