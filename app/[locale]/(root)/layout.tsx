import AppFooter from "@/components/app-footer";
import AppNavbar from "@/components/app-navbar";
import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <AppNavbar />
        <div className="flex-1 overflow-auto px-4 py-6">{children}</div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
