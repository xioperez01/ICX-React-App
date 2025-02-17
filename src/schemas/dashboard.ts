import { z } from "zod";

export const DashboardkpisSchema = z.object({
  activityAverageDuration: z.number(),
  activitiesCount: z.number(),
  projectsCount: z.number(),
});

export const dashboardPieChartSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      value: z.number(),
      fill: z.string(),
    })
  ),
  config: z.record(
    z.string(),
    z.object({
      label: z.string(),
    })
  ),
});

export type DashboardKpisType = z.infer<typeof DashboardkpisSchema>;
export type DashboardPieChartType = z.infer<typeof dashboardPieChartSchema>;
