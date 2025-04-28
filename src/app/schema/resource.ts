import { z } from "zod"

export const ResourceSchema = z.object({
    id: z.string(),
    created_at: z.string(),
    description: z.string(),
    end_date: z.string(),
    meet_url: z.string(),
    name: z.string(),
    price: z.number(),
    start_date: z.string(),
})

export type Resource = z.infer<typeof ResourceSchema>