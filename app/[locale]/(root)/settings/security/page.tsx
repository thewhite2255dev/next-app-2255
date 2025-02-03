import AuthenticationForm from "@/components/settings/authentication-form";
import Header from "@/components/settings/header";
import PasswordForm from "@/components/settings/password-form";
import { currentUser } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("settingsSecurityPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("settingsSecurityPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default async function SettingsSecurityPage() {
  const t = await getTranslations("settingsSecurityPage");

  const user = await currentUser();

  return (
    <div className="space-y-6">
      <Header title={t("header.title")} label={t("header.label")} />
      <PasswordForm />
      <AuthenticationForm user={user} />
    </div>
  );
}
