"use server";

import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/auth/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/data/auth/tokens";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/data/auth/two-factor-confirmation";
import { prisma } from "@/lib/prisma";
import { getTwoFactorTokenByEmail } from "@/data/auth/two-factor-token";
import { LoginFormValues } from "@/types/auth";
import { LoginSchema } from "@/schemas/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export const login = async (values: LoginFormValues, callbackUrl?: string) => {
  const t = await getTranslations();

  const validateFields = LoginSchema(t).safeParse(values);

  if (!validateFields.success) {
    return { error: t("zod.common.messages.missingToken") };
  }

  const { email, password, code } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: t("zod.common.messages.emailNotFound") };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: t("zod.common.messages.confirmationEmailSent") };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      return { error: t("zod.common.messages.invalidCredentials") };
    }

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: t("zod.common.messages.invalidCode") };
      }

      if (twoFactorToken.token !== code) {
        return { error: t("zod.common.messages.invalidCode") };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: t("zod.common.messages.codeExpired") };
      }

      await prisma.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    revalidatePath("/");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: t("zod.common.messages.invalidCredentials") };
        default:
          return { error: t("common.messages.generic") };
      }
    }

    throw error;
  }
};
