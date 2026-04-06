import { NextResponse } from "next/server";

import { getErrorMessage } from "@/lib/error-utils";
import { accessQuerySchema } from "@/lib/payments/api-schemas";
import { assertCanReadBilling } from "@/lib/payments/authorize";
import { PaymentsError } from "@/lib/payments/errors";
import { getAccessState } from "@/lib/payments/read-model";
import { tryCatch } from "@/lib/try-catch";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = accessQuerySchema.safeParse({
    referenceType: searchParams.get("referenceType"),
    referenceId: searchParams.get("referenceId"),
  });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const reference = {
    type: parsed.data.referenceType,
    id: parsed.data.referenceId,
  };

  const { error: permError } = await tryCatch(
    assertCanReadBilling(request.headers, reference),
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

  const { data, error } = await tryCatch(getAccessState(reference));
  if (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
