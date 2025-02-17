/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";

import useDebounce from "@/hooks/useDebounce";

import { useNavigate, useSearch } from "@tanstack/react-router";
import { QueryFilters } from "@/utils/types/queries";

export function useServerSideTable<T>(
  tableData: Array<T>,
  columns: Array<ColumnDef<T>>,
  dataCount: number | undefined,
  searchKey = "name",
  selectedRows?: Array<string>
) {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  function transformFilters(
    filters: QueryFilters,
    parentKey = ""
  ): {
    id: string;
    value: string[];
  }[] {
    return Object.entries(filters).flatMap(([key, value]) => {
      if (typeof value === "object" && !Array.isArray(value)) {
        const newParentKey = parentKey ? parentKey + "_" + key : key;
        return transformFilters(value as QueryFilters, newParentKey);
      } else {
        const id = parentKey ? parentKey : key;
        const filterValue = Array.isArray(value)
          ? value
          : (value as { in: string[] }).in;
        return [{ id, value: filterValue }];
      }
    });
  }

  const columnFilters = transformFilters(search?.filters || {});

  const pageNumber = search?.pageNumber || 0;
  const pageSize = search?.pageSize || 10;
  const sorting = search?.sortBy
    ? Object.entries(search?.sortBy)?.map(([key, value]) => ({
        id: key,
        desc: value === "desc",
      }))
    : [{ id: "name", desc: false }];

  const handlePageChange = (newPage: number) => {
    if (newPage < 0) {
      newPage = 0;
    }
    if (newPage > getPageCount()) {
      newPage = getPageCount();
    }
    //@ts-expect-error
    navigate({ search: { ...search, pageNumber: newPage } });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    //@ts-expect-error
    navigate({ search: { ...search, pageSize: newPageSize } });
  };

  const getPageCount = () => {
    if (dataCount) {
      return Math.ceil(dataCount / pageSize);
    } else {
      return 1;
    }
  };

  const getCanPreviousPage = () => {
    return pageNumber > 0;
  };

  const getCanNextPage = () => {
    return pageNumber < getPageCount() - 1;
  };

  const previousPage = () => {
    handlePageChange(pageNumber - 1);
  };

  const nextPage = () => {
    handlePageChange(pageNumber + 1);
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: tableData,
    columns,
    onColumnFiltersChange: (columnFiltersUpdate) => {
      if (typeof columnFiltersUpdate === "function") {
        return columnFiltersUpdate(columnFilters);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    onSortingChange: (sortingUpdate) => {
      if (typeof sortingUpdate === "function") {
        const newSorting = sortingUpdate(sorting);
        navigate({
          search: {
            ...search,
            //@ts-expect-error
            sortBy: {
              [newSorting[0]?.id as string]: newSorting[0]?.desc
                ? "desc"
                : "asc",
            },
          },
        });
      }
    },
    state: {
      pagination: {
        pageSize,
        pageIndex: pageNumber,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [titleSearch, setTitleSearch] = useState(
    (columnFilters?.find((filter) => filter.id === searchKey)
      ?.value as unknown as string) ?? ""
  );

  const debouncedSearchTerm = useDebounce(titleSearch, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      table.getColumn(searchKey)?.setFilterValue(debouncedSearchTerm);
      //@ts-expect-error
      navigate({ search: { ...search, toSearch: debouncedSearchTerm } });
    } else {
      table.getColumn(searchKey)?.setFilterValue(undefined);
      navigate({
        //@ts-expect-error
        search: (prev) => {
          if (prev?.toSearch) delete prev.toSearch;

          return { ...prev };
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, table]);

  useEffect(() => {
    if (selectedRows?.length) {
      const newRowSelectionState: RowSelectionState = {};

      tableData.forEach((row, index) => {
        // @ts-ignore
        if (selectedRows.includes(row?.id as string)) {
          newRowSelectionState[index.toString()] = true;
        } else {
          newRowSelectionState[index.toString()] = false;
        }
      });
      setRowSelection(newRowSelectionState);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  return {
    getPageCount,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    handlePageChange,
    handlePageSizeChange,
    table,
    titleSearch,
    setTitleSearch,
    page: pageNumber,
    pageSize,
  };
}
