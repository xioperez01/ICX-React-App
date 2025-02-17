import { DataTableQuery } from "@/utils/types/queries";
import { createFileRoute } from "@tanstack/react-router";
import Typography from "@/components/typography";
import { useActivityList } from "@/hooks/activities";
import NewActivityModal from "@/components/activities/new-activity-modal";
import { DataTable } from "@/components/ui/data-table/DataTable";
import {
  activitiesListColumns,
  activityFiltersFields,
  projectDataKeys,
} from "@/components/activities/list-table-columns";
import { useState } from "react";
import { ActivityType } from "@/schemas/activities";
import EntityDetailModal from "@/components/entity-detail-modal";

export const Route = createFileRoute("/_app/_layout/activities/")({
  validateSearch: (search: Record<string, unknown>): DataTableQuery => {
    return search as DataTableQuery;
  },
  preSearchFilters: [
    (search) => ({
      ...search,
    }),
  ],
  component: RouteComponent,
});

function RouteComponent() {
  const query = Route.useSearch();

  const { data, isLoading } = useActivityList(query);

  const [detailData, setDetailData] = useState<ActivityType | undefined>();

  return (
    <>
      <EntityDetailModal
        isOpen={!!detailData}
        onOpenChange={() => setDetailData(undefined)}
        data={detailData}
        entity="Actividad"
        keys={projectDataKeys}
      />

      <div className="flex flex-col lg:flex-row justify-between">
        <Typography.H2>Actividades</Typography.H2>
        <NewActivityModal />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable
          isLoading={isLoading}
          columns={activitiesListColumns}
          data={data?.data || []}
          totalCount={data?.totalCount || 0}
          dataTableFilters={activityFiltersFields()}
          clickOnRow={(row) => setDetailData(row)}
        />
      </div>
    </>
  );
}
