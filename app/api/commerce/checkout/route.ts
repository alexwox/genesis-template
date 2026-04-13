import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/error-utils";
import { CommerceError } from "@/lib/commerce/errors";
import { createGuestCheckoutSession } from "@/lib/commerce/service";
import { guestCheckoutBodySchema } from "@/lib/commerce/api-schemas";
import { assertGuestCheckoutRateLimit } from "@/lib/commerce/rate-limit";
import { tryCatch } from "@/lib/try-catch";

function statusForCommerceError(code: CommerceError["code"]): number {
  switch (code) {
    case "VALIDATION":
      return 400;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "RATE_LIMIT":
      return 429;
    default:
      return 500;
  }
}

function guestRateLimitKey(headers: Headers): string {
  const ip = headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return `guest-checkout:${ip}`;
}

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = guestCheckoutBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  try {
    assertGuestCheckoutRateLimit(guestRateLimitKey(request.headers));
  } catch (error) {
    if (error instanceof CommerceError) {
      return NextResponse.json(
        { error: error.message },
        { status: statusForCommerceError(error.code) },
      );
    }
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { data, error } = await tryCatch(createGuestCheckoutSession(parsed.data));
  if (error) {
    if (error instanceof CommerceError) {
      return NextResponse.json(
        { error: error.message },
        { status: statusForCommerceError(error.code) },
      );
    }
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
