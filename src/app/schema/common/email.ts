import { z } from "zod";

export const EmailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((value) => value.trim().toLowerCase()),
});

export type Email = z.infer<typeof EmailSchema>["email"];
