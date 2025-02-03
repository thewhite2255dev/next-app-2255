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
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
      >
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <div className="flex flex-1 items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span>{t("options.system")}</span>
          </div>
          {theme === "system" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <div className="flex flex-1 items-center space-x-2">
            <Moon className="h-4 w-4" />
            <span>{t("options.dark")}</span>
          </div>
          {theme === "dark" && <Check />}{" "}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <div className="flex flex-1 items-center space-x-2">
            <Sun className="h-4 w-4" />
            <span>{t("options.light")}</span>
          </div>
          {theme === "light" && <Check />}{" "}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
