import { SiteConfig } from "@/lib/site-config";
import { getTranslations } from "next-intl/server";

export default async function AppFooter() {
  const t = await getTranslations("homePage");

  return (
    <footer className="border-t bg-background p-2 text-sm sm:flex-row sm:px-4">
      <div className="text-center text-muted-foreground">
        <span>
          {t("footer.copyright", {
            dateYears: new Date().getFullYear(),
            siteTitle: SiteConfig.title,
            creatorName: SiteConfig.author.name,
          })}
        </span>
      </div>
    </footer>
  );
}
