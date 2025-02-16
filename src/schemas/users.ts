import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  team: z.object({ id: z.string(), name: z.string() }),
});

export const createUserSchema = z.object({
  firstName: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(2, "Muy corto"),
  lastName: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(2, "Muy corto"),
  team: z.object(
    { id: z.string(), name: z.string() },
    { required_error: "Requerido" }
  ),
});

export type UserType = z.infer<typeof userSchema>;
export type CreateUserType = z.infer<typeof createUserSchema>;
