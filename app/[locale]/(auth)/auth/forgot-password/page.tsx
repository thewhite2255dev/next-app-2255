import ForgotPasswordForm from "@/components/auth/forgot-password-form";

import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("forgotPasswordPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("forgotPasswordPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
