import { useAuth } from "@/hooks/auth";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(auth)/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) navigate({ to: "/" });
  }, [auth.isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm h-full flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
