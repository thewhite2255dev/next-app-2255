import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

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
    <div
      className={cn("flex items-center space-x-2 text-destructive", className)}
      {...props}
    >
      <TriangleAlert className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
