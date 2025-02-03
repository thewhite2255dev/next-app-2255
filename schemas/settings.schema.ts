import { UserRole } from "@prisma/client";
import * as z from "zod";

export const ProfileFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, {
        message: t("zod.messages.nameMin2"),
      })
      .max(50, {
        message: t("zod.messages.nameMax"),
      })
      .optional(),
    email: z.string().email({
      message: t("zod.messages.email"),
    }),
    bio: z.string().max(200, t("zod.messages.bioMax")).optional(),
    location: z.string().max(100, t("zod.messages.locationMax")).optional(),
  });

export const AccountFormSchema = (t: (key: string) => string) =>
  z.object({
    username: z
      .string()
      .min(3, {
        message: t("zod.messages.usernameMin"),
      })
      .max(30, {
        message: t("zod.messages.usernameMax"),
      })
      .regex(
        /^[a-zA-Z0-9](?:[a-zA-Z0-9_-]*[a-zA-Z0-9])?$/,
        t("zod.messages.usernameRegexSpecialChars"),
      ),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  });

export const DeleteAccountSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.string().email({
        message: t("zod.messages.email"),
      }),
      confirmation: z.string().min(1, {
        message: t("zod.messages.confirmationRequired"),
      }),
      password: z.string().min(1, {
        message: t("zod.messages.passwordRequired"),
      }),
    })
    .refine(
      (data) => {
        if (
          data.confirmation !== "delete my account" &&
          data.confirmation !== "supprimer mon compte"
        ) {
          return false;
        }
        return true;
      },
      {
        message: `${t("zod.messages.deleteConfirmation.span1")} ${t("zod.messages.deleteConfirmation.span2")} ${t("zod.messages.deleteConfirmation.span3")}`,
        path: ["confirmation"],
      },
    );

export const PasswordFormSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z.optional(
        z.string().min(1, {
          message: t("zod.messages.currentPasswordRequired"),
        }),
      ),
      newPassword: z.optional(
        z.string().min(6, {
          message: t("zod.messages.newPasswordMin"),
        }),
      ),
    })
    .refine(
      (data) => {
        if (data.password && !data.newPassword) {
          return false;
        }
        return true;
      },
      {
        message: t("zod.messages.newPasswordRequired"),
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.newPassword && !data.password) {
          return false;
        }
        return true;
      },
      {
        message: t("zod.messages.currentPasswordRequired"),
        path: ["password"],
      },
    );

export const AuthenticationFormSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
});
