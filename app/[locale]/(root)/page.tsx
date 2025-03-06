import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteConfig } from "@/lib/site-config";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: `${t("homePage.title", { siteTitle: SiteConfig.title })}`,
    description: `${t("homePage.description", { siteTitle: SiteConfig.title })}`,
  };
}

export default async function HomePage() {
  const t = await getTranslations("homePage");
  const user = await currentUser();

  const techLinks = {
    nextjs: "https://nextjs.org/",
    tailwindCSS: "https://tailwindcss.com/",
    prisma: "https://www.prisma.io/",
    postgresql: "https://www.postgresql.org/",
    shadcn: "https://ui.shadcn.com/",
    lucideReact: "https://lucide.dev/",
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        {user ? (
          <>
            <h1 className="mb-2 text-3xl font-bold">
              {t("header.titles.welcomeBack", { name: user.name })}
            </h1>
            <p className="mb-4 text-lg">{t("header.subTitle.welcomeBack")}</p>
          </>
        ) : (
          <>
            <span className="mb-4 text-4xl font-bold">
              {t("header.titles.welcome", { siteTitle: SiteConfig.title })}
            </span>
            <p className="mb-6 text-lg">{t("header.subTitle.welcome")}</p>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {t("card.header.title", { siteTitle: SiteConfig.title })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{t("card.content.p1")}</p>
          <ul className="list-disc pl-6 text-lg">
            {Object.entries(techLinks).map(([key, url]) => (
              <li key={key}>
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info hover:underline hover:underline-offset-2"
                >
                  <strong>{t(`card.content.technologies.${key}.title`)}</strong>
                </Link>
                <span>
                  {" "}
                  {t(`card.content.technologies.${key}.description`)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">{t("card.content.p2")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
