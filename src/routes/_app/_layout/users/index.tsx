import NewUserModal from "@/components/users/new-user-modal";
import { useUsersList } from "@/hooks/users";
import { DataTableQuery } from "@/utils/types/queries";
import { createFileRoute } from "@tanstack/react-router";
import Typography from "@/components/typography";
import { DataTable } from "@/components/ui/data-table/DataTable";
import { usersListColumns } from "@/components/users/list-table-columns";

export const Route = createFileRoute("/_app/_layout/users/")({
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

  const { data, isLoading } = useUsersList(query);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between">
        <Typography.H2>Usuarios</Typography.H2>
        <NewUserModal />
      </div>
      <div className="mt-4 sm:mt-6 lg:mt-10">
        <DataTable
          isLoading={isLoading}
          //detailPath="companies"
          columns={usersListColumns}
          data={data?.data || []}
          totalCount={data?.totalCount || 0}
          dataTableFilters={[]}
        />
      </div>
    </>
  );
}
