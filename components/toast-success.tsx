import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface ToastSuccessProps extends React.HTMLAttributes<HTMLElement> {
  message?: string;
}

export default function ToastSuccess({
  message,
  className,
  ...props
}: ToastSuccessProps) {
  if (!message) return null;

  return (
    <div
      className={cn("flex items-center space-x-2 text-success", className)}
      {...props}
    >
      <CircleCheck className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
