"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn, initials } from "@/lib/utils";
import { portalNav, roleLabels } from "@/lib/navigation";
import { DEMO_USERS } from "@/lib/demo-users";
import type { UserRole } from "@/lib/types";

const NOTIFICATION_COUNT: Record<UserRole, number> = {
  super_admin: 5,
  nodal_officer: 3,
  screening_team: 2,
  patient: 1,
};

interface PortalLayoutProps {
  role: UserRole;
  children: React.ReactNode;
  userName?: string;
}

export function PortalLayout({ role, children, userName }: PortalLayoutProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = portalNav[role];
  const demoUser = DEMO_USERS[role];
  const user = {
    ...demoUser,
    name: userName ?? demoUser.name,
  };
  const notificationCount = NOTIFICATION_COUNT[role];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const sidebarNavClass = (active: boolean) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-white/15 font-semibold text-white"
        : "text-primary-100 hover:bg-white/10 hover:text-white",
    );

  const SidebarContent = (
    <div className="flex h-full flex-col text-white">
      <div className="flex items-center justify-between border-b border-primary-600 px-5 py-4">
        <Logo variant="sidebar" roleLabel={roleLabels[role]} subtitle={false} />
        <button
          className="rounded-md p-1 text-primary-200 hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-thin">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={sidebarNavClass(active)}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-primary-600 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-200 transition-colors hover:bg-white/10 hover:text-white"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="portal-sidebar hidden w-64 shrink-0 lg:block">
        <div className="sticky top-0 h-screen">{SidebarContent}</div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="portal-sidebar absolute left-0 top-0 h-full w-64 shadow-2xl animate-fade-in">
            {SidebarContent}
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-card/80 px-4 backdrop-blur lg:px-6">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <button
              className="relative rounded-md p-2 hover:bg-secondary"
              aria-label={`${notificationCount} notifications`}
            >
              <Bell className="size-5 text-muted-foreground" />
              {notificationCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger-500 px-1 text-[10px] font-semibold leading-none text-white">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {initials(user.name)}
              </div>
              <div className="hidden text-right leading-tight sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.district ? `${user.district} · ` : ""}
                  {user.title}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 space-y-6 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
