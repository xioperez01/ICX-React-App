export interface QueryFilters {
  [key: string]: { in: string[] } | QueryFilters;
}

export type QuerySortBy = { [key: string]: "asc" | "desc" };

export type DataTableQuery = {
  filters?: QueryFilters;
  pageSize?: number;
  pageNumber?: number;
  sortBy?: QuerySortBy;
  toSearch?: string;
};
