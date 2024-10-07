import { Link, type LinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MyLink({ to, className, children, ...props }: LinkProps) {
  return (
    <Link
      to={to}
      className={cn("text-white hover:underline active:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
