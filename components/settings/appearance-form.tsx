"use client";

import { useTheme } from "next-themes";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useChangeLanguage from "@/hooks/use-change-language";
import { useRouter } from "next/navigation";

export default function AppearanceForm() {
  const t = useTranslations("appearanceForm");
  const { theme, setTheme } = useTheme();
  const changeLanguage = useChangeLanguage();
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    changeLanguage(newLocale);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium"> {t("theme.label")}</label>
          <p className="text-[0.8rem] text-sm text-muted-foreground">
            {t("theme.description")}
          </p>
        </div>
        <RadioGroup
          value={theme}
          onValueChange={setTheme}
          className="flex flex-wrap gap-8"
        >
          <div>
            <label className="cursor-pointer text-sm font-medium">
              <RadioGroupItem value="light" className="sr-only" />
              <div
                className={cn(
                  "items-center rounded-md border border-muted p-1 hover:shadow hover:ring-2 hover:ring-info",
                  theme === "light" ? "ring-2 ring-info" : "",
                )}
              >
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                {t("options.lightMode")}
              </span>
            </label>
          </div>
          <div>
            <label className="cursor-pointer text-sm font-medium">
              <RadioGroupItem value="dark" className="sr-only" />
              <div
                className={cn(
                  "items-center rounded-md border border-muted p-1 hover:shadow hover:ring-2 hover:ring-info",
                  theme === "dark" ? "ring-2 ring-info" : "",
                )}
              >
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                {t("options.darkMode")}
              </span>
            </label>
          </div>
          <div>
            <label className="cursor-pointer text-sm font-medium">
              <RadioGroupItem value="system" className="sr-only" />
              <div
                className={cn(
                  "items-center rounded-md border border-muted p-1 hover:shadow hover:ring-2 hover:ring-info",
                  theme === "system" ? "ring-2 ring-info" : "",
                )}
              >
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                {t("options.systemMode")}
              </span>
            </label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium"> {t("language.label")}</label>
          <p className="text-[0.8rem] text-sm text-muted-foreground">
            {t("language.description")}
          </p>
        </div>
        <Select value={locale} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t(`options.${locale}.label`)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr">{t("language.fr.label")}</SelectItem>
            <SelectItem value="en">{t("language.en.label")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
