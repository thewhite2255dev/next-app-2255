"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Languages } from "lucide-react";
import useChangeLanguage from "@/hooks/use-change-language";

interface LanguageSwitcherProps {
  size?: "icon" | "sm" | "default" | "lg";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function LanguageSwitcher({
  size = "icon",
  variant = "ghost",
}: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const changeLanguage = useChangeLanguage();
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="h-8 w-8">
          <Languages />
          {size !== "icon" && (
            <>
              <span>
                {locale === "fr"
                  ? t("options.fr.label")
                  : t("options.fr.label")}
              </span>
              <ChevronDown />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => changeLanguage("fr")}>
          <span className="mr-auto">{t("options.fr.label")}</span>
          {locale === "fr" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <span className="mr-auto">{t("options.en.label")}</span>
          {locale === "en" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
