import { z } from "zod";
import { EmailSchema } from "@/app/schema/common/email";
import { NewsletterUnsubscribeInputSchema } from "@/app/schema/subscriptions/newsletter";

export const emailParamSchema = z.object({
  email: EmailSchema.shape.email.optional(),
});

export const subscribeBodySchema = z.object({
  email: EmailSchema.shape.email,
});

export const unsubscribeParamSchema = z.object({
  token: NewsletterUnsubscribeInputSchema.shape.unsubscribe_token,
});
