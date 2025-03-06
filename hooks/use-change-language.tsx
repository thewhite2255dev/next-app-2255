"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function useChangeLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLanguage = (newLocale: string) => {
    // Crée une nouvelle instance de URLSearchParams pour manipuler les paramètres de recherche
    const params = new URLSearchParams(searchParams);

    // Supprime le préfixe de la locale actuelle du chemin
    const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;

    // Construit l'URL finale avec les paramètres de recherche
    const url = `${newPath}${params.toString() ? `?${params.toString()}` : ""}`;

    // Navigue vers la nouvelle URL
    router.refresh();
    router.push(url);
  };

  return changeLanguage;
}
