import { createFileRoute } from "@tanstack/react-router";
import Typography from "@/components/typography";
import { DataTable } from "@/components/ui/data-table/DataTable";
import NewTeamModal from "@/components/teams/new-team-modal";
import { useTeamsList } from "@/hooks/teams";
import {
  teamDataKeys,
  teamsListColumns,
} from "@/components/teams/list-table-columns";
import { DataTableQuery } from "@/utils/types/queries";
import { useState } from "react";
import { TeamType } from "@/schemas/teams";
import EntityDetailModal from "@/components/entity-detail-modal";

export const Route = createFileRoute("/_app/_layout/teams/")({
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

  const { data, isLoading } = useTeamsList(query);

  const [detailData, setDetailData] = useState<TeamType | undefined>();

  return (
    <>
      <EntityDetailModal
        isOpen={!!detailData}
        onOpenChange={() => setDetailData(undefined)}
        data={detailData}
        entity="Equipo"
        keys={teamDataKeys}
      />
      <div className="flex flex-col lg:flex-row justify-between">
        <Typography.H2>Equipos</Typography.H2>
        <NewTeamModal />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable
          isLoading={isLoading}
          columns={teamsListColumns}
          data={data?.data || []}
          totalCount={data?.totalCount || 0}
          dataTableFilters={[]}
          clickOnRow={(row) => setDetailData(row)}
        />
      </div>
    </>
  );
}
