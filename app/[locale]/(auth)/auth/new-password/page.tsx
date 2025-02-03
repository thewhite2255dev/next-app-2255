import NewPasswordForm from "@/components/auth/new-password-form";

import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("newPasswordPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("newPasswordPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function NewPasswordPage() {
  return <NewPasswordForm />;
}
