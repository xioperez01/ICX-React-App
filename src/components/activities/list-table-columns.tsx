import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

import { ActivityType, ActivityTypeOptions } from "@/schemas/activities";

const columnHelper = createColumnHelper<ActivityType>();

export const activitiesListColumns = [
  columnHelper.accessor("type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "type",
    },
    cell: ({ row }) => {
      return ActivityTypeOptions[row.original.type];
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
  columnHelper.accessor("duration", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duración" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "Duración",
    },
  }),

  columnHelper.accessor("date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    enableSorting: true,
    enableHiding: false,
    meta: {
      className: "text-left",
      displayName: "date",
    },
    cell: ({ row }) => {
      return new Date(row.original.date).toLocaleDateString();
    },
  }),
  columnHelper.accessor("project.id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proyecto" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Proyecto",
    },
    cell: ({ row }) => {
      return row.original.project?.name;
    },
  }),

  columnHelper.accessor("user.id", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
    enableSorting: true,
    meta: {
      className: "text-left",
      displayName: "Usuario",
    },
    cell: ({ row }) => {
      return row.original.user?.name;
    },
  }),
] as ColumnDef<ActivityType>[];
