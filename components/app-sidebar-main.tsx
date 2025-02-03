"use client";

import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./ui/collapsible";

interface AppSidebarMainProps {
  sidebarMainItems: {
    icon: LucideIcon;
    label: string;
    href: string;
    isCollapsed?: boolean;
    items?: {
      label: string;
      href: string;
    }[];
  }[];
}

export default function AppSidebarMain({
  sidebarMainItems,
}: AppSidebarMainProps) {
  const { toggleSidebar, isMobile } = useSidebar();

  const handleCustomToggleSidebar = () => {
    if (isMobile) {
      return toggleSidebar();
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        {sidebarMainItems.map((item) =>
          item.items?.length ? (
            <SidebarMenu key={item.label}>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <Link href={item.href} onClick={handleCustomToggleSidebar}>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </Link>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.label}>
                          <Link
                            href={item.href}
                            onClick={handleCustomToggleSidebar}
                          >
                            <SidebarMenuButton>{item.label}</SidebarMenuButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ) : (
            <SidebarMenu key={item.label}>
              <SidebarMenuItem>
                <Link href={item.href} onClick={handleCustomToggleSidebar}>
                  <SidebarMenuButton tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          ),
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
