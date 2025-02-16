import api from "@/api";
import { useQuery } from "@tanstack/react-query";

async function fetchUsersList() {
  try {
    const response = await api.get("/users");

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const useUsersList = () =>
  useQuery({
    queryKey: ["users-list"],
    queryFn: () => fetchUsersList(),
    enabled: true,
    refetchOnWindowFocus: false,
  });
