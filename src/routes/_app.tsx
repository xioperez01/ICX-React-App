import { useAuth } from "@/hooks/auth";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_app")({
  component: () => <RouteComponent />,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate({ to: "/login" });
  }, [auth.isAuthenticated, navigate]);

  return <Outlet />;
}
