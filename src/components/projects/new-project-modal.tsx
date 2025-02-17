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

import { Label } from "@/components/ui/label";
import { InputText } from "@/components/ui/input-text";
import { Icons } from "@/components/icons";

import { Plus } from "lucide-react";
import { useCreateProject } from "@/hooks/projects";
import { createProjectSchema, CreateProjectType } from "@/schemas/projects";
import CompanySelector from "../companies/company-selector";

export default function NewProjectModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectType>({
    resolver: zodResolver(createProjectSchema),
  });

  const mutate = useCreateProject({
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = async (data: CreateProjectType) => {
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
          Agregar Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar proyecto</DialogTitle>
          <DialogDescription>
            Agrea un nuevo proyecto a la lista
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
                placeholder="Ej. Nuevo proyecto"
                required
              />
              {errors.name && <InputText>{errors.name.message}</InputText>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Descripción</Label>
              <Input
                {...register("description")}
                id="description"
                type="text"
                placeholder="Ej. Descripción del nuevo proyecto..."
                required
              />
              {errors.description && (
                <InputText>{errors.description.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Compañía</Label>
              <CompanySelector
                name="company"
                value={getValues("company.id")}
                onValueChange={(value) => setValue("company", value)}
              />
              {errors.company && (
                <InputText>{errors.company.message}</InputText>
              )}
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
