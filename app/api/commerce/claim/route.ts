import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/error-utils";
import { claimOrderBodySchema } from "@/lib/commerce/api-schemas";
import { CommerceError } from "@/lib/commerce/errors";
import { claimGuestOrder } from "@/lib/commerce/service";
import { assertSessionUser } from "@/lib/payments/authorize";
import { tryCatch } from "@/lib/try-catch";

function statusForCommerceError(code: CommerceError["code"]): number {
  switch (code) {
    case "VALIDATION":
      return 400;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    default:
      return 500;
  }
}

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = claimOrderBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { data: user, error: authError } = await tryCatch(
    assertSessionUser(request.headers),
  );
  if (authError) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await tryCatch(
    claimGuestOrder({
      token: parsed.data.token,
      userId: user.userId,
      email: user.email,
    }),
  );
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
