import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { Callout } from "@/components/Callout";

import { createCompanySchema, CreateCompanyType } from "@/schemas/companies";
import { Label } from "@/components/ui/label";
import { InputText } from "@/components/ui/input-text";
import { Icons } from "@/components/icons";
import { useCreateCompany } from "@/hooks/companies";
import { Plus } from "lucide-react";

export default function NewCompanyModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCompanyType>({
    resolver: zodResolver(createCompanySchema),
  });

  const mutate = useCreateCompany({
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = async (data: CreateCompanyType) => {
    return mutate.mutateAsync({ data });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Agregar compañía
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar compañía</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Nueva compañía"
                required
              />
              {errors.name && <InputText>{errors.name.message}</InputText>}
            </div>

            {mutate.error && (
              <Callout variant="error" title="Ocurrio un error">
                {mutate.error.message}
              </Callout>
            )}
            <DialogFooter>
              <Button type="submit" disabled={mutate.isPending}>
                {mutate.isPending && <Icons.spinner />}
                Crear
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
