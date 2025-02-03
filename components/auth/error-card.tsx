"use client";

import { useTranslations } from "next-intl";
import FormError from "../form-error";
import CardWrapper from "./card-wrapper";

export default function ErrorCard() {
  const t = useTranslations("errorCard");

  return (
    <CardWrapper
      headerTitle={t("header.title")}
      backButtonLabel={t("backButtonLabel")}
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        <FormError message={t("genericError")} />
      </div>
    </CardWrapper>
  );
}
