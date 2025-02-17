import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

import {
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartCard from "@/components/chart-card";
import { useActivitiesByProject, useActivitiesByUser } from "@/hooks/dashboard";

export function ActivitiesByProjectChart() {
  const { data, isLoading } = useActivitiesByProject();

  return (
    <ChartCard
      title="Actividades por proyecto"
      chartConfig={data?.config || {}}
      isLoading={isLoading}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data?.data || []}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={5}
          labelLine={false}
          label={(props) => {
            return `${(props.percent * 100).toFixed(1)}%`;
          }}
        >
          <LabelList
            dataKey="value"
            className="fill-background"
            stroke="none"
            fontSize={12}
          />
        </Pie>

        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartCard>
  );
}

export function ActivitiesByUserChart() {
  const { data, isLoading } = useActivitiesByUser();

  return (
    <ChartCard
      title="Actividades por usuario"
      chartConfig={data?.config || {}}
      isLoading={isLoading}
    >
      <BarChart accessibilityLayer data={data?.data} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          orient="vertical"
          tickFormatter={(value) =>
            value
              .split(" ")
              .map((name: string) => name.charAt(0))
              .join("")
          }
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="value" strokeWidth={1} radius={5}>
          <LabelList
            position="top"
            offset={10}
            className="fill-foreground"
            fontSize={10}
          />
        </Bar>
      </BarChart>
    </ChartCard>
  );
}

export default function DashboardCarts() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <ActivitiesByProjectChart />
      <ActivitiesByUserChart />
    </div>
  );
}
