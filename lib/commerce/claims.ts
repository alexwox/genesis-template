import { createHash } from "node:crypto";

import { CommerceError } from "@/lib/commerce/errors";
import {
  attachOrderToUser,
  findOrderById,
  findOrderClaimByTokenHash,
  markOrderClaimed,
} from "@/lib/commerce/repository";
import type { ClaimGuestOrderInput } from "@/lib/commerce/types";

export function createClaimToken(): { raw: string; hash: string } {
  const raw =
    crypto.randomUUID().replaceAll("-", "") +
    crypto.randomUUID().replaceAll("-", "");
  const hash = createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

function hashClaimToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function claimGuestOrder(input: ClaimGuestOrderInput): Promise<{
  orderId: string;
}> {
  const claim = await findOrderClaimByTokenHash(hashClaimToken(input.token));
  if (!claim) {
    throw new CommerceError("Claim token is invalid.", "NOT_FOUND");
  }
  if (claim.status !== "pending") {
    throw new CommerceError("Claim token is no longer active.", "FORBIDDEN");
  }
  if (claim.expiresAt.getTime() < Date.now()) {
    throw new CommerceError("Claim token has expired.", "FORBIDDEN");
  }

  const order = await findOrderById(claim.orderId);
  if (!order) {
    throw new CommerceError("Order was not found.", "NOT_FOUND");
  }
  if (order.buyerEmail.toLowerCase() !== input.email.toLowerCase()) {
    throw new CommerceError(
      "Signed-in email does not match the order email.",
      "FORBIDDEN",
    );
  }

  await attachOrderToUser({
    orderId: order.id,
    userId: input.userId,
  });
  await markOrderClaimed({
    claimId: claim.id,
    userId: input.userId,
  });

  return { orderId: order.id };
}
