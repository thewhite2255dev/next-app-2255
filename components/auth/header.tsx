"use client";

import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  label?: string;
}

export default function Header({ title, label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col text-center">
      <h1 className={cn("text-2xl font-semibold leading-none tracking-tight")}>
        {title}
      </h1>
      {label && <p className="mt-2 text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
