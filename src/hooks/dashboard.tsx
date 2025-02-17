import api from "@/api";
import { DashboardKpisType, DashboardPieChartType } from "@/schemas/dashboard";

import { useQuery } from "@tanstack/react-query";

async function fetchKpis() {
  try {
    const response = await api.get<DashboardKpisType>("/dashboard/kpis");

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useKpis = () =>
  useQuery({
    queryKey: ["dashboard-kpis"],
    queryFn: () => fetchKpis(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

async function fetchActivitiesByProject() {
  try {
    const response = await api.get<DashboardPieChartType>(
      "/dashboard/activities-by-project"
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useActivitiesByProject = () =>
  useQuery({
    queryKey: ["activities-by-project"],
    queryFn: () => fetchActivitiesByProject(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

async function fetchActivitiesByUser() {
  try {
    const response = await api.get<DashboardPieChartType>(
      "/dashboard/activities-by-user"
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useActivitiesByUser = () =>
  useQuery({
    queryKey: ["activities-by-user"],
    queryFn: () => fetchActivitiesByUser(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
