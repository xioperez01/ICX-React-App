import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "@/components/auth/login-form";

export const Route = createFileRoute("/(auth)/_layout/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-60 container">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Bienvenido!</CardTitle>
          <CardDescription>
            Introduce tu dirección de correo electrónico para acceder a tu
            cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
