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

import TeamSelector from "@/components/teams/team-selector";
import { createUserSchema, CreateUserType } from "@/schemas/users";
import { useCreateUser } from "@/hooks/users";

export default function NewUserModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
  });

  const mutate = useCreateUser({
    onSuccess: () => {
      setIsOpen(false);
      reset();
    },
  });

  const onSubmit = async (data: CreateUserType) => {
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
          Agregar Usuario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar usuario</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                {...register("firstName")}
                id="name"
                type="text"
                placeholder="Angie"
                required
              />
              {errors.firstName && (
                <InputText>{errors.firstName.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Apellido</Label>
              <Input
                {...register("lastName")}
                id="description"
                type="text"
                placeholder="Perez"
                required
              />
              {errors.lastName && (
                <InputText>{errors.lastName.message}</InputText>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Equipo</Label>
              <TeamSelector
                name="team"
                value={getValues("team.id")}
                onValueChange={(value) => setValue("team", value)}
              />
              {errors.team && <InputText>{errors.team.message}</InputText>}
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
