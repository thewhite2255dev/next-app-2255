"use client";

import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  label?: string;
}

export default function Header({ title, label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col text-center">
      <h2 className={cn("text-2xl font-semibold leading-none tracking-tight")}>
        {title}
      </h2>
      {label && <p className="mt-2 text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}
