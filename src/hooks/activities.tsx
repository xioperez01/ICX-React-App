import api from "@/api";
import { ActivityType, CreateActivityType } from "@/schemas/activities";
import { DataTableQuery } from "@/utils/types/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchActivityList(query?: DataTableQuery) {
  try {
    const response = await api.get<{
      data: ActivityType[];
      totalCount: number;
    }>("/activities", {
      params: query,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useActivityList = (query?: DataTableQuery) =>
  useQuery({
    queryKey: ["activity-list", query],
    queryFn: () => fetchActivityList(query),
    enabled: true,
    refetchOnWindowFocus: false,
  });

const createActivity = async (data: CreateActivityType) => {
  const response = await api.post<ActivityType>("/activities", { data });

  return response.data;
};

export const useCreateActivity = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CreateActivityType }) =>
      createActivity(data),
    onSuccess: () => {
      // @ts-expect-error - We need to invalidate the user query
      queryClient.invalidateQueries("activities", { exact: true });
      onSuccess();
    },
  });
};
