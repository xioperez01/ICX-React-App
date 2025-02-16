import SiteHeader from "@/components/navigation/site-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex min-h-screen flex-col items-center">
      <SiteHeader />
      <div className="h-full flex-1 container max-w-7xl px-2 py-8">
        <Outlet />
      </div>
    </div>
  );
}
