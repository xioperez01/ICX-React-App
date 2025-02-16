import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLParagraphElement>;

const InputText = React.forwardRef<HTMLParagraphElement, InputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, type, ...props }, ref) => {
    return (
      <p
        className={cn("text-xs text-primary", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
InputText.displayName = "InputText";

export { InputText };
