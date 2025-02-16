import { z } from "zod";

export const selectorSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type SelectorType = z.infer<typeof selectorSchema>;
