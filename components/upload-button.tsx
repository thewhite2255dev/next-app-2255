import { useResources } from "@/hooks/use-resources";
import { CloudinaryResource } from "@/types/cloudinary.types";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

interface UploadButtonProps {
  children: React.ReactNode;
}

export default function UploadButton({ children }: UploadButtonProps) {
  const { addResources } = useResources({
    disableFetch: true,
    tag: process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG,
  });

  const handleUpload = (results: CloudinaryUploadWidgetResults) => {
    addResources([results.info as CloudinaryResource]);
  };

  return (
    <CldUploadWidget
      options={{
        multiple: true,
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
