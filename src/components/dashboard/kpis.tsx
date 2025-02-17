import KpiCard from "@/components/kpi-card";
import { useKpis } from "@/hooks/dashboard";

export default function DashboardKpis() {
  const { data, isLoading } = useKpis();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <KpiCard
        isLoading={isLoading}
        title="Actividades"
        value={data?.activitiesCount || 0}
      />
      <KpiCard
        isLoading={isLoading}
        title="Proyectos"
        value={data?.projectsCount || 0}
      />
      <KpiCard
        isLoading={isLoading}
        title="Duración de actividad promedio"
        value={data?.activityAverageDuration || 0}
        unit="minutos"
      />
    </div>
  );
}
