import { getAnnouncements, getPosts, getEvents, getTeam, getStats } from "@/lib/data";
import { Megaphone, FileText, Calendar, Users, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [announcements, posts, events, team, stats] = await Promise.all([
    getAnnouncements(),
    getPosts(),
    getEvents(),
    getTeam(),
    getStats(),
  ]);

  const cards = [
    {
      label: "Announcements",
      value: announcements.filter((a) => a.active).length,
      total: announcements.length,
      icon: Megaphone,
      color: "bg-blue-950 text-blue-400",
      href: "/admin/dashboard/announcements",
    },
    {
      label: "Blog Posts",
      value: posts.filter((p) => p.published).length,
      total: posts.length,
      icon: FileText,
      color: "bg-green-950 text-green-400",
      href: "/admin/dashboard/blog",
    },
    {
      label: "Events",
      value: events.filter((e) => e.published).length,
      total: events.length,
      icon: Calendar,
      color: "bg-purple-950 text-purple-400",
      href: "/admin/dashboard/events",
    },
    {
      label: "Team Members",
      value: team.length,
      total: team.length,
      icon: Users,
      color: "bg-amber-950 text-amber-400",
      href: "/admin/dashboard/team",
    },
    {
      label: "Impact Stats",
      value: stats.items.length,
      total: stats.items.length,
      icon: BarChart3,
      color: "bg-slate-800 text-slate-400",
      href: "/admin/dashboard/stats",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your CBI website content.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-10">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:shadow-md transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <div className="text-slate-400 text-xs mt-0.5">{card.label}</div>
              <div className="text-slate-600 text-xs mt-1">{card.total} total</div>
              <div className="flex items-center gap-1 mt-3 text-blue-400 text-xs font-semibold group-hover:gap-2 transition-all">
                Manage <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" /> Recent Blog Posts
          </h2>
          <div className="space-y-3">
            {posts.slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                <div>
                  <div className="text-sm font-medium text-white line-clamp-1">{post.title}</div>
                  <div className="text-xs text-slate-500">{post.category} · {post.date}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${post.published ? "bg-green-950 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                  {post.published ? "Live" : "Draft"}
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/dashboard/blog" className="mt-4 text-blue-400 text-sm font-semibold hover:underline flex items-center gap-1">
            Manage all posts <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" /> Upcoming Events
          </h2>
          <div className="space-y-3">
            {events
              .filter((e) => new Date(e.date) >= new Date())
              .slice(0, 4)
              .map((event) => (
                <div key={event.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-white line-clamp-1">{event.title}</div>
                    <div className="text-xs text-slate-500">{event.type} · {event.date}</div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-950 text-blue-400">
                    Upcoming
                  </span>
                </div>
              ))}
          </div>
          <Link href="/admin/dashboard/events" className="mt-4 text-blue-400 text-sm font-semibold hover:underline flex items-center gap-1">
            Manage all events <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
