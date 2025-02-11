import * as z from "zod";
import {
  ForgotPasswordSchema,
  OnboardingFormSchema,
  LoginSchema,
  NewPasswordSchema,
  SignupSchema,
} from "@/schemas/auth";

export type LoginFormValues = z.infer<ReturnType<typeof LoginSchema>>;
export type SignupFormValues = z.infer<ReturnType<typeof SignupSchema>>;
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof ForgotPasswordSchema>
>;
export type NewPasswordFormValues = z.infer<
  ReturnType<typeof NewPasswordSchema>
>;
export type OnboardingFormValues = z.infer<
  ReturnType<typeof OnboardingFormSchema>
>;
