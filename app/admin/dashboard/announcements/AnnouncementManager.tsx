"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAnnouncement, upsertAnnouncement } from "@/lib/actions";
import { Pencil, Trash2, ToggleLeft, ToggleRight, Plus, Megaphone } from "lucide-react";
import type { Announcement } from "@/lib/data";
import AnnouncementForm from "./AnnouncementForm";

export default function AnnouncementManager({ announcements }: { announcements: Announcement[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Announcement | null>(null);

  async function handleDelete(id: string) {
    await deleteAnnouncement(id);
    router.refresh();
  }

  async function handleToggle(item: Announcement) {
    await upsertAnnouncement({ ...item, active: !item.active });
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
            <Megaphone className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">All Announcements</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
              {announcements.length} total
            </span>
          </div>
          <div className="divide-y divide-slate-700">
            {announcements.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No announcements yet.</p>}
            {announcements.map((item) => (
              <div key={item.id} className={`p-5 flex gap-4 items-start transition-colors ${editing?.id === item.id ? "bg-slate-700/50" : ""}`}>
                <div className={`mt-0.5 flex-shrink-0 ${item.active ? "text-green-500" : "text-slate-600"}`}>
                  {item.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white leading-relaxed">{item.text}</p>
                  {item.link && (
                    <p className="text-xs text-blue-400 mt-1">{item.linkText} → {item.link}</p>
                  )}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === item.id ? null : item)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === item.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleToggle(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-950 transition-colors" title="Toggle active">
                    <ToggleRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
                    <Trash2 className="w-4 h-4" />
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
            {editing ? <Pencil className="w-4 h-4 text-cbi-yellow" /> : <Plus className="w-4 h-4 text-blue-400" />}
            {editing ? "Edit Announcement" : "Add Announcement"}
          </h2>
          <AnnouncementForm initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
