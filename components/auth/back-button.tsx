"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface backButtonProps {
  label: string;
  href: string;
}

export default function BackButton({ label, href }: backButtonProps) {
  return (
    <Button variant="link" className="font-normal" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
}
