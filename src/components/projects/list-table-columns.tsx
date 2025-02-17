import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";
import { ProjectType } from "@/schemas/projects";

const columnHelper = createColumnHelper<ProjectType>();

export const projectsDataKeys = [
  { label: "Nombre", key: "name" },
  { label: "Descripción", key: "description" },
  { label: "Compañía", key: "company.name" },
];

export const projectsListColumns = [
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
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descripción" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Descripción",
    },
  }),
  columnHelper.accessor("company.id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Compañía" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Compañía",
    },
    cell: ({ row }) => {
      return row.original.company?.name;
    },
  }),
] as ColumnDef<ProjectType>[];
