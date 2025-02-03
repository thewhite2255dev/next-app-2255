"use server";

import { getUserByEmail } from "@/data/auth/user";
import { generateTwoFactorToken } from "@/data/auth/tokens";
import { sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTranslations } from "next-intl/server";

export const resendCode = async (email: string) => {
  const t = await getTranslations();

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: t("zod.common.messages.emailNotFound") };
    }

    if (!existingUser.isTwoFactorEnabled) {
      return { error: t("zod.common.messages.emailTwoFactorNotEnabled") };
    }

    const twoFactorToken = await generateTwoFactorToken(existingUser.email);

    await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

    return { success: t("zod.common.messages.twoFactorCodeSent") };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: t("common.messages.generic") };
  }
};
