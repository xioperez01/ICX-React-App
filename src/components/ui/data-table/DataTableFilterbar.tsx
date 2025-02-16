import { Table } from "@tanstack/react-table";

import {
  DataTableFilter,
  FilterType,
} from "@/components/ui/data-table/DataTableFilter";
import { useNavigate } from "@tanstack/react-router";
import { Searchbar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";

export type DataTableFilter = {
  field: string;
  title: string;
  type: FilterType;
  options: { value: string; label: string }[];
};

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  dataTableFilters: DataTableFilter[];
  search?: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

export function Filterbar<TData>({
  table,
  dataTableFilters,
  search,
  onSearchChange,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-wrap justify-start gap-2 sm:gap-x-6 flex-col w-full">
      <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center flex-wrap lg:w-full">
        <Searchbar
          type="search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:max-w-[250px] sm:[&>input]:h-[30px]"
        />

        {dataTableFilters.map((filter) => (
          <DataTableFilter
            isFiltered={isFiltered}
            key={filter.field}
            column={table.getColumn(filter.field)}
            title={filter.title}
            options={filter.options}
            type={filter.type}
          />
        ))}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters(true);
              navigate({
                search: (prev) => {
                  const updatedSearch = { ...prev };

                  if (updatedSearch.filters) {
                    delete updatedSearch.filters;
                  }

                  return updatedSearch;
                },
              });
            }}
            className="border border-gray-200 px-2 font-semibold text-indigo-600 sm:border-none sm:py-1 dark:border-gray-800 dark:text-indigo-500"
          >
            Limpiar Filtros
          </Button>
        )}
      </div>
    </div>
  );
}
