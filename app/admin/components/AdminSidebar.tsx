"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth";
import {
  LayoutDashboard,
  Megaphone,
  FileText,
  Calendar,
  Users,
  BarChart3,
  Image,
  BookOpen,
  LogOut,
  Globe,
  ChevronRight,
  LayoutGrid,
  Clock,
  MessageSquare,
  Handshake,
  Briefcase,
  Settings,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/dashboard/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/dashboard/events", label: "Events", icon: Calendar },
  { href: "/admin/dashboard/team", label: "Team", icon: Users },
  { href: "/admin/dashboard/stats", label: "Statistics", icon: BarChart3 },
  { href: "/admin/dashboard/gallery", label: "Gallery", icon: Image },
  { href: "/admin/dashboard/publications", label: "Publications", icon: BookOpen },
  { href: "/admin/dashboard/programs", label: "Programs", icon: LayoutGrid },
  { href: "/admin/dashboard/milestones", label: "Milestones", icon: Clock },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/dashboard/partners", label: "Partners", icon: Handshake },
  { href: "/admin/dashboard/careers", label: "Careers", icon: Briefcase },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  async function handleLogout() {
    await logout();
    router.push("/admin");
  }

  return (
    <>
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-lg bg-slate-950 p-2 text-white shadow-lg border border-slate-800"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50 md:z-auto h-screen bg-slate-950 flex flex-col border-r border-slate-800 transform transition-all duration-200
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${desktopCollapsed ? "md:w-20" : "md:w-60"} w-72`}
      >
        <div className="p-4 md:p-5 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 bg-cbi-blue rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">CBI</span>
              </div>
              <div className={desktopCollapsed ? "md:hidden" : ""}>
                <div className="text-white font-bold text-sm">CBI Admin</div>
                <div className="text-slate-500 text-xs">Content Manager</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDesktopCollapsed((v) => !v)}
                className="hidden md:inline-flex p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
                aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {desktopCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center ${desktopCollapsed ? "md:justify-center" : ""} gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-cbi-blue text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
                title={desktopCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className={desktopCollapsed ? "md:hidden" : ""}>{item.label}</span>
                {active && !desktopCollapsed && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center ${desktopCollapsed ? "md:justify-center" : ""} gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors`}
            title={desktopCollapsed ? "View Site" : undefined}
          >
            <Globe className="w-4 h-4" />
            <span className={desktopCollapsed ? "md:hidden" : ""}>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${desktopCollapsed ? "md:justify-center" : ""} gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950 hover:text-red-400 transition-colors`}
            title={desktopCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-4 h-4" />
            <span className={desktopCollapsed ? "md:hidden" : ""}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
