import { z } from "zod";

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  company: z.object({ id: z.string(), name: z.string() }),
});

export const createProjectSchema = z.object({
  name: z.string({ required_error: "Requerido" }).trim().min(2, "Muy corto"),
  description: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(5, "Muy corto"),
  company: z.object(
    { id: z.string(), name: z.string() },
    { required_error: "Requerido" }
  ),
});

export type ProjectType = z.infer<typeof projectSchema>;
export type CreateProjectType = z.infer<typeof createProjectSchema>;
