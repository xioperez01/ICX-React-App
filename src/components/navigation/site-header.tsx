import { MainNav } from "@/components/navigation/main-nav";

import { UserNav } from "@/components/navigation/user-nav";

import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { useAuth } from "@/hooks/auth";

export default function SiteHeader() {
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container max-w-5xl flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 mx-auto px-2">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {auth?.user ? (
              <UserNav
                user={{
                  email: auth?.user?.email ?? "",
                }}
              />
            ) : (
              <Link to="/login">
                <div
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  <Icons.access className="h-5 w-5" />
                  <span className="sr-only">Ingresar</span>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
