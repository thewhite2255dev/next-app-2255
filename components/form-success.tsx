import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface FormSuccessProps extends React.HTMLAttributes<HTMLElement> {
  message?: string;
}

export default function FormSuccess({
  message,
  className,
  ...props
}: FormSuccessProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        "flex min-h-9 items-center space-x-2 rounded-md bg-success px-3 py-1 text-sm text-success-foreground",
        className,
      )}
      {...props}
    >
      <CircleCheck className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
