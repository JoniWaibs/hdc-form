import { z } from "zod"

export const SubscriberSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "(*)").transform(value => value.trim().toLowerCase()),
    email: z.string().email("Email inválido").transform(value => value.trim().toLowerCase()),
    identity_document: z.string().min(1, "(*)").transform(value => value.trim()),
    age: z.string().min(1, "(*)").transform(value => value.trim()),
    phone: z.string().min(1, "(*)").transform(value => value.trim()),
    city: z.string().min(1, "(*)").transform(value => value.trim().toLowerCase()),
    province: z.string().min(1, "(*)").transform(value => value.trim().toLowerCase()),
    country: z.string().min(1, "(*)").transform(value => value.trim().toLowerCase()),
    profession: z.string().min(1, "(*)").transform(value => value.trim().toLowerCase()),
})

export type Subscriber = z.infer<typeof SubscriberSchema>

export const SubscriberWithHowDidYouHearSchema = SubscriberSchema.extend({
  how_did_you_hear: z.string().min(1, "(*)").transform(value => value.toLowerCase()),
  why_you_are_interested: z.string().min(1, "(*)").transform(value => value.toLowerCase()),
})

export type SubscriberWithHowDidYouHear = z.infer<typeof SubscriberWithHowDidYouHearSchema>

export const SubscriberResourcePostSchema = z.object({
  subscriber: SubscriberSchema,
  resource_id: z.string().uuid(),
  how_did_you_hear: z.string(),
  why_you_are_interested: z.string(),
});

export type SubscriberResourcePost = z.infer<typeof SubscriberResourcePostSchema>