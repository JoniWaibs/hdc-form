import { z } from "zod";

export const ResourceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  start_date: z.string(),
  end_date: z.string(),
  created_at: z.string().optional().nullable(),
  price: z.number(),
  meet_url: z.string(),
});

export type Resource = z.infer<typeof ResourceSchema>;
