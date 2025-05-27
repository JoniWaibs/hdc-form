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
  session_count: z.number().default(1),
  disclaimer: z.string().nullable(),
});

export type Resource = z.infer<typeof ResourceSchema>;

export const ResourcePostSchema = ResourceSchema.omit({ id: true });

export type ResourcePost = z.infer<typeof ResourcePostSchema>;
