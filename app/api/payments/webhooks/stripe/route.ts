import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/error-utils";
import { logger } from "@/lib/logger";
import { handleProviderWebhook } from "@/lib/payments/service";
import { tryCatch } from "@/lib/try-catch";

const log = logger.child({ scope: "api.payments.webhooks.stripe" });

export async function POST(request: Request) {
  const rawBody = await request.text();

  const { data, error } = await tryCatch(
    handleProviderWebhook({
      provider: "stripe",
      rawBody,
      headers: request.headers,
    }),
  );

  if (error) {
    log.error("Stripe webhook processing failed", {
      error: error instanceof Error ? error : new Error(String(error)),
    });
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 400 },
    );
  }

  return NextResponse.json(data);
}
