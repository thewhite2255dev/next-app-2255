"use server";

import { getUserByEmail } from "@/data/auth/user";
import { generatePasswordResetToken } from "@/data/auth/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { ForgotPasswordFormValues } from "@/types/auth";
import { ForgotPasswordSchema } from "@/schemas/auth";
import { getTranslations } from "next-intl/server";

export const forgotPassword = async (values: ForgotPasswordFormValues) => {
  const t = await getTranslations();
  const validateFields = ForgotPasswordSchema(t).safeParse(values);

  if (!validateFields.success) {
    return { error: t("zod.common.messages.invalidEmail") };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: t("zod.common.messages.emailNotFound") };
  }

  const passwordToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(passwordToken.email, passwordToken.token);

  return { success: t("zod.common.messages.resetEmailSent") };
};
