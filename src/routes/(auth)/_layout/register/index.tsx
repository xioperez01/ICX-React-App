import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";

export const Route = createFileRoute("/(auth)/_layout/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-6 container">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Registrate!</CardTitle>
          <CardDescription>Crea un nuevo ususario</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Inicia sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
