"use client"

import * as React from "react"
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { useSession } from "next-auth/react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Accounts",
    url: "#",
    icon: ListIcon,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChartIcon,
  },
  {
    title: "Competitions",
    url: "#",
    icon: FolderIcon,
  },
  {
    title: "Payout",
    url: "#",
    icon: UsersIcon,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "/Settings",
    icon: SettingsIcon,
  },
  {
    title: "Get Help",
    url: "#",
    icon: HelpCircleIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: SearchIcon,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session,  } = useSession()

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "Not logged in",
    avatar: session?.user?.image || "/avatars/shadcn.jpg", // Fallback image
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">PropTradX Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
