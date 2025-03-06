"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

export default function useChangeLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changeLanguage = (newLocale: string) => {
    const params = new URLSearchParams(searchParams);
    const newPath = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
    router.push(`${newPath}?${params.toString()}`);
  };

  return changeLanguage;
}
