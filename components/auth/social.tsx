"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

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
  const handleClick = (provider: string) => {
    signIn(provider);
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
