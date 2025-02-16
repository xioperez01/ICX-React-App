import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_layout/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="container grid items-center gap-10 pb-8 pt-6 md:py-10">
      main
    </section>
  );
}
