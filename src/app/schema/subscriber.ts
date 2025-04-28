import { z } from "zod"

export const SubscriberSchema = z.object({
    name: z.string().min(1, "(*)"),
    email: z.string().email("Email inválido"),
    identity_document: z.string().min(1, "(*)"),
    age: z.string().min(1, "(*)"),
    phone: z.string().min(1, "(*)"),
    city: z.string().min(1, "(*)"),
    province: z.string().min(1, "(*)"),
    country: z.string().min(1, "(*)"),
    profession: z.string().min(1, "(*)"),
  })

  export type Subscriber = z.infer<typeof SubscriberSchema>

  export const SubscriberWithHowDidYouHearSchema = SubscriberSchema.extend({
    how_did_you_hear: z.string().min(1, "(*)"),
    why_you_are_interested: z.string().min(1, "(*)"),
  })

  export type SubscriberWithHowDidYouHear = z.infer<typeof SubscriberWithHowDidYouHearSchema>
  

export const SubscriberResourceSchema = z.object({
  id: z.string().uuid(),
  payment_confirmed: z.boolean(),
  how_did_you_hear: z.string(),
  why_you_are_interested: z.string(),
  created_at: z.string().datetime().nullable(),

  subscriber: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    identity_document: z.string(),
    city: z.string(),
    province: z.string(),
    country: z.string(),
    profession: z.string(),
  }),

  resource: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    start_date: z.string().date(),
    end_date: z.string().date(),
    price: z.number(),
    meet_url: z.string().url(),
  }),
});

export const SubscriberResourceArraySchema = z.array(SubscriberResourceSchema);

export type SubscriberResource = z.infer<typeof SubscriberResourceSchema>