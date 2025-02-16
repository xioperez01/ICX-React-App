import { companiesListColumns } from "@/components/companies/list-table-columns";
import NewCompanyModal from "@/components/companies/new-company-modal";
import Typography from "@/components/typography";

import { DataTable } from "@/components/ui/data-table/DataTable";
import { useCompaniesList } from "@/hooks/companies";
import { DataTableQuery } from "@/utils/types/queries";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout/companies/")({
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

  const { data, isLoading } = useCompaniesList(query);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <Typography.H2>Compañías</Typography.H2>
        <NewCompanyModal />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable
          isLoading={isLoading}
          //detailPath="companies"
          columns={companiesListColumns}
          data={data?.data || []}
          totalCount={data?.totalCount || 0}
          dataTableFilters={[]}
        />
      </div>
    </>
  );
}
