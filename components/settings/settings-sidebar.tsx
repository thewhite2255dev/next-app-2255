"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { LucideIcon } from "lucide-react";
import { useLocale } from "next-intl";

interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    label: string;
    icon: LucideIcon;
  }[];
}

export default function SettingsSidebar({
  className,
  items,
  ...props
}: SettingsSidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <aside className="w-full md:w-1/5">
      <nav className={cn("flex flex-col space-y-1", className)} {...props}>
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === `/${locale}${item.href}`
                ? "bg-muted"
                : "text-muted-foreground",
              "justify-start pl-0",
            )}
          >
            <span
              className={cn(
                "h-full w-1 rounded-full",
                pathname === `/${locale}${item.href}`
                  ? "bg-info"
                  : "bg-transparent",
              )}
            ></span>
            <item.icon />
            <div className="grid">
              <span className="truncate text-sm">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
