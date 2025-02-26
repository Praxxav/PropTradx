"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current route

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ActiveSectionContextProvider>
        {/* ✅ Show Header only if NOT on dashboard pages */}
        {!pathname.startsWith("/dashboard") && <Header />}
        {children}
      </ActiveSectionContextProvider>
    </ThemeProvider>
  );
}
