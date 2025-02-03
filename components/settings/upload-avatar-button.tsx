"use client";

import { CloudinaryResource } from "@/types/cloudinary.types";
import { useSession } from "next-auth/react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import ToastSuccess from "../toast-success";
import { toast } from "@/hooks/use-toast";
import { updateAvatar } from "@/actions/settings/update-avatar";

interface UploadButtonProps {
  children: React.ReactNode;
}

export default function UploadButton({ children }: UploadButtonProps) {
  const { update } = useSession();

  const handleUpload = (results: CloudinaryUploadWidgetResults) => {
    updateAvatar(results.info as CloudinaryResource).then((data) => {
      if (data?.success) {
        update();
        toast({
          description: <ToastSuccess message={data?.success} />,
        });
      }
    });
  };

  return (
    <CldUploadWidget
      options={{
        autoMinimize: true,
        tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      }}
      onSuccess={(result) => handleUpload(result)}
      signatureEndpoint="/api/sign-cloudinary-image"
    >
      {({ open }) => {
        return (
          <span className="cursor-pointer" onClick={() => open()}>
            {children}
          </span>
        );
      }}
    </CldUploadWidget>
  );
}
