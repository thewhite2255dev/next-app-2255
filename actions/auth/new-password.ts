"use server";

import { getUserByEmail } from "@/data/auth/user";
import { getPasswordResetTokenByToken } from "@/data/auth/password-reset-token";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NewPasswordFormValues } from "@/types/auth.types";
import { NewPasswordSchema } from "@/schemas/auth.schema";
import { getTranslations } from "next-intl/server";

export const newPassword = async (
  values: NewPasswordFormValues,
  token?: string | null,
) => {
  const t = await getTranslations();

  if (!token) {
    return { error: t("zod.common.messages.missingToken") };
  }

  const validateFields = NewPasswordSchema(t).safeParse(values);

  if (!validateFields.success) {
    return { error: t("zod.common.messages.invalidFields") };
  }

  const { password } = validateFields.data;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    values.password = hashedPassword;
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: t("zod.common.messages.invalidToken") };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: t("zod.common.messages.tokenExpired") };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: t("zod.common.messages.emailNotFound") };
  }

  try {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },

      data: {
        ...values,
        email: existingToken.email,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: t("common.messages.generic") };
  }

  return { success: t("zod.common.messages.passwordUpdated") };
};
