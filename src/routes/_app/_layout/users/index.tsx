import { useUsersList } from "@/hooks/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError } = useUsersList();

  return <div>Hello "/_app/_layout/users/"!</div>;
}
