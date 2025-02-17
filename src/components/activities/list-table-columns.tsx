import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader";

import { ActivityType, ActivityTypeOptions } from "@/schemas/activities";
import { DataTableFilter } from "../ui/data-table/DataTableFilterbar";

const columnHelper = createColumnHelper<ActivityType>();

export const projectDataKeys = [
  { label: "Tipo", key: "type", enumOptions: ActivityTypeOptions },
  { label: "Descripción", key: "description" },
  { label: "Duración (mins)", key: "duration" },
  { label: "Fecha", key: "date" },
  { label: "Proyecto", key: "project.name" },
  { label: "Usuario", key: "user.name" },
];

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

export const activityFiltersFields = () =>
  [
    {
      field: "type",
      title: "Tipo",
      type: "checkbox",
      options: Object.entries(ActivityTypeOptions).map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
  ] as DataTableFilter[];
