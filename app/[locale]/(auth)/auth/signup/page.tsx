import SignupForm from "@/components/auth/signup-form";
import { SiteConfig } from "@/lib/site-config";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("signupPage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("signupPage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default function SignupPage() {
  return <SignupForm />;
}
