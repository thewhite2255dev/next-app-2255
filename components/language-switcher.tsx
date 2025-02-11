"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Languages } from "lucide-react";

interface LanguageSwitcherProps {
  size?: "icon" | "sm" | "default" | "lg"; // Ajout des tailles possibles
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"; // Ajout des variantes possibles
}

export default function LanguageSwitcher({
  size = "icon",
  variant = "ghost",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("languageSwitcher");

  const changeLanguage = (newLocale: string) => {
    const params = new URLSearchParams(searchParams);
    const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
    router.push(`${newPath}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Languages />
          {size !== "icon" && (
            <>
              <span>
                {locale === "fr" ? t("languages.fr") : t("languages.en")}
              </span>
              <ChevronDown />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("fr")}>
          <span className="flex-1">{t("languages.fr")}</span>
          {locale === "fr" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <span className="flex-1">{t("languages.en")}</span>
          {locale === "en" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
