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

  const techKeys = [
    "nextjs",
    "tailwindCSS",
    "prisma",
    "postgresql",
    "shadcn",
    "lucideReact",
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        {user ? (
          <>
            <h1 className="mb-4 text-3xl font-bold">
              {t("header.titles.welcomeBack", { name: user.name })}
            </h1>
            <p className="mb-6 text-lg">{t("header.subTitle.welcomeBack")}</p>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-4xl font-bold">
              {t("header.titles.welcome", { siteTitle: SiteConfig.title })}
            </h1>
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
            {techKeys.map((key) => (
              <li key={key}>
                <strong>{t(`card.content.ul.li.${key}.title`)}</strong>
                {t(`card.content.ul.li.${key}.description`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg">{t("card.content.p2")}</p>
        </CardContent>
      </Card>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        <p>
          <span>
            {t("footer.copyright", {
              dateYears: new Date().getFullYear(),
              siteTitle: SiteConfig.title,
            })}
          </span>{" "}
          <span>
            {t("footer.creator", { creatorName: SiteConfig.author.name })}
          </span>
        </p>
        <p>
          {t("footer.github")}{" "}
          <Link
            href={SiteConfig.author.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline underline-offset-2"
          >
            GitHub
          </Link>
        </p>
      </div>
    </div>
  );
}
