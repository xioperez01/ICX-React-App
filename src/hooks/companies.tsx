import api from "@/api";
import { CompanyType, CreateCompanyType } from "@/schemas/companies";
import { DataTableQuery } from "@/utils/types/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchCompaniesList(query?: DataTableQuery) {
  try {
    const response = await api.get<{ data: CompanyType[]; totalCount: number }>(
      "/companies",
      {
        params: query,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useCompaniesList = (query?: DataTableQuery) =>
  useQuery({
    queryKey: ["companies-list", query],
    queryFn: () => fetchCompaniesList(query),
    enabled: true,
    refetchOnWindowFocus: false,
  });

const createCompany = async (data: CreateCompanyType) => {
  const response = await api.post<CompanyType>("/companies", { data });

  return response.data;
};

export const useCreateCompany = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CreateCompanyType }) => createCompany(data),
    onSuccess: () => {
      // @ts-expect-error - We need to invalidate the user query
      queryClient.invalidateQueries("companies", { exact: true });
      onSuccess();
    },
  });
};
