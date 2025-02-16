import api from "@/api";
import { CreateUserType, UserType } from "@/schemas/users";
import { DataTableQuery } from "@/utils/types/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchUsersList(query?: DataTableQuery) {
  try {
    const response = await api.get<{ data: UserType[]; totalCount: number }>(
      "/users",
      { params: query }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useUsersList = (query?: DataTableQuery) =>
  useQuery({
    queryKey: ["users-list", query],
    queryFn: () => fetchUsersList(query),
    enabled: true,
    refetchOnWindowFocus: false,
  });

const createUser = async (data: CreateUserType) => {
  const response = await api.post<UserType>("/users", { data });

  return response.data;
};

export const useCreateUser = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CreateUserType }) => createUser(data),
    onSuccess: () => {
      // @ts-expect-error - We need to invalidate the user query
      queryClient.invalidateQueries("users", { exact: true });
      onSuccess();
    },
  });
};
