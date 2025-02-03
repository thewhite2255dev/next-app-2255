"use client";

import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import ToastError from "../toast-error";
import ToastSuccess from "../toast-success";
import { cn } from "@/lib/utils";
import { deleteAvatar } from "@/actions/settings/delete-avatar";

interface DeleteAvatarButtonProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function DeleteAvatarButton({
  children,
  className,
}: DeleteAvatarButtonProps) {
  const { update } = useSession();

  const handleDelete = async () => {
    deleteAvatar().then((data) => {
      if (data?.error) {
        toast({
          description: <ToastError message={data?.error} />,
        });
      }

      if (data?.success) {
        update();
        toast({
          description: <ToastSuccess message={data?.success} />,
        });
      }
    });
  };

  return (
    <span onClick={handleDelete} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
}
