import { and, eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { member } from "@/lib/db/schema/auth";
import { db } from "@/lib/db";
import { PaymentsError } from "@/lib/payments/errors";
import type { BillingReference } from "@/lib/payments/types";

export async function assertSessionUser(
  headers: Headers,
): Promise<{ userId: string; email: string; name: string | null }> {
  const session = await auth.api.getSession({ headers });
  if (!session?.user) {
    throw new PaymentsError("You must be signed in.", "UNAUTHORIZED");
  }
  return {
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name,
  };
}

/** Who may purchase or open billing portal (owner/admin for org). */
export async function assertCanManageBilling(
  headers: Headers,
  reference: BillingReference,
): Promise<{ userId: string; email: string; name: string | null }> {
  const user = await assertSessionUser(headers);

  if (reference.type === "user") {
    if (user.userId !== reference.id) {
      throw new PaymentsError(
        "You cannot manage billing for another user.",
        "FORBIDDEN",
      );
    }
    return user;
  }

  const rows = await db
    .select()
    .from(member)
    .where(
      and(
        eq(member.organizationId, reference.id),
        eq(member.userId, user.userId),
      ),
    )
    .limit(1);

  const m = rows[0];
  if (!m || (m.role !== "owner" && m.role !== "admin")) {
    throw new PaymentsError(
      "Only organization owners and admins can manage billing.",
      "FORBIDDEN",
    );
  }
  return user;
}

/** Who may read plan / access state (any org member, or the user themselves). */
export async function assertCanReadBilling(
  headers: Headers,
  reference: BillingReference,
): Promise<{ userId: string; email: string; name: string | null }> {
  const user = await assertSessionUser(headers);

  if (reference.type === "user") {
    if (user.userId !== reference.id) {
      throw new PaymentsError("Forbidden.", "FORBIDDEN");
    }
    return user;
  }

  const rows = await db
    .select()
    .from(member)
    .where(
      and(
        eq(member.organizationId, reference.id),
        eq(member.userId, user.userId),
      ),
    )
    .limit(1);

  if (!rows[0]) {
    throw new PaymentsError(
      "You are not a member of this organization.",
      "FORBIDDEN",
    );
  }
  return user;
}
