"use client";

import {
  Check,
  ChevronsUpDown,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoutButton from "./auth/logout-button";
import Link from "next/link";
import useCurrentUser from "@/hooks/use-current-user";
import { useLocale, useTranslations } from "next-intl";
import LoginButton from "./auth/login-button";
import { generateAvatarFallback } from "@/lib/utils";
import { useTheme } from "next-themes";
import useChangeLanguage from "@/hooks/use-change-language";

export default function NavUser() {
  const { isMobile, toggleSidebar } = useSidebar();
  const user = useCurrentUser();
  const t = useTranslations("navUser");
  const { theme, setTheme } = useTheme();
  const changeLanguage = useChangeLanguage();
  const locale = useLocale();

  const avatarFallback = generateAvatarFallback(user?.name as string);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    src={user?.image}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-full">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage
                      src={user?.image}
                      alt={user?.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-full">
                      {avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link
                  href="/settings"
                  onClick={() => isMobile && toggleSidebar()}
                >
                  <DropdownMenuItem>
                    <Settings /> <span>{t("items.settings")}</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-sm font-medium text-muted-foreground">
                  <span>{t("items.preferences.title")}</span>
                </DropdownMenuLabel>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>{t("items.preferences.theme.label")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-40">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <div className="mr-auto flex items-center space-x-2">
                        <Sun className="h-4 w-4" />
                        <span>{t("items.preferences.theme.lightMode")}</span>
                      </div>
                      {theme === "light" && <Check />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <div className="mr-auto flex items-center space-x-2">
                        <Moon className="h-4 w-4" />
                        <span>{t("items.preferences.theme.darkMode")}</span>
                      </div>
                      {theme === "dark" && <Check />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <div className="mr-auto flex items-center space-x-2">
                        <Monitor className="h-4 w-4" />
                        <span>{t("items.preferences.theme.systemMode")}</span>
                      </div>
                      {theme === "system" && <Check />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <span>{t("items.preferences.language.label")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-40">
                    <DropdownMenuItem onClick={() => changeLanguage("fr")}>
                      <span className="mr-auto">
                        {t("items.preferences.language.fr.label")}
                      </span>
                      {locale === "fr" && <Check />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => changeLanguage("en")}>
                      <span className="mr-auto">
                        {t("items.preferences.language.en.label")}
                      </span>
                      {locale === "en" && <Check />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <LogoutButton>
                <DropdownMenuItem>
                  <LogOut /> <span>{t("items.logOut")}</span>
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <LogIn />
              <span>{t("items.logIn")}</span>
            </SidebarMenuButton>
          </LoginButton>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
