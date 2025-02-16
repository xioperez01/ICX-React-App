import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { LoginRequestType, loginRequestSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLoginWithPassword } from "@/hooks/auth";
import { Callout } from "@/components/Callout";
import { InputText } from "@/components/ui/input-text";

import { Icons } from "@/components/icons";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestType>({
    resolver: zodResolver(loginRequestSchema),
  });

  const login = useLoginWithPassword();

  const onSubmit = async (data: LoginRequestType) => {
    return login.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {errors.email && <InputText>{errors.email.message}</InputText>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            required
          />
          {errors.password && <InputText>{errors.password.message}</InputText>}
        </div>
        {login.error && (
          <Callout variant="error" title="Ocurrio un error">
            {login.error.message}
          </Callout>
        )}
        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending && <Icons.spinner />}
          Iniciar sesión
        </Button>
        <Button variant="outline" className="w-full" disabled>
          Iniciar sesión con Google
        </Button>
      </div>
    </form>
  );
}
