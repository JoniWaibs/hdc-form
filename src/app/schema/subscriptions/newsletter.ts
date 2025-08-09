import { z } from "zod";
import { EmailSchema } from "@/app/schema/common/email";

export const NewsletterSubscriberDBSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  subscribed_at: z.string().datetime().nullable(),
  unsubscribed_at: z.string().datetime().nullable(),
  unsubscribe_token: z.string().nullable(),
  is_active: z.boolean().default(true),
});

export const NewsletterSubscriberCreateSchema = z.object({
  email: EmailSchema.shape.email,
  unsubscribe_token: z.string().uuid(),
});

export const NewsletterUnsubscribeInputSchema = z.object({
  unsubscribe_token: z.string().uuid(),
});

export type DDBBNewsletterSubscriber = z.infer<
  typeof NewsletterSubscriberDBSchema
>;
export type CreateNewsletterSubscriber = z.infer<
  typeof NewsletterSubscriberCreateSchema
>;
export type UnsubscribeToken = z.infer<
  typeof NewsletterUnsubscribeInputSchema
>["unsubscribe_token"];
