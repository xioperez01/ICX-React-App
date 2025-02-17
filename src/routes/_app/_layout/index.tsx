import DashboardCarts from "@/components/dashboard/charts";
import DashboardKpis from "@/components/dashboard/kpis";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardKpis />

      <DashboardCarts />
    </div>
  );
}
