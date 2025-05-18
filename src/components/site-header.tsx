// components/SiteHeader.tsx
import { cookies } from "next/headers";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function SiteHeader() {
  const cookieStore = cookies();
  const username = (await cookieStore).get("name")?.value || "Guest";

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Welcome {username}</h1>
        <Link
          href="/Challenge-Form"
          className="ml-auto px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-indigo-600 shadow-md hover:from-emerald-600 hover:to-indigo-700 transition-all duration-300 ease-in-out active:scale-95"
        >
          🚀 Start Challenge
        </Link>
      </div>
    </header>
  );
}
