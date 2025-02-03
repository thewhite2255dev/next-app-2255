"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardWrapper from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { signup } from "@/actions/auth/signup";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { SignupFormValues } from "@/types/auth.types";
import { SignupSchema } from "@/schemas/auth.schema";
import { useTranslations } from "next-intl";

export default function SignupForm() {
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema(t)),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: SignupFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
        }

        if (data?.success) {
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerTitle={t("signupForm.header.title") as string}
      headerLabel={t("signupForm.header.label")}
      backButtonLabel={t("signupForm.backButtonLabel")}
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form
          autoComplete="off"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signupForm.fields.name.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signupForm.fields.username.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signupForm.fields.email.label")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signupForm.fields.password.label")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        className="pr-10"
                      />
                      {form.getValues().password !== "" && (
                        <div className="absolute inset-y-0 right-0 flex items-center justify-center p-3">
                          <Button
                            variant={null}
                            type="button"
                            onClick={toggleShowPassword}
                            className="cursor-pointer px-0 font-normal"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div>
            <Button type="submit" disabled={isPending} className="w-full">
              {t("signupForm.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
