import { type WebhookEventPayload } from "resend";

import { verifyResendWebhookSignature } from "@/lib/email/resend";
import { logger } from "@/lib/logger";
import { tryCatch } from "@/lib/try-catch";

const resendWebhookLogger = logger.child({
  scope: "resend.webhook",
});

function getRequiredHeader(value: string | null, name: string) {
  if (!value) {
    throw new Error(`Missing ${name} header`);
  }

  return value;
}

function logWebhookEvent(event: WebhookEventPayload) {
  const base = {
    type: event.type,
    createdAt: event.created_at,
  };

  switch (event.type) {
    case "email.delivered":
    case "email.bounced":
    case "email.complained":
    case "email.failed":
    case "email.sent":
      resendWebhookLogger.info("Processed Resend webhook event", {
        ...base,
        emailId: event.data.email_id,
        to: event.data.to,
        subject: event.data.subject,
      });
      return;
    default:
      resendWebhookLogger.info("Processed Resend webhook event", base);
  }
}

export async function POST(request: Request) {
  const { data: event, error } = await tryCatch(
    Promise.resolve().then(async () => {
      const payload = await request.text();

      return verifyResendWebhookSignature(payload, {
        id: getRequiredHeader(request.headers.get("svix-id"), "svix-id"),
        timestamp: getRequiredHeader(
          request.headers.get("svix-timestamp"),
          "svix-timestamp"
        ),
        signature: getRequiredHeader(
          request.headers.get("svix-signature"),
          "svix-signature"
        ),
      });
    })
  );

  if (error) {
    resendWebhookLogger.error("Failed to process Resend webhook request", {
      error: error instanceof Error ? error : new Error("Unknown webhook error"),
      rawError: error instanceof Error ? undefined : error,
    });

    return Response.json(
      { ok: false, message: "Invalid webhook request" },
      { status: 400 }
    );
  }

  logWebhookEvent(event);

  return Response.json({ ok: true });
}
