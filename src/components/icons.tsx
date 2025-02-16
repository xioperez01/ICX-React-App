import {
  Eye,
  Loader2,
  LogIn,
  LucideProps,
  Pencil,
  Trash,
  User,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icons = {
  spinner: (props: LucideProps) => (
    <Loader2 className="animate-spin" {...props} />
  ),
  user: User,
  access: LogIn,
  edit: Pencil,
  delete: Trash,
  view: Eye,
};
