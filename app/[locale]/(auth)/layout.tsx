import LanguageSwitcher from "@/components/language-switcher";
import ThemeSwitcher from "@/components/theme-switcher";
import { SiteConfig } from "@/lib/site-config";
import { getTranslations } from "next-intl/server";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const t = await getTranslations("authLayout");

  return (
    <div className="flex min-h-screen flex-col bg-muted/50">
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        {children}
      </div>
      <footer className="flex w-full flex-col items-center justify-between border-t bg-background p-2 text-sm sm:flex-row sm:px-4">
        <div className="text-center sm:text-left">
          <span>
            {t("footer.copyright", {
              dateYears: new Date().getFullYear(),
              siteTitle: SiteConfig.title,
            })}
            .{" "}
            {t("footer.creator", {
              creatorName: SiteConfig.author.name,
            })}
          </span>
        </div>
        <div className="mt-2 flex items-center space-x-2 sm:mt-0">
          <LanguageSwitcher size="sm" />
          <ThemeSwitcher />
        </div>
      </footer>
    </div>
  );
}
