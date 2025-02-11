import AccountForm from "@/components/settings/account-form";
import DeleteAccountButton from "@/components/settings/delete-account-button";
import Header from "@/components/settings/header";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("settingsAccountPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("settingsAccountPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default async function SettingsAccountPage() {
  const t = await getTranslations("settingsAccountPage");
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <Header
        title={t("header.titles.account")}
        label={t("header.labels.account")}
      />
      <AccountForm user={user} />
      <div className="space-y-6">
        <Header
          title={t("header.titles.deleteAccount")}
          label={t("header.labels.deleteAccount")}
        />
        <DeleteAccountButton user={user}>
          <Button type="button" variant="destructive">
            {t("deleteAccountButton")}
          </Button>
        </DeleteAccountButton>
      </div>
    </div>
  );
}
