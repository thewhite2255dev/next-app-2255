"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "@/components/auth/header";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

interface CardWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  headerLabel?: string;
  headerTitle: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export default function CardWrapper({
  children,
  headerLabel,
  headerTitle,
  backButtonLabel,
  className,
}: CardWrapperProps) {
  return (
    <Card className={cn("w-[425px] shadow-md", className)}>
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button
          variant="link"
          className="font-normal"
          size="sm"
          onClick={() => signOut({ redirectTo: "/auth/login" })}
        >
          {backButtonLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}
