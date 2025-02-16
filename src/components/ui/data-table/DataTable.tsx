import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import {
  DataTableFilter,
  Filterbar,
} from "@/components/ui/data-table/DataTableFilterbar";
import { DataTablePagination } from "@/components/ui/data-table/DataTablePagination";

import { ColumnDef, flexRender } from "@tanstack/react-table";

import { useLocation, useNavigate } from "@tanstack/react-router";
import { useServerSideTable } from "@/hooks/useServerSideTable";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalCount: number;
  dataTableFilters: DataTableFilter[];
  detailPath?: string;
  isLoading: boolean;
}

export function DataTable<TData extends { id?: string }>({
  columns,
  data,
  dataTableFilters,
  totalCount,
  detailPath,
  isLoading,
}: DataTableProps<TData>) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    getPageCount,
    handlePageChange,
    handlePageSizeChange,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    table,
    titleSearch,
    setTitleSearch,
    page,
    pageSize,
  } = useServerSideTable(
    data,
    columns,
    totalCount,
    detailPath === "noticesId" ? "description" : "name"
  );

  return (
    <>
      <div className="space-y-3">
        <Filterbar
          table={table}
          dataTableFilters={dataTableFilters}
          search={titleSearch}
          onSearchChange={setTitleSearch}
        />
        <div className="relative overflow-hidden overflow-x-auto">
          <Table className="border">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-y border-gray-200 dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap py-1 text-semibold",
                        header.column.columnDef.meta?.className
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow className="w-full">
                  <TableCell
                    className="p-4 text-sm text-gray-600 dark:text-gray-400 h-24 text-center"
                    colSpan={table.getHeaderGroups()[0]?.headers?.length}
                  >
                    Cargando...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        onClick={() => {
                          if (detailPath)
                            navigate({
                              to: `${pathname}/$${detailPath as string}`,
                              params: {
                                [detailPath as string]: row.original
                                  .id as string,
                              },
                              search: (prev) => ({ ...prev }),
                            });
                        }}
                        className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
                      >
                        {row.getVisibleCells().map((cell, index) => (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              row.getIsSelected()
                                ? "bg-gray-50 dark:bg-gray-900"
                                : "",
                              "relative whitespace-nowrap py-2 text-gray-600 first:w-10 dark:text-gray-400",
                              cell.column.columnDef.meta?.className
                            )}
                          >
                            {index === 0 && row.getIsSelected() && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-500" />
                            )}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Sin resultados...
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
          setPage={handlePageChange}
          getPageCount={getPageCount}
          getCanPreviousPage={getCanPreviousPage}
          getCanNextPage={getCanNextPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </>
  );
}
