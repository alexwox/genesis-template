import { Polar } from "@polar-sh/sdk";

import { getPaymentsEnv } from "@/lib/payments/config";

let polarSingleton: Polar | null = null;

export function getPolarClient(): Polar {
  if (polarSingleton) {
    return polarSingleton;
  }
  const env = getPaymentsEnv();
  if (!env.polarAccessToken) {
    throw new Error("POLAR_ACCESS_TOKEN is not set");
  }
  polarSingleton = new Polar({
    accessToken: env.polarAccessToken,
    server: env.polarServer,
  });
  return polarSingleton;
}
