import * as z from "zod";
import {
  ForgotPasswordSchema,
  GetStartedFormSchema,
  LoginSchema,
  NewPasswordSchema,
  SignupSchema,
} from "@/schemas/auth.schema";

export type LoginFormValues = z.infer<ReturnType<typeof LoginSchema>>;
export type SignupFormValues = z.infer<ReturnType<typeof SignupSchema>>;
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof ForgotPasswordSchema>
>;
export type NewPasswordFormValues = z.infer<
  ReturnType<typeof NewPasswordSchema>
>;
export type GetStartedFormValues = z.infer<
  ReturnType<typeof GetStartedFormSchema>
>;
