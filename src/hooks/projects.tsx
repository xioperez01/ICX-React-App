import api from "@/api";
import { CreateProjectType, ProjectType } from "@/schemas/projects";
import { DataTableQuery } from "@/utils/types/queries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function fetchProjectsList(query?: DataTableQuery) {
  try {
    const response = await api.get<{ data: ProjectType[]; totalCount: number }>(
      "/projects",
      {
        params: query,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useProjectsList = (query?: DataTableQuery) =>
  useQuery({
    queryKey: ["projects-list", query],
    queryFn: () => fetchProjectsList(query),
    enabled: true,
    refetchOnWindowFocus: false,
  });

const createProject = async (data: CreateProjectType) => {
  const response = await api.post<ProjectType>("/projects", { data });

  return response.data;
};

export const useCreateProject = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: CreateProjectType }) => createProject(data),
    onSuccess: () => {
      // @ts-expect-error - We need to invalidate the user query
      queryClient.invalidateQueries("projects", { exact: true });
      onSuccess();
    },
  });
};
