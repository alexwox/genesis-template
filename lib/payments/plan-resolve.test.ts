import assert from "node:assert";
import { describe, it } from "node:test";

import {
  resolvePlanKeyFromPolarProductId,
  resolvePlanKeyFromStripePriceId,
} from "@/lib/payments/plan-resolve";

describe("plan-resolve", () => {
  it("returns free when stripe price id is undefined", () => {
    assert.strictEqual(resolvePlanKeyFromStripePriceId(undefined), "free");
  });

  it("returns free when polar product id is undefined", () => {
    assert.strictEqual(resolvePlanKeyFromPolarProductId(undefined), "free");
  });
});
