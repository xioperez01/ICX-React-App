import { CompanyType } from "@/schemas/companies";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

const columnHelper = createColumnHelper<CompanyType>();

export const companiesListColumns = [
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Nombre",
    },
  }),
] as ColumnDef<CompanyType>[];
