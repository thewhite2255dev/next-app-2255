import LoginForm from "@/components/auth/login-form";

import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("loginPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("loginPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
