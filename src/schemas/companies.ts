import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string().trim().min(2, "Muy corto"),
});

export const createCompanySchema = z.object({
  name: z.string({ required_error: "Requerido" }).trim().min(2, "Muy corto"),
});

export type CompanyType = z.infer<typeof companySchema>;
export type CreateCompanyType = z.infer<typeof createCompanySchema>;
