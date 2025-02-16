/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib/utils";

function H1({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 font-title text-4xl font-bold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

function H2({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 font-title text-2xl font-bold tracking-tight text-primary lg:text-3xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

function H3({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight text-primary",
        className
      )}
    >
      {children}
    </h3>
  );
}

function H4({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight text-primary",
        className
      )}
    >
      {children}
    </h3>
  );
}

export default {
  H1,
  H2,
  H3,
  H4,
};
