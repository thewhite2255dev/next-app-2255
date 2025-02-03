"use client";

import { useTranslations } from "next-intl";
import { Input } from "./ui/input";
import { useQueryState } from "nuqs";
import { Button } from "./ui/button";
import { Search, X } from "lucide-react";

export default function SearchInput() {
  const t = useTranslations("searchInput");

  const [query, setQuery] = useQueryState("query");

  return (
    <div className="relative">
      <Input
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("placeholder")}
        className="w-64 px-9"
      />
      <Button
        size="icon"
        variant="ghost"
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center"
      >
        <Search />
        <span className="sr-only">{t("actions.search")}</span>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setQuery(null)}
        className="absolute inset-y-0 right-0 flex items-center justify-center hover:bg-transparent"
      >
        <X />
        <span className="sr-only">{t("actions.clear")}</span>
      </Button>
    </div>
  );
}
