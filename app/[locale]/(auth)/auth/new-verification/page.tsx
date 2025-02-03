import NewVerificationForm from "@/components/auth/new-verification-form";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("newVerificationPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("newVerificationPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function NewVerificationPage() {
  return <NewVerificationForm />;
}
