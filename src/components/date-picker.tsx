import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date>(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP", { locale: es })
          ) : (
            <span>{`Ej. ${format(new Date(), "PPP", { locale: es })}`}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={es}
          mode="single"
          selected={date}
          onSelect={(value) => {
            if (value) {
              onChange(value);
              setDate(value);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
