"use client";

import { newVerification } from "@/actions/auth/new-verification";
import CardWrapper from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useTranslations } from "next-intl";

export default function NewVerificationForm() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError(t("zod.common.messages.missingToken"));
      return;
    }

    newVerification(token).then((data) => {
      if (data?.error) {
        setError(data?.error);
      }

      if (data?.success) {
        setSuccess(data?.success);
      }
    });
  }, [token, success, error, t]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <CardWrapper
      headerTitle={t("newVerificationForm.header.title")}
      backButtonLabel={t("newVerificationForm.backButtonLabel")}
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
