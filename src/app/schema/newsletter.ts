import { z } from "zod";

export const NewsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido")
    .transform((value) => value.trim().toLowerCase()),
});

export const NewsletterSubscriberSchema = z.object({
  id: z.string().uuid(),
  email: z.string(),
  subscribed_at: z.string().datetime().nullable(),
  unsubscribed_at: z.string().datetime().nullable(),
  unsubscribe_token: z.string().nullable(),
  is_active: z.boolean().default(true),
});

export type NewsletterSubscription = z.infer<
  typeof NewsletterSubscriptionSchema
>;
export type NewsletterSubscriber = z.infer<typeof NewsletterSubscriberSchema>;
