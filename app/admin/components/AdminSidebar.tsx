"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

  async function handleLogout() {
    await logout();
    router.push("/admin");
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-slate-950 min-h-screen flex flex-col">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-cbi-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CBI</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">CBI Admin</div>
            <div className="text-slate-500 text-xs">Content Manager</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-cbi-blue text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Globe className="w-4 h-4" />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
