import AppearanceForm from "@/components/settings/appearance-form";
import Header from "@/components/settings/header";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("settingsAppearancePage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("settingsAppearancePage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function SettingsAppearancePage() {
  const t = useTranslations("settingsAppearancePage");

  return (
    <div className="space-y-6">
      <Header title={t("header.title")} label={t("header.label")} />
      <AppearanceForm />
    </div>
  );
}
