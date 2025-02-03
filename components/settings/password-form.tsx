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
import { useState, useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { updatePassword } from "@/actions/settings/update-password";
import { PasswordFormValues } from "@/types/settings.types";
import { PasswordFormSchema } from "@/schemas/settings.schema";
import ToastError from "../toast-error";
import ToastSuccess from "../toast-success";
import { useTranslations } from "next-intl";

export default function PasswordForm() {
  const t = useTranslations();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordFormSchema(t)),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };

  const handleSubmitPassword = (values: PasswordFormValues) => {
    startTransition(() => {
      updatePassword(values).then((data) => {
        if (data?.error) {
          toast({
            description: <ToastError message={data?.error} />,
          });
        }

        if (data?.success) {
          toast({
            description: <ToastSuccess message={data?.success} />,
          });
        }
      });
    });
  };

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {" "}
                  {t("passwordForm.fields.password.label")}
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
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("passwordForm.fields.newPassword.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showNewPassword ? "text" : "password"}
                      disabled={isPending}
                      className="pr-10"
                    />
                    {form.getValues().newPassword !== "" && (
                      <div className="absolute inset-y-0 right-0 flex items-center justify-center p-3">
                        <Button
                          variant={null}
                          type="button"
                          onClick={toggleShowNewPassword}
                          className="cursor-pointer px-0 font-normal"
                        >
                          {showNewPassword ? (
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
          <Button
            disabled={isPending}
            type="button"
            onClick={() => form.handleSubmit(handleSubmitPassword)()}
          >
            {t("passwordForm.submitButton")}
          </Button>
        </div>
      </div>
    </Form>
  );
}
