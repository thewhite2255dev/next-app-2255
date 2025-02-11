"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserRole } from "@prisma/client";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { ExtendedUser } from "@/next-auth";
import { updateAccount } from "@/actions/settings/update-account";
import { AccountFormValues } from "@/types/settings";
import { AccountFormSchema } from "@/schemas/settings";
import ToastError from "../toast-error";
import ToastSuccess from "../toast-success";
import { useTranslations } from "next-intl";

interface AccountFormProps {
  user?: ExtendedUser;
}

export default function AccountForm({ user }: AccountFormProps) {
  const t = useTranslations();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(AccountFormSchema(t)),
    defaultValues: {
      role: user?.role || undefined,
      username: user?.username || "",
    },
  });

  const handleSubmit = (values: AccountFormValues) => {
    startTransition(async () => {
      const data = await updateAccount(values);

      if (data?.error) {
        toast({
          description: <ToastError message={data?.error} />,
        });
      }

      if (data?.success) {
        await update();
        toast({
          description: <ToastSuccess message={data?.success} />,
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("accountForm.fields.username.label")}</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder={t("accountForm.fields.username.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {t("accountForm.fields.username.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("accountForm.fields.role.label")}</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("accountForm.fields.role.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.USER}>
                    {t("accountForm.fields.role.enum.user")}
                  </SelectItem>
                  <SelectItem value={UserRole.ADMIN}>
                    {t("accountForm.fields.role.enum.admin")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {t("accountForm.submitButton")}
        </Button>
      </form>
    </Form>
  );
}
