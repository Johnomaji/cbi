"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Calendar, Tag } from "lucide-react";

const gradients: Record<string, string> = {
  WASH:        "from-cyan-500 to-blue-600",
  Nutrition:   "from-amber-400 to-orange-500",
  Education:   "from-blue-500 to-blue-900",
  Health:      "from-red-400 to-rose-600",
  Protection:  "from-purple-500 to-indigo-600",
  Livelihoods: "from-green-500 to-emerald-700",
  Events:      "from-slate-500 to-slate-700",
};

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  imageUrl?: string;
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div className="py-16 bg-bg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cat === active
                  ? "bg-cbi-blue text-white"
                  : "bg-surface border border-border text-fg2 hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all aspect-square">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[item.category] ?? "from-slate-400 to-slate-600"} flex items-center justify-center`}>
                  <Camera className="w-10 h-10 text-white/40" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-xs font-semibold text-white/80 mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" />{item.category}
                </span>
                <p className="text-white text-xs font-semibold leading-tight">{item.title}</p>
                <p className="text-slate-300 text-xs mt-1 line-clamp-2">{item.caption}</p>
                <div className="flex items-center gap-1 mt-2 text-slate-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  {new Date(item.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-fg2">No images in this category yet.</div>
        )}
      </div>
    </div>
  );
}
