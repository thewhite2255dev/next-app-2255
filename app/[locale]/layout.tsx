import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Providers from "@/components/providers";
import { SiteConfig } from "@/lib/site-config";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  authors: [{ name: SiteConfig.author.name, url: SiteConfig.author.githubUrl }],
  keywords: SiteConfig.keywords,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function LocalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  if (!routing.locales.includes("en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full w-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full w-full antialiased`}
      >
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
