import { Column } from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, focusRing } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QueryFilters } from "@/utils/types/queries";

export type ConditionFilter = {
  condition: string;
  value: [number | string, number | string];
};

export type FilterType = "select" | "checkbox" | "multiselect";

interface DataTableFilterProps<TData, TValue> {
  column: Column<TData, TValue> | undefined;
  title?: string;
  options?: {
    label: string;
    value: string;
  }[];
  type?: FilterType;
  isFiltered?: boolean;
}

const ColumnFiltersLabel = ({
  columnFilterLabels,
  className,
}: {
  columnFilterLabels: string[] | undefined;
  className?: string;
}) => {
  if (!columnFilterLabels) return null;

  if (columnFilterLabels.length < 3) {
    return (
      <span className={cn("truncate", className)}>
        {columnFilterLabels.map((value, index) => (
          <span
            key={value}
            className={cn("font-semibold text-indigo-600 dark:text-indigo-400")}
          >
            {value}
            {index < columnFilterLabels.length - 1 && ", "}
          </span>
        ))}
      </span>
    );
  }

  return (
    <>
      <span
        className={cn(
          "font-semibold text-indigo-600 dark:text-indigo-400",
          className
        )}
      >
        {columnFilterLabels[0]} and {columnFilterLabels.length - 1} more
      </span>
    </>
  );
};

export function DataTableFilter<TData, TValue>({
  column,
  title,
  options,
  type = "select",
  isFiltered,
}: DataTableFilterProps<TData, TValue>) {
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState<string[]>(
    (column?.getFilterValue() as string[]) || []
  );

  const columnFilterLabels = React.useMemo(() => {
    if (!selectedValues) return undefined;

    if (selectedValues) {
      return options
        ?.filter((op) => selectedValues.includes(op.value))
        .map((op) => op.label);
    }

    return undefined;
  }, [options, selectedValues]);

  useEffect(() => {
    if (!isFiltered) {
      column?.setFilterValue("");
      setSelectedValues([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFiltered]);

  const getDisplayedFilter = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={selectedValues[0]}
            onValueChange={(value) => {
              setSelectedValues([value]);
            }}
          >
            <SelectTrigger className="mt-2 sm:py-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      //case "multiselect":
      //  return (
      //    <MultiSelect
      //      value={selectedValues}
      //      onValueChange={(value) => {
      //        setSelectedValues(value);
      //      }}
      //    >
      //      {options?.map((item) => (
      //        <MultiSelectItem key={item.value} value={item.value}>
      //          {item.label}
      //        </MultiSelectItem>
      //      ))}
      //    </MultiSelect>
      //  );
      case "checkbox":
        return (
          <div className="mt-2 space-y-2 overflow-y-auto sm:max-h-36">
            {options?.map((option) => {
              return (
                <div key={option.label} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedValues?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        setSelectedValues(
                          selectedValues.filter((val) => val !== option.value)
                        );
                      } else {
                        setSelectedValues([...selectedValues, option.value]);
                      }

                      const filterValues = Array.from(selectedValues);

                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                    }}
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-base sm:text-sm"
                  >
                    {option.label}
                  </Label>
                </div>
              );
            })}
          </div>
        );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-x-1.5 whitespace-nowrap rounded-md border border-gray-300 px-2 py-1.5 font-medium text-gray-600 hover:bg-gray-50 sm:w-fit sm:text-xs dark:border-gray-700 dark:text-gray-400 hover:dark:bg-gray-900",
            !!selectedValues?.length &&
              ((typeof selectedValues === "object" &&
                "condition" in selectedValues &&
                selectedValues.condition !== "") ||
                (typeof selectedValues === "string" && selectedValues !== "") ||
                (Array.isArray(selectedValues) && selectedValues.length > 0))
              ? ""
              : "border-dashed",
            focusRing
          )}
        >
          <span
            aria-hidden="true"
            onClick={(e) => {
              if (selectedValues?.length) {
                e.stopPropagation();
                column?.setFilterValue("");
                setSelectedValues([]);
              }

              navigate({
                search: (prev) => {
                  const id = column?.id.includes("_")
                    ? column?.id.split("_")[0]
                    : column?.id;

                  const updatedSearch = { ...prev };

                  if (updatedSearch.filters) {
                    const updatedFilters = { ...updatedSearch.filters };

                    delete updatedFilters[id as string];

                    if (Object.keys(updatedFilters).length === 0) {
                      delete updatedSearch.filters;
                    } else {
                      updatedSearch.filters = updatedFilters;
                    }
                  }

                  return updatedSearch;
                },
              });
            }}
          >
            <Plus
              className={cn(
                "-ml-px size-5 shrink-0 transition sm:size-4",
                !!selectedValues?.length && "rotate-45 hover:text-red-500"
              )}
              aria-hidden="true"
            />
          </span>
          {/* differentiation below for better mobile view */}
          {columnFilterLabels && columnFilterLabels.length > 0 ? (
            <span>{title}</span>
          ) : (
            <span className="w-full text-left sm:w-fit">{title}</span>
          )}
          {columnFilterLabels && columnFilterLabels.length > 0 && (
            <span
              className="h-4 w-px bg-gray-300 dark:bg-gray-700"
              aria-hidden="true"
            />
          )}
          <ColumnFiltersLabel
            columnFilterLabels={columnFilterLabels}
            className="w-full text-left sm:w-fit"
          />
          <ArrowDown
            className="size-5 shrink-0 text-gray-500 sm:size-4"
            aria-hidden="true"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={7}
        className="min-w-[calc(var(--radix-popover-trigger-width))] max-w-[calc(var(--radix-popover-trigger-width))] sm:min-w-56 sm:max-w-56"
        onInteractOutside={() => {
          column?.setFilterValue(selectedValues);
          navigate({
            search: (prev) => {
              const id = column?.id as string;
              if (selectedValues?.length) {
                if (id?.includes("_")) {
                  const [key, subKey] = id.split("_");
                  const subObj = {
                    [subKey as string]: { in: selectedValues },
                  };
                  return {
                    filters: {
                      ...prev.filters,
                      [key as string]: subObj,
                    },
                  };
                }
                return {
                  filters: {
                    ...prev.filters,
                    [column?.id as string]: { in: selectedValues },
                  },
                };
              }

              if (prev?.filters) {
                delete prev.filters[
                  !id?.includes("_") ? id : (id.split("_")[0] as string)
                ];

                if (Object.keys(prev.filters).length === 0) delete prev.filters;
              }

              return { ...prev };
            },
          });
        }}
      >
        <div className="space-y-2">
          <div>
            <Label className="text-base font-medium sm:text-sm">
              Filtrar por {title}
            </Label>
            {getDisplayedFilter()}
          </div>
          <PopoverTrigger className="w-full" asChild>
            <Button
              disabled={!options?.length}
              onClick={() => {
                column?.setFilterValue(selectedValues);
                navigate({
                  search: (prev) => {
                    const id = column?.id as string;
                    if (id?.includes("_")) {
                      const [key, subKey] = id.split("_");
                      const subObj = {
                        [subKey as string]: { in: selectedValues },
                      };
                      return {
                        filters: {
                          ...prev.filters,
                          [key as string]: subObj,
                        },
                      };
                    }
                    return {
                      filters: {
                        ...prev.filters,
                        [column?.id as string]: { in: selectedValues },
                      },
                    };
                  },
                });
              }}
            >
              Aplicar
            </Button>
          </PopoverTrigger>
          {columnFilterLabels && columnFilterLabels.length > 0 && (
            <PopoverTrigger className="w-full" asChild>
              <Button
                variant="secondary"
                className="w-full sm:py-1"
                type="button"
                onClick={() => {
                  column?.setFilterValue("");
                  setSelectedValues([]);

                  navigate({
                    search: (prev) => {
                      const id = column?.id.includes("_")
                        ? column?.id.split("_")[0]
                        : column?.id;

                      let updatedFilters: QueryFilters | undefined = {
                        ...prev.filters,
                      };

                      if (updatedFilters[id as string]) {
                        delete updatedFilters[id as string];
                      }

                      if (Object.keys(updatedFilters).length === 0) {
                        updatedFilters = undefined;
                      }

                      return { ...prev, filters: updatedFilters };
                    },
                  });
                }}
              >
                Limpiar
              </Button>
            </PopoverTrigger>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
