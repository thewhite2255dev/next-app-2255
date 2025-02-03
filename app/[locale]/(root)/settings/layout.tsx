"use client";

import SettingsSidebar from "@/components/settings/settings-sidebar";
import { Separator } from "@/components/ui/separator";
import { Settings, Lock, Paintbrush, User } from "lucide-react";
import { useTranslations } from "next-intl";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const t = useTranslations("settingsLayout");

  const settingsSidebarItems = [
    {
      label: t("profile"),
      href: "/settings",
      icon: User,
    },
    {
      label: t("account"),
      href: "/settings/account",
      icon: Settings,
    },
    {
      label: t("security"),
      href: "/settings/security",
      icon: Lock,
    },
    {
      label: t("appearance"),
      href: "/settings/appearance",
      icon: Paintbrush,
    },
  ];

  return (
    <div>
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("header.title")}
          </h2>
          <p className="text-muted-foreground">{t("header.description")}</p>
        </div>
        <Separator />
      </div>
      <div className="flex flex-col gap-4 py-4 md:flex-row">
        <SettingsSidebar items={settingsSidebarItems} />
        <main className="lg:w-2/3">{children}</main>
      </div>
    </div>
  );
}
