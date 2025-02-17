import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "./icons";

export default function KpiCard({
  isLoading,
  title,
  value,
  unit,
}: {
  isLoading?: boolean;
  title: string;
  value: number;
  unit?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Icons.spinner />
        ) : (
          <p className="text-6xl">
            {value} {unit && <span className="text-3xl">{unit}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
