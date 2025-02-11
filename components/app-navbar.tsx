"use client";

import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import LanguageSwitcher from "./language-switcher";
import ThemeSwitcher from "./theme-switcher";

export default function AppNavbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 w-full">
      <nav className="flex items-center justify-between border-b p-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleSidebar}
          >
            <PanelLeft />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
