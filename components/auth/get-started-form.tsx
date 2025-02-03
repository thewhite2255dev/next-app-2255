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
import { useEffect, useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";

import useCurrentUser from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { updateProfileConfig } from "@/actions/auth/update-profile-config";
import { GetStartedFormValues } from "@/types/auth.types";
import { GetStartedFormSchema } from "@/schemas/auth.schema";
import CardWrapper from "./get-started-card-wrapper";
import { useTranslations } from "next-intl";

export default function GetStartedForm() {
  const t = useTranslations();
  const user = useCurrentUser();
  const { update } = useSession();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<GetStartedFormValues>({
    resolver: zodResolver(GetStartedFormSchema(t)),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: GetStartedFormValues) => {
    setError("");

    startTransition(() => {
      updateProfileConfig(values).then((data) => {
        if (data?.error) {
          setError(data?.error);
        }

        if (data?.success) {
          update();
          router.push("/");
        }
      });
    });
  };

  useEffect(() => {
    if (user) {
      if (user.password) {
        router.push("/");
      }
    }
  }, [user, router]);

  return (
    <CardWrapper
      headerTitle={t("getStartedForm.header.title")}
      headerLabel={t("getStartedForm.header.label")}
      backButtonLabel={t("getStartedForm.backButtonLabel")}
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
                  <FormLabel>{t("getStartedForm.fields.name.label")}</FormLabel>
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
                    {t("getStartedForm.fields.username.label")}
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
                    {t("getStartedForm.fields.password.label")}
                  </FormLabel>
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
          <div>
            <Button type="submit" disabled={isPending} className="w-full">
              {t("getStartedForm.submitButton")}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
