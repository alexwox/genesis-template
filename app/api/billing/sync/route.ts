import { NextResponse } from "next/server";

import { syncBodySchema } from "@/lib/payments/api-schemas";
import { assertCanManageBilling } from "@/lib/payments/authorize";
import { PaymentsError } from "@/lib/payments/errors";
import { syncReference } from "@/lib/payments/service";
import { tryCatch } from "@/lib/try-catch";

export async function POST(request: Request) {
  const json: unknown = await request.json().catch(() => null);
  const parsed = syncBodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const reference = parsed.data.reference;

  const { error: permError } = await tryCatch(
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

  const { error } = await tryCatch(syncReference(reference));
  if (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Sync failed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
