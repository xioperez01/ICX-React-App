import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { UserType } from "@/schemas/users";

const columnHelper = createColumnHelper<UserType>();

export const usersListColumns = [
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

  columnHelper.accessor("team.id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipo" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Equipo",
    },
    cell: ({ row }) => {
      return row.original.team?.name;
    },
  }),
] as ColumnDef<UserType>[];
