import * as z from "zod";

export const LoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("zod.messages.email"),
    }),
    password: z.string().min(1, {
      message: t("zod.messages.password"),
    }),
    code: z.optional(z.string()),
  });

export const SignupSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("zod.messages.email"),
    }),
    password: z.string().min(6, {
      message: t("zod.messages.passwordMin"),
    }),
    name: z
      .string()
      .min(2, {
        message: t("zod.messages.nameMin2"),
      })
      .max(50, {
        message: t("zod.messages.nameMax"),
      }),
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
        t("zod.messages.usernameRegex"),
      ),
  });

export const OnboardingFormSchema = (t: (key: string) => string) =>
  z.object({
    password: z.string().min(6, {
      message: t("zod.messages.passwordMin"),
    }),
    name: z
      .string()
      .min(1, {
        message: t("zod.messages.nameMin"),
      })
      .max(50, {
        message: t("zod.messages.nameMax"),
      }),
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
        t("zod.messages.usernameRegex"),
      ),
  });

export const NewPasswordSchema = (t: (key: string) => string) =>
  z.object({
    password: z.string().min(6, {
      message: t("zod.messages.passwordMin"),
    }),
  });

export const ForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("zod.messages.email"),
    }),
  });
