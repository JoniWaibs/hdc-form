import { z } from "zod";
import { SubscriberSchema } from "@/app/schema/subscriber";
import { ResourceSchema } from "@/app/schema/resource";

export const SubscriberResourcesSchema = z.object({
  id: z.string(),
  payment_confirmed: z.boolean(),
  how_did_you_hear: z.string().nullable(),
  why_you_are_interested: z.string().nullable(),
  created_at: z.string().nullable(),
  updated_at: z.string().optional().nullable(),
  subscriber: SubscriberSchema,
  resource: ResourceSchema,
});

export type SubscriberResource = z.infer<typeof SubscriberResourcesSchema>;
export const subscriberResourcesListSchema = z.array(SubscriberResourcesSchema);
export type SubscriberResourcesList = z.infer<
  typeof subscriberResourcesListSchema
>;
