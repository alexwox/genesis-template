import { z } from "zod";

export const commerceAddressSchema = z.object({
  line1: z.string().min(1),
  line2: z.string().min(1).optional(),
  city: z.string().min(1),
  state: z.string().min(1).optional(),
  postalCode: z.string().min(1),
  country: z.string().min(2),
});

export const guestCheckoutBodySchema = z.object({
  buyerEmail: z.email(),
  buyerName: z.string().min(1).optional(),
  buyerPhone: z.string().min(3).optional(),
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  shippingAddress: commerceAddressSchema.optional(),
  successUrl: z.url(),
  cancelUrl: z.url(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const claimOrderBodySchema = z.object({
  token: z.string().min(20),
});
