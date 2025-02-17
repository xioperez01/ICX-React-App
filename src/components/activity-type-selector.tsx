import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectorType } from "@/schemas/shared";

import { ActivityTypeEnum, ActivityTypeOptions } from "@/schemas/activities";

export default function ActivityTypeSelector({
  name,
  value,
  onValueChange,
}: {
  name: string;
  value: string;
  onValueChange: (value: ActivityTypeEnum) => void;
}) {
  const options = Object.entries(ActivityTypeOptions).map(([key, value]) => ({
    id: key as ActivityTypeEnum,
    name: value,
  }));

  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => {
        const selectedValue = options?.find((option) => option.id === value);
        if (selectedValue) onValueChange(selectedValue.id);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Ej. Diseño" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((option: SelectorType) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
