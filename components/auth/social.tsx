"use client";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export const socialButtons = [
  {
    name: "google",
    provider: "google",
    icon: "/google.svg",
    label: "Google",
  },
  {
    name: "github",
    provider: "github",
    icon: "/github.svg",
    label: "GitHub",
  },
];

export default function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callback_url") || undefined;
  const handleClick = (provider: string) => {
    signIn(provider, {
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full space-x-3">
      {socialButtons.map((item) => (
        <Button
          key={item.name}
          className="w-full space-x-2"
          variant="outline"
          onClick={() => handleClick(item.provider)}
        >
          <Image src={item.icon} width={20} height={20} alt="social icon" />
          <span>{item.label}</span>
        </Button>
      ))}
    </div>
  );
}
