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
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { updateProfileConfig } from "@/actions/auth/update-profile-config";
import { OnboardingFormValues } from "@/types/auth";
import { OnboardingFormSchema } from "@/schemas/auth";
import CardWrapper from "./onboarding-card-wrapper";
import { useTranslations } from "next-intl";
import { ExtendedUser } from "@/next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface OnboardingFormProps {
  user?: ExtendedUser;
}

export default function OnboardingForm({ user }: OnboardingFormProps) {
  const t = useTranslations();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(OnboardingFormSchema(t)),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: OnboardingFormValues) => {
    setError("");

    startTransition(async () => {
      const data = await updateProfileConfig(values);

      if (data?.error) {
        setError(data?.error);
      }

      if (data?.success) {
        await await update();
        router.push(DEFAULT_LOGIN_REDIRECT);
      }
    });
  };

  return (
    <CardWrapper
      headerTitle={t("onboardingForm.header.title")}
      headerLabel={t("onboardingForm.header.label")}
      backButtonLabel={t("onboardingForm.backButtonLabel")}
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
                  <FormLabel>{t("onboardingForm.fields.name.label")}</FormLabel>
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
                  <FormLabel>
                    {t("onboardingForm.fields.username.label")}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isPending} />
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
                  <FormLabel>
                    {t("onboardingForm.fields.password.label")}
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
          <div>
            <Button type="submit" disabled={isPending} className="w-full">
              {t("onboardingForm.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
