import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectorType } from "@/schemas/shared";

import { useUsersListSelector } from "@/hooks/users";

export default function UserSelector({
  name,
  value,
  onValueChange,
}: {
  name: string;
  value: string;
  onValueChange: (value: SelectorType) => void;
}) {
  const { data } = useUsersListSelector();

  return (
    <Select
      name={name}
      value={value}
      onValueChange={(value) => {
        const selectedValue = data?.find((option) => option.id === value);
        if (selectedValue) onValueChange(selectedValue);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Ej. Angie Perez" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((option: SelectorType) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
