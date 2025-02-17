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

import { createActivitySchema, CreateActivityType } from "@/schemas/activities";
import { useCreateActivity } from "@/hooks/activities";
import ProjectSelector from "@/components/projects/project-selector";
import ActivityTypeSelector from "@/components/activity-type-selector";
import { DatePicker } from "@/components/date-picker";
import UserSelector from "../users/user-selector";

export default function NewActivityModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateActivityType>({
    resolver: zodResolver(createActivitySchema),
  });

  const mutate = useCreateActivity({
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = async (data: CreateActivityType) => {
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
          Agregar Actividad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar actividad</DialogTitle>
          <DialogDescription>
            Resgistra la actividad realizada
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <ActivityTypeSelector
                name="type"
                value={getValues("type")}
                onValueChange={(value) => setValue("type", value)}
              />
              {errors.type && <InputText>{errors.type.message}</InputText>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Descripción</Label>
              <Input
                {...register("description")}
                id="name"
                type="text"
                placeholder="Ej. Desarrollo de herramientas internas..."
                required
              />
              {errors.description && (
                <InputText>{errors.description.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Duración</Label>
              <Input
                {...register("duration", {
                  setValueAs: (value) =>
                    value === "" ? undefined : parseFloat(value),
                })}
                id="duration"
                type="number"
                placeholder="Ej. 35 (minutos)"
                required
                step="any"
              />
              {errors.description && (
                <InputText>{errors.description.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user">Fecha</Label>
              <DatePicker
                value={getValues("date")}
                onChange={(value) => setValue("date", value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user">Proyecto</Label>
              <ProjectSelector
                name="project"
                value={getValues("project.id")}
                onValueChange={(value) => setValue("project", value)}
              />
              {errors.project && (
                <InputText>{errors.project.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="user">Usuario</Label>
              <UserSelector
                name="user"
                value={getValues("user.id")}
                onValueChange={(value) => setValue("user", value)}
              />
              {errors.user && <InputText>{errors.user.message}</InputText>}
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
