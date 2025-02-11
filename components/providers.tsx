import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/toaster";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ToastProvider } from "./ui/toast";

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <NuqsAdapter>
          <ToastProvider>{children}</ToastProvider>
        </NuqsAdapter>
        <Toaster />
      </NextThemesProvider>
    </SessionProvider>
  );
}
