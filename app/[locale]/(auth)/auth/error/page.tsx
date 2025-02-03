import ErrorCard from "@/components/auth/error-card";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("errorPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("errorPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function AuthErrorPage() {
  return <ErrorCard />;
}
