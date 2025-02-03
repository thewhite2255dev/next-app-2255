"use client";

import { Separator } from "../ui/separator";

interface HeaderProps {
  title: string;
  label: string;
}

export default function Header({ title, label }: HeaderProps) {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <Separator />
    </div>
  );
}
