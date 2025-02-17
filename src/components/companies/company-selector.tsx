import { useCompaniesListSelector } from "@/hooks/companies";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectorType } from "@/schemas/shared";

export default function CompanySelector({
  name,
  value,
  onValueChange,
}: {
  name: string;
  value: string;
  onValueChange: (value: SelectorType) => void;
}) {
  const { data } = useCompaniesListSelector();

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
        <SelectValue placeholder="Ej. Compañía A" />
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
