import {
  Boxes,
  Building2,
  LayoutDashboard,
  Rocket,
  Shield,
  Users,
} from "lucide-react";

export const mainNav = [
  {
    title: "Dash",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Compañías",
    href: "/companies",
    icon: Building2,
  },
  {
    title: "Proyectos",
    href: "/projects",
    icon: Boxes,
  },
  {
    title: "Actividades",
    href: "/activities",
    icon: Rocket,
  },
  {
    title: "Equipos",
    href: "/teams",
    icon: Shield,
  },
  {
    title: "Usuarios",
    href: "/users",
    icon: Users,
  },
];
