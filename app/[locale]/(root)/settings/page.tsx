import Header from "@/components/settings/header";
import ProfileForm from "@/components/settings/profile-form";
import { currentUser } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("settingsProfilePage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("settingsProfilePage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default async function SettingsProfilePage() {
  const t = await getTranslations("settingsProfilePage");

  const user = await currentUser();

  return (
    <div className="space-y-6">
      <Header title={t("header.title")} label={t("header.label")} />
      <ProfileForm user={user} />
    </div>
  );
}
