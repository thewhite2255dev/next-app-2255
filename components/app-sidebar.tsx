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
import { GalleryVerticalEnd, Home } from "lucide-react";
import NavUser from "./nav-user";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteConfig } from "@/lib/site-config";

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
                <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="h-4 w-4" />
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
