import { z } from "zod";

export const CreatePreferenceSchema = z.object({
  resource_id: z.string(),
  resource_name: z.string(),
  resource_description: z.string().optional(),
  price: z.number(),
  subscriber_email: z.string().email(),
  subscriber_name: z.string(),
  subscriber_id: z.string(),
});

export type CreatePreference = z.infer<typeof CreatePreferenceSchema>;
