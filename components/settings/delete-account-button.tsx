"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { signOut, useSession } from "next-auth/react";
import { DeleteAccountFormValues } from "@/types/settings";
import { DeleteAccountSchema } from "@/schemas/settings";
import { deleteAccount } from "@/actions/settings/delete-account";
import { useTranslations } from "next-intl";
import { maskEmail } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { ExtendedUser } from "@/next-auth";

interface DeleteAccountButtonProps {
  children: React.ReactNode;
  user?: ExtendedUser;
}

export default function DeleteAccountButton({
  children,
  user,
}: DeleteAccountButtonProps) {
  const t = useTranslations();
  const maskedEmail = user && maskEmail(user?.email);
  const { update } = useSession();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isMobile = useIsMobile();

  const form = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(DeleteAccountSchema(t)),
    defaultValues: {
      email: "",
      confirmation: "",
      password: "",
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (values: DeleteAccountFormValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await deleteAccount(values);

      if (data?.error) {
        setError(data?.error);
      }

      if (data?.success) {
        signOut({ redirectTo: "/" });
        await update();
      }
    });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{t("deleteAccountForm.header.title")}</DrawerTitle>
            <DrawerDescription>
              {t("deleteAccountForm.header.description")}
            </DrawerDescription>
          </DrawerHeader>
          <Separator />
          <div className="space-y-4 p-4">
            <FormError message={t("deleteAccountForm.warning")} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
                autoComplete="off"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("deleteAccountForm.fields.email.label.span1")}{" "}
                          <span className="font-semibold">{maskedEmail}</span>{" "}
                          {t("deleteAccountForm.fields.email.label.span2")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "deleteAccountForm.fields.confirmation.label.span1",
                          )}{" "}
                          <span className="font-bold">
                            {t(
                              "deleteAccountForm.fields.confirmation.label.span2",
                            )}
                          </span>{" "}
                          {t(
                            "deleteAccountForm.fields.confirmation.label.span3",
                          )}
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
                          {t("deleteAccountForm.fields.password.label")}
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
                <div className="flex justify-between">
                  <DrawerClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isPending}
                    >
                      {t("deleteAccountForm.buttons.cancel")}
                    </Button>
                  </DrawerClose>
                  <Button type="submit" disabled={isPending}>
                    {t("deleteAccountForm.buttons.submit")}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>
            {t("deleteAccountForm.header.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("deleteAccountForm.header.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="space-y-4">
          <FormError message={t("deleteAccountForm.warning")} />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
              autoComplete="off"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("deleteAccountForm.fields.email.label.span1")}{" "}
                        <span className="font-semibold">{maskedEmail}</span>{" "}
                        {t("deleteAccountForm.fields.email.label.span2")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("deleteAccountForm.fields.confirmation.label.span1")}{" "}
                        <span className="font-bold">
                          {t(
                            "deleteAccountForm.fields.confirmation.label.span2",
                          )}
                        </span>{" "}
                        {t("deleteAccountForm.fields.confirmation.label.span3")}
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
              <div className="flex justify-between">
                <AlertDialogCancel asChild>
                  <Button type="button" variant="outline" disabled={isPending}>
                    {t("deleteAccountForm.buttons.cancel")}
                  </Button>
                </AlertDialogCancel>
                <Button type="submit" disabled={isPending}>
                  {t("deleteAccountForm.buttons.submit")}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
