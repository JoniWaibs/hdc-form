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
  