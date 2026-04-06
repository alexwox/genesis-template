import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/error-utils";
import { checkoutBodySchema } from "@/lib/payments/api-schemas";
import { assertCanManageBilling } from "@/lib/payments/authorize";
import { PaymentsError } from "@/lib/payments/errors";
import { createCheckoutSession } from "@/lib/payments/service";
import { tryCatch } from "@/lib/try-catch";

function statusForPaymentsError(code: PaymentsError["code"]): number {
  switch (code) {
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "VALIDATION":
      return 400;
    default:
      return 500;
  }
}

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = checkoutBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const body = parsed.data;
  const reference = body.reference;

  const { data: user, error: permError } = await tryCatch(
    assertCanManageBilling(request.headers, reference),
  );
  if (permError) {
    if (permError instanceof PaymentsError) {
      const status =
        permError.code === "UNAUTHORIZED"
          ? 401
          : permError.code === "FORBIDDEN"
            ? 403
            : 500;
      return NextResponse.json({ error: permError.message }, { status });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await tryCatch(
    createCheckoutSession(
      {
        reference,
        mode: body.mode,
        planKey: body.planKey,
        interval: body.interval,
        successUrl: body.successUrl,
        cancelUrl: body.cancelUrl,
        seats: body.seats,
        oneTimeKind: body.oneTimeKind,
      },
      { email: user.email, name: user.name },
    ),
  );

  if (error) {
    if (error instanceof PaymentsError) {
      return NextResponse.json(
        { error: error.message },
        { status: statusForPaymentsError(error.code) },
      );
    }
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
