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
import { newPassword } from "@/actions/auth/new-password";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { NewPasswordFormValues } from "@/types/auth";
import { NewPasswordSchema } from "@/schemas/auth";
import { useTranslations } from "next-intl";

export default function NewPasswordForm() {
  const t = useTranslations();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema(t)),
    defaultValues: {
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: NewPasswordFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await newPassword(values, token);

      if (data?.error) {
        setError(data?.error);
      }

      if (data?.success) {
        setSuccess(data?.success);
      }
    });
  };

  return (
    <CardWrapper
      headerTitle={t("newPasswordForm.header.title")}
      headerLabel={t("newPasswordForm.header.label")}
      backButtonLabel={t("newPasswordForm.backButtonLabel")}
      backButtonHref="/auth/login"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("newPasswordForm.fields.password.label")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        className="pr-10"
                      />
                      {field.value && (
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
              {t("newPasswordForm.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
