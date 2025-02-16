import { cn } from "@/lib/utils";
import { mainNav } from "@/utils/constants";
import { Link, useRouterState } from "@tanstack/react-router";

export function MainNav() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  return (
    <div className="flex flex-row justify-between w-full">
      <Link to="/" className="flex items-center space-x-2">
        <div className="flex justify-end font-title text-lg font-medium text-green-950 sm:text-xl min-w-max">
          Prueba ICX
        </div>
      </Link>

      <nav className="hidden gap-6 md:flex w-full flex-row justify-center items-center">
        {mainNav?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  "flex items-center text-lg font-semibold sm:text-sm",
                  pathname !== item.href && "opacity-60"
                )}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
    </div>
  );
}
