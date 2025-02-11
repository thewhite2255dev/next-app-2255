"use server";

import { getUserById, getUserByUsername } from "@/data/auth/user";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { OnboardingFormSchema } from "@/schemas/auth";
import { getTranslations } from "next-intl/server";
import { OnboardingFormValues } from "@/types/auth";

export const updateProfileConfig = async (values: OnboardingFormValues) => {
  const t = await getTranslations();
  const user = await currentUser();

  if (!user) {
    return { error: t("common.messages.notAuthorized") };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: t("common.messages.notAuthorized") };
  }

  const validateFields = OnboardingFormSchema(t).safeParse(values);

  if (!validateFields.success) {
    return { error: t("zod.common.messages.invalidFields") };
  }

  const { username, password } = validateFields.data;

  if (username && username !== dbUser.username) {
    const existingUser = await getUserByUsername(username);

    if (existingUser) {
      return { error: t("zod.common.messages.usernameFound") };
    }
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    values.password = hashedPassword;
  }

  try {
    await prisma.user.update({
      where: {
        id: dbUser.id,
      },
      data: { ...values },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { error: t("common.messages.generic") };
  }

  revalidatePath("/");

  return { success: t("zod.common.messages.profileCompleted") };
};
