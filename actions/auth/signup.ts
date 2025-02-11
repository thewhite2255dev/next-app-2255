"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { getUserByEmail, getUserByUsername } from "@/data/auth/user";
import { generateVerificationToken } from "@/data/auth/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { SignupFormValues } from "@/types/auth";
import { SignupSchema } from "@/schemas/auth";
import { getTranslations } from "next-intl/server";

export const signup = async (values: SignupFormValues) => {
  const t = await getTranslations();

  const validateFields = SignupSchema(t).safeParse(values);

  if (!validateFields.success) {
    return { error: t("zod.common.messages.missingToken") };
  }

  const { email, password, username } = validateFields.data;

  if (username) {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return { error: t("zod.common.messages.usernameFound") };
    }
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    values.password = hashedPassword;
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: t("zod.common.messages.emailFound") };
  }

  const normalizedEmail = email.toLowerCase();

  try {
    await prisma.user.create({
      data: {
        ...values,
        email: normalizedEmail,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: t("common.messages.generic") };
  }

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: t("zod.common.messages.confirmationEmailSent") };
};
