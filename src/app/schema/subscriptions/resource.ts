import { z } from "zod";
import { ResourceSchema } from "@/app/schema/resource";
import { SubscriberSchema } from "@/app/schema/subscriber";

export const ComposedSubscriberResourceSchema = z.object({
  id: z.string(),
  payment_confirmed: z.boolean(),
  how_did_you_hear: z.string().nullable(),
  why_you_are_interested: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().optional().nullable(),
  subscriber: SubscriberSchema,
  resource: ResourceSchema,
});

export const SubscriberResourceCreateSchema = z.object({
  subscriber_id: z.string(),
  resource_id: z.string(),
  how_did_you_hear: z.string(),
  why_you_are_interested: z.string(),
});

export const SubscriberResourceDBSchema = z
  .object({
    id: z.string(),
    payment_confirmed: z.boolean().default(false),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .extend(SubscriberResourceCreateSchema.shape);

export type SubscriberResourceCreate = z.infer<
  typeof SubscriberResourceCreateSchema
>;
export type SubscriberResource = z.infer<typeof SubscriberResourceDBSchema>;
export type ComposedSubscriberResource = z.infer<
  typeof ComposedSubscriberResourceSchema
>;
