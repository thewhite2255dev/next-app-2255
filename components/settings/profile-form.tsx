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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Trash2, Upload } from "lucide-react";
import { ExtendedUser } from "@/next-auth";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { updateProfile } from "@/actions/settings/update-profile";
import { ProfileFormValues } from "@/types/settings";
import { ProfileFormSchema } from "@/schemas/settings";
import ToastError from "../toast-error";
import ToastSuccess from "../toast-success";
import UploadAvatarButton from "./upload-avatar-button";
import DeleteAvatarButton from "./delete-avatar-button";
import { useTranslations } from "next-intl";
import { generateAvatarFallback, maskEmail } from "@/lib/utils";

interface ProfileFormProps {
  user?: ExtendedUser;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const t = useTranslations();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const avatarFallback = generateAvatarFallback(user?.name as string);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema(t)),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      location: user?.location || "",
    },
  });

  const handleSubmit = (values: ProfileFormValues) => {
    startTransition(async () => {
      const data = await updateProfile(values);

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
        <div className="mx-auto flex w-full max-w-lg flex-col space-y-6 text-sm">
          <div className="flex items-center justify-center">
            <Avatar className="h-24 w-24 rounded-full shadow">
              <AvatarImage
                src={user?.image}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-full text-2xl">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex gap-2">
            <UploadAvatarButton className="w-1/2">
              <Button type="button" variant="outline" className="w-full">
                <Upload className="h-4 w-4 lg:mr-2" />
                <span className="sr-only sm:not-sr-only">
                  {t("profileForm.fields.avatar.actions.uploadAvatar")}
                </span>
              </Button>
            </UploadAvatarButton>
            <DeleteAvatarButton className="w-1/2">
              <Button type="button" variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 lg:mr-2" />
                <span className="sr-only sm:not-sr-only">
                  {t("profileForm.fields.avatar.actions.removeAvatar")}
                </span>
              </Button>
            </DeleteAvatarButton>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> {t("profileForm.fields.name.label")}</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} />
              </FormControl>
              <FormDescription>
                {t("profileForm.fields.name.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem key={user?.email}>
          <FormLabel>{t("profileForm.fields.email.label")}</FormLabel>
          <FormControl>
            <Input value={maskEmail(user?.email as string)} disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profileForm.fields.bio.label")}</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={3}
                  maxLength={200}
                  disabled={isPending}
                  placeholder={t("profileForm.fields.bio.placeholder")}
                  {...field}
                />
              </FormControl>
              <div className="flex items-center justify-between">
                <FormDescription>
                  {t("profileForm.fields.bio.description")}
                </FormDescription>
                <FormDescription>
                  {form.getValues("bio")?.length} / 200
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("profileForm.fields.location.label")}</FormLabel>
              <FormControl>
                <Input maxLength={100} disabled={isPending} {...field} />
              </FormControl>
              <FormDescription>
                {t("profileForm.fields.location.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {t("profileForm.submitButton")}
        </Button>
      </form>
    </Form>
  );
}
