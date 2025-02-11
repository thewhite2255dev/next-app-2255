import OnboardingForm from "@/components/auth/onboarding-form";
import { currentUser } from "@/lib/auth";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("onboardingPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("onboardingPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default async function OnboardingPage() {
  const user = await currentUser();

  return <OnboardingForm user={user} />;
}
