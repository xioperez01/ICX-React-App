import { z } from "zod";
import { dateSchema } from "./shared";

export enum ActivityTypeEnum {
  ADMINISTRATIVE = "ADMINISTRATIVE",
  TRAINING = "TRAINING",
  DESIGN = "DESIGN",
  DOCUMENTATION = "DOCUMENTATION",
  IMPLEMENTATION = "IMPLEMENTATION",
  RESEARCH = "RESEARCH",
  TESTING = "TESTING",
  SCRUM = "SCRUM",
  SUPPORT = "SUPPORT",
}

export const ActivityTypeOptions: Record<ActivityTypeEnum, string> = {
  [ActivityTypeEnum.ADMINISTRATIVE]: "Administrativo",
  [ActivityTypeEnum.TRAINING]: "Capacitación",
  [ActivityTypeEnum.DESIGN]: "Diseño",
  [ActivityTypeEnum.DOCUMENTATION]: "Documentación",
  [ActivityTypeEnum.IMPLEMENTATION]: "Implementación",
  [ActivityTypeEnum.RESEARCH]: "Investigación",
  [ActivityTypeEnum.TESTING]: "Pruebas",
  [ActivityTypeEnum.SCRUM]: "Scrum",
  [ActivityTypeEnum.SUPPORT]: "Soporte",
};

export const activitySchema = z.object({
  id: z.string(),
  type: z.nativeEnum(ActivityTypeEnum),
  description: z.string(),
  duration: z.number(),
  date: dateSchema,
  project: z.object({ id: z.string(), name: z.string() }),
  user: z.object({ id: z.string(), name: z.string() }),
});

export const createActivitySchema = z.object({
  type: z.nativeEnum(ActivityTypeEnum, { required_error: "Requerido" }),
  description: z
    .string({ required_error: "Requerido" })
    .trim()
    .min(5, "Muy corto"),
  duration: z
    .number({ required_error: "Requerido" })
    .positive({ message: "Debe ser positivo" }),
  date: dateSchema,
  project: z.object(
    { id: z.string(), name: z.string() },
    { required_error: "Requerido" }
  ),
  user: z.object(
    { id: z.string(), name: z.string() },
    { required_error: "Requerido" }
  ),
});

export type ActivityType = z.infer<typeof activitySchema>;
export type CreateActivityType = z.infer<typeof createActivitySchema>;
