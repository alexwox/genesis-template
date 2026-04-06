import { z } from "zod";

export const billingReferenceSchema = z.object({
  type: z.enum(["user", "organization"]),
  id: z.string().min(1),
});

export const checkoutBodySchema = z.object({
  reference: billingReferenceSchema,
  mode: z.enum(["subscription", "one_time"]),
  planKey: z.string().min(1),
  interval: z.enum(["month", "year"]).optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  seats: z.number().int().positive().optional(),
  oneTimeKind: z.enum(["creditsTopUp"]).optional(),
});

export const portalBodySchema = z.object({
  reference: billingReferenceSchema,
  returnUrl: z.string().url(),
});

export const accessQuerySchema = z.object({
  referenceType: z.enum(["user", "organization"]),
  referenceId: z.string().min(1),
});

export const syncBodySchema = z.object({
  reference: billingReferenceSchema,
});
