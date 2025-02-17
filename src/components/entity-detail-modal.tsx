import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { isValid, parseISO } from "date-fns";

interface DataKeys {
  label: string;
  key: string;
  enumOptions?: Record<string, string>;
}

export default function EntityDetailModal({
  keys,
  entity,
  data,
  isOpen,
  onOpenChange,
}: {
  keys: DataKeys[];
  entity: string;
  data?: Record<string, string | Date | number | Record<string, string>>;
  isOpen: boolean;
  onOpenChange: () => void;
}) {
  const getValue = (
    data: any,
    key: string,
    enumOptions?: Record<string, string>
  ) => {
    if (key.includes(".")) {
      return key.split(".").reduce((acc, k) => acc?.[k], data);
    }

    if (typeof data[key] !== "number" && isValid(parseISO(data[key])))
      return new Date(data[key]).toLocaleDateString();

    if (enumOptions) return enumOptions[data[key] as string];

    return data[key] as string;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{entity}</DialogTitle>
          <DialogDescription>{`Detalle de ${entity}`}</DialogDescription>
        </DialogHeader>

        {data && (
          <div className="flex flex-col gap-6 px-4">
            {keys.map(({ label, key, enumOptions }) => (
              <div
                key={(entity + key) as string}
                className="grid gap-2 divide-y"
              >
                <p className="">{getValue(data, key, enumOptions)}</p>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        )}
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
