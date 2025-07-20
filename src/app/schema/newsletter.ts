import { z } from "zod";

export const NewsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .email("Por favor ingresa un correo electrónico válido")
    .transform((value) => value.trim().toLowerCase()),
});

export type NewsletterSubscription = z.infer<
  typeof NewsletterSubscriptionSchema
>;
