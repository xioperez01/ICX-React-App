import { JSX } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "./ui/chart";
import { Icons } from "./icons";

export default function ChartCard({
  isLoading,
  title,
  children,
  chartConfig,
}: {
  isLoading: boolean;
  title: string;
  children: JSX.Element;
  chartConfig: ChartConfig;
}) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Icons.spinner />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto max-h-[300px]"
          >
            {children}
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
