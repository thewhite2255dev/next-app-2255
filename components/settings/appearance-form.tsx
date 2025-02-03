"use client";

import { useTheme } from "next-themes";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function AppearanceForm() {
  const t = useTranslations("appearanceForm");
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium"> {t("header.title")}</label>
        <p className="text-[0.8rem] text-sm text-muted-foreground">
          {t("header.description")}
        </p>
      </div>

      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        className="flex flex-wrap gap-8"
      >
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
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              {t("options.system")}
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
                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-slate-400" />
                  <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              {t("options.dark")}
            </span>
          </label>
        </div>
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
                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                  <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                  <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                </div>
              </div>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              {t("options.light")}
            </span>
          </label>
        </div>
      </RadioGroup>
    </div>
  );
}
