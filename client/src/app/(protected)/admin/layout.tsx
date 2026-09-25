import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Layout({children} : {children:React.ReactNode}) {
  
  const session = await getServerSession();
  
    if (!session.data) {
      redirect("/login");
    }
  
    if (session.data.user.role !== "ADMIN") {
      redirect("/");
    }
  
  return (
    <div>
      <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  )
}
