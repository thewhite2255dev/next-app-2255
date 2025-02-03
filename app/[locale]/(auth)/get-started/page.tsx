import GetStartedForm from "@/components/auth/get-started-form";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Get started - ${SiteConfig.title}`,
};

export default function GetStartedPage() {
  return <GetStartedForm />;
}
