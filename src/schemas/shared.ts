import { z } from "zod";

export const selectorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type SelectorType = z.infer<typeof selectorSchema>;

export const dateSchema = z.date({
  invalid_type_error: "Fecha inválida",
  required_error: "Requerido",
});
