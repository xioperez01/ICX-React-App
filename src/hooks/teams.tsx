import api from "@/api";

import { SelectorType } from "@/schemas/shared";
import { TeamType, CreateTeamType } from "@/schemas/teams";
import { DataTableQuery } from "@/utils/types/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchTeamsList(query?: DataTableQuery) {
  try {
    const response = await api.get<{ data: TeamType[]; totalCount: number }>(
      "/teams",
      {
        params: query,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useTeamsList = (query?: DataTableQuery) =>
  useQuery({
    queryKey: ["teams-list", query],
    queryFn: () => fetchTeamsList(query),
    enabled: true,
    refetchOnWindowFocus: false,
  });

const createTeam = async (data: CreateTeamType) => {
  const response = await api.post<TeamType>("/teams", { data });

  return response.data;
};

export const useCreateTeam = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CreateTeamType }) => createTeam(data),
    onSuccess: () => {
      // @ts-expect-error - We need to invalidate the user query
      queryClient.invalidateQueries("teams", { exact: true });
      onSuccess();
    },
  });
};

async function fetchTeamsListSelector() {
  try {
    const response = await api.get<SelectorType[]>("/teams/selector-list");

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useTeamsListSelector = () =>
  useQuery({
    queryKey: ["teams-list-selector"],
    queryFn: () => fetchTeamsListSelector(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
