"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  UsersIcon,
  TagIcon,
  CalendarIcon,
  CommandIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


 const navMain= [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <UsersIcon />,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: <TagIcon />,
    },
    {
      title: "Bookings",
      url: "/admin/bookings",
      icon: <CalendarIcon />,
    },
  ]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const session = authClient.useSession();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const user = {
    name: mounted ? (session.data?.user.name ?? "Admin") : "",
    email: mounted ? (session.data?.user.email ?? "") : "",
    avatar: "",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-lg font-semibold tracking-tighter text-primary">
                  TutorNest
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
