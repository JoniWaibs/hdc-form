import { z } from "zod";
import { EmailSchema } from "@/app/schema/common/email";

export const NewsletterUnsubscribeInputSchema = z.object({
  unsubscribe_token: z.string().uuid(),
});

export const CreateSubscriberNewsletterSchema = z
  .object({
    email: EmailSchema.shape.email,
  })
  .extend(NewsletterUnsubscribeInputSchema.shape);

export const SubscriberNewsletterSchema = z
  .object({
    id: z.string().uuid(),
    subscribed_at: z.string().datetime().nullable(),
    unsubscribed_at: z.string().datetime().nullable(),
    is_active: z.boolean().default(true),
  })
  .extend(CreateSubscriberNewsletterSchema.shape);

export type SubscriberNewsletter = z.infer<typeof SubscriberNewsletterSchema>;
export type CreateSubscriberNewsletter = z.infer<
  typeof CreateSubscriberNewsletterSchema
>;
export type UnsubscribeToken = z.infer<
  typeof NewsletterUnsubscribeInputSchema
>["unsubscribe_token"];
