"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import AppSidebarMain from "./app-sidebar-main";
import { Home } from "lucide-react";
import NavUser from "./nav-user";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";

export default function AppSidebar() {
  const t = useTranslations("appSidebar");

  const sidebarMainItems = [
    {
      icon: Home,
      label: t("items.accueil"),
      href: "/",
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="px-0 hover:bg-transparent"
              size="lg"
              asChild
            >
              <Link href="https://github.com/Thewhite2255dev">
                <div className="relative flex aspect-square h-8 w-8 items-center justify-center">
                  <Image
                    src="/favicon.ico"
                    className="rounded-full object-cover"
                    fill
                    alt=""
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {SiteConfig.title}
                  </span>
                  <span className="truncate text-xs">by Thewhite2255 Dev</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMain sidebarMainItems={sidebarMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
