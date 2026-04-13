import { CommerceError } from "@/lib/commerce/errors";

type Bucket = {
  count: number;
  windowStart: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const store = new Map<string, Bucket>();

export function assertGuestCheckoutRateLimit(key: string): void {
  const now = Date.now();
  const current = store.get(key);

  if (!current || now - current.windowStart > WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now });
    return;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    throw new CommerceError(
      "Too many guest checkout attempts. Please retry in a minute.",
      "RATE_LIMIT",
    );
  }

  store.set(key, {
    count: current.count + 1,
    windowStart: current.windowStart,
  });
}
