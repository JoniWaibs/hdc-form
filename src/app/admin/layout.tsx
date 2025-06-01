import type React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { UserNav } from "@/app/admin/dashboard/components/UserNav";

export const metadata: Metadata = {
  title: "Hablemos de cáncer",
  description: "Dashboard de administración",
};

const sidebarDashboardItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
    disabled: true,
  },
  {
    label: "Recursos",
    href: "/admin/resource/list",
    icon: BookOpen,
    disabled: false,
  },
  {
    label: "Usuarios",
    href: "/admin/users",
    icon: Users,
    disabled: true,
  },
  {
    label: "Calendario",
    href: "/admin/calendar",
    icon: Calendar,
    disabled: true,
  },
];

const sidebarAdminItems = [
  {
    label: "Reportes",
    href: "/admin/reports",
    icon: FileText,
    disabled: true,
  },
  {
    label: "Analíticas",
    href: "/admin/analytics",
    icon: BarChart3,
    disabled: true,
  },
  {
    label: "Pagos",
    href: "/admin/payments",
    icon: CreditCard,
    disabled: true,
  },
  {
    label: "Configuración",
    href: "/admin/settings",
    icon: Settings,
    disabled: true,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarDashboardItems.map((item) => (
                  <SidebarMenuItem
                    key={item.label}
                    className={item.disabled ? "opacity-50" : ""}
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      disabled={item.disabled}
                    >
                      <Link
                        href={item.href}
                        className={
                          item.disabled
                            ? "cursor-not-allowed pointer-events-none"
                            : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Administración</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarAdminItems.map((item) => (
                  <SidebarMenuItem
                    key={item.label}
                    className={item.disabled ? "opacity-50" : ""}
                  >
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      disabled={item.disabled}
                    >
                      <Link
                        href={item.href}
                        className={
                          item.disabled
                            ? "cursor-not-allowed pointer-events-none"
                            : ""
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-border">
          <div className="flex items-center justify-between p-4">
            <p>Hablemos de Cáncer 2025</p>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
