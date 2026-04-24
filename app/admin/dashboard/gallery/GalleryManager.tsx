"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteGalleryItem } from "@/lib/actions";
import { Pencil, Trash2, Plus, Image } from "lucide-react";
import type { GalleryItem } from "@/lib/data";
import GalleryForm from "./GalleryForm";

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<GalleryItem | null>(null);

  async function handleDelete(id: string) {
    await deleteGalleryItem(id);
    router.refresh();
  }

  function handleDone() {
    setEditing(null);
    router.refresh();
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <Image className="w-4 h-4 text-pink-400" />
            <h2 className="font-semibold text-white">Gallery Items</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
              {items.length} total
            </span>
          </div>
          <div className="divide-y divide-slate-700">
            {items.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No gallery items yet.</p>}
            {items.map((item) => (
              <div key={item.id} className={`p-5 flex gap-3 items-start transition-colors ${editing?.id === item.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-pink-950 text-pink-400">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-1">{item.title}</p>
                  {item.caption && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.caption}</p>}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === item.id ? null : item)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === item.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
          <h2 className="font-semibold text-white mb-5 flex items-center gap-2">
            {editing ? <Pencil className="w-4 h-4 text-cbi-yellow" /> : <Plus className="w-4 h-4 text-pink-400" />}
            {editing ? `Editing: ${editing.title.slice(0, 28)}` : "Add Gallery Item"}
          </h2>
          <GalleryForm initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
