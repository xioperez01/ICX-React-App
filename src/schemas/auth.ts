import * as z from "zod";

export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginRequestType = z.infer<typeof loginRequestSchema>;
