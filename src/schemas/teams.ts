import { z } from "zod";

export const teamSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(2, "Muy corto"),
});

export const createTeamSchema = z.object({
  name: z.string({ required_error: "Requerido" }).trim().min(2, "Muy corto"),
});

export type TeamType = z.infer<typeof teamSchema>;
export type CreateTeamType = z.infer<typeof createTeamSchema>;
