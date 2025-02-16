import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps {
  pageSize: number;
  page: number;
  setPageSize: (pageSize: number) => void;
  getPageCount: () => number;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
  totalCount: number;
}

export function DataTablePagination({
  pageSize,
  page,
  // setPageSize,
  getPageCount,
  getCanPreviousPage,
  getCanNextPage,
  previousPage,
  nextPage,
  setPage,
  totalCount,
}: DataTablePaginationProps) {
  const paginationButtons = [
    {
      icon: ChevronsLeft,
      onClick: () => setPage(0),
      disabled: !getCanPreviousPage(),
      srText: "First page",
      mobileView: "hidden sm:block",
    },
    {
      icon: ChevronLeft,
      onClick: () => previousPage(),
      disabled: !getCanPreviousPage(),
      srText: "Previous page",
      mobileView: "",
    },
    {
      icon: ChevronRight,
      onClick: () => nextPage(),
      disabled: !getCanNextPage(),
      srText: "Next page",
      mobileView: "",
    },
    {
      icon: ChevronsRight,
      onClick: () => setPage(getPageCount() - 1),
      disabled: !getCanNextPage(),
      srText: "Last page",
      mobileView: "hidden sm:block",
    },
  ];

  const totalRows = totalCount;
  const currentPage = page;
  const firstRowIndex = currentPage * pageSize + 1;
  const lastRowIndex = Math.min(firstRowIndex + pageSize - 1, totalCount);

  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-x-6 lg:gap-x-8">
        <p className="hidden text-sm tabular-nums text-gray-500 sm:block">
          Registros{" "}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {firstRowIndex}-{lastRowIndex}
          </span>{" "}
          de{" "}
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {totalRows}
          </span>
        </p>
        <div className="flex items-center gap-x-1.5">
          {paginationButtons.map((button, index) => (
            <Button
              key={index}
              variant="secondary"
              className={cn(button.mobileView, "p-1.5")}
              onClick={() => {
                button.onClick();
                //table.resetRowSelection();
              }}
              disabled={button.disabled}
            >
              <span className="sr-only">{button.srText}</span>
              <button.icon className="size-4 shrink-0" aria-hidden="true" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
