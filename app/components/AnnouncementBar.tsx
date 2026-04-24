import { getAnnouncements } from "@/lib/data";
import Link from "next/link";
import { Megaphone } from "lucide-react";

export default async function AnnouncementBar() {
  const announcements = await getAnnouncements();
  const active = announcements.filter((a) => a.active);
  if (active.length === 0) return null;

  const items = [...active, ...active];

  return (
    <div className="bg-cbi-blue-dark text-white text-sm py-2 overflow-hidden relative border-b border-blue-900">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 bg-cbi-yellow text-slate-900 px-4 py-0.5 rounded-full z-10 mr-4">
          <Megaphone className="w-3.5 h-3.5" />
          <span className="font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
            News
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee whitespace-nowrap">
            {items.map((item, i) => (
              <span key={`${item.id}-${i}`} className="inline-flex items-center gap-3 mr-16">
                <span className="text-blue-100">{item.text}</span>
                {item.link && item.linkText && (
                  <Link
                    href={item.link}
                    className="text-yellow-300 hover:text-yellow-100 font-semibold underline underline-offset-2 transition-colors"
                  >
                    {item.linkText} →
                  </Link>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
