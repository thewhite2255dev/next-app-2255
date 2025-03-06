"use client";

import * as React from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export default function ThemeSwitcher() {
  const t = useTranslations("themeSwitcher");
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <div className="mr-auto flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <span>{t("options.lightMode")}</span>
          </div>
          {theme === "light" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <div className="mr-auto flex items-center space-x-2">
            <Moon className="h-4 w-4" />
            <span>{t("options.darkMode")}</span>
          </div>
          {theme === "dark" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <div className="mr-auto flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span>{t("options.systemMode")}</span>
          </div>
          {theme === "system" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
