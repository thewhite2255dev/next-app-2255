import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

interface ToastErrorProps extends React.HTMLAttributes<HTMLElement> {
  message?: string;
}

export default function ToastError({
  message,
  className,
  ...props
}: ToastErrorProps) {
  if (!message) return null;

  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <Info className="h-6 w-6 fill-destructive text-background" />
      <span>{message}</span>
    </div>
  );
}
