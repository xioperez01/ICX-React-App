import { useProjectsList } from "@/hooks/projects";
import { DataTableQuery } from "@/utils/types/queries";
import { createFileRoute } from "@tanstack/react-router";
import Typography from "@/components/typography";
import NewProjectModal from "@/components/projects/new-project-modal";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { projectsListColumns } from "@/components/projects/list-table-columns";

export const Route = createFileRoute("/_app/_layout/projects/")({
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

  const { data, isLoading } = useProjectsList(query);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <Typography.H2>Proyectos</Typography.H2>
        <NewProjectModal />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable
          isLoading={isLoading}
          //detailPath="companies"
          columns={projectsListColumns}
          data={data?.data || []}
          totalCount={data?.totalCount || 0}
          dataTableFilters={[]}
        />
      </div>
    </>
  );
}
