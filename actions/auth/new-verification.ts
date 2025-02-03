"use server";

import { getUserByEmail } from "@/data/auth/user";
import { getVerificationTokenByToken } from "@/data/auth/verification-token";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export const newVerification = async (token: string) => {
  const t = await getTranslations();

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: t("zod.common.messages.tokenExpired") };
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
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: t("common.messages.generic") };
  }

  return { success: t("zod.common.messages.emailVerified") };
};
