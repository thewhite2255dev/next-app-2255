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
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <CircleCheck className="h-6 w-6 fill-success text-background" />
      <span>{message}</span>
    </div>
  );
}
