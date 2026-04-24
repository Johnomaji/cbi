"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import type { Announcement } from "@/lib/data";

interface Props {
  items: Announcement[];
  dismissKey: string;
}

export default function AnnouncementBarClient({ items, dismissKey }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ann_dismissed");
    if (saved !== dismissKey) setVisible(true);
  }, [dismissKey]);

  function dismiss() {
    localStorage.setItem("ann_dismissed", dismissKey);
    setVisible(false);
  }

  if (!visible) return null;

  const doubled = [...items, ...items];

  return (
    <div className="bg-cbi-blue-dark text-white text-sm py-2 overflow-hidden relative border-b border-blue-900">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 bg-cbi-yellow text-slate-900 px-4 py-0.5 rounded-full z-10 mx-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span className="font-semibold text-xs uppercase tracking-wider whitespace-nowrap">News</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((item, i) => (
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
        <button
          onClick={dismiss}
          aria-label="Close announcement"
          className="flex-shrink-0 mx-3 w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
