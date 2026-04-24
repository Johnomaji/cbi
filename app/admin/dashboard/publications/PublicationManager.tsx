"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deletePublication, upsertPublication } from "@/lib/actions";
import { Pencil, Trash2, Eye, EyeOff, Plus, BookOpen, ExternalLink } from "lucide-react";
import type { Publication } from "@/lib/data";
import PublicationForm from "./PublicationForm";

export default function PublicationManager({ publications }: { publications: Publication[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Publication | null>(null);

  async function handleDelete(id: string) {
    await deletePublication(id);
    router.refresh();
  }

  async function handleToggle(pub: Publication) {
    await upsertPublication({ ...pub, published: !pub.published });
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
            <BookOpen className="w-4 h-4 text-teal-400" />
            <h2 className="font-semibold text-white">All Publications</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">
              {publications.length} total
            </span>
          </div>
          <div className="divide-y divide-slate-700">
            {publications.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No publications yet.</p>}
            {publications.map((pub) => (
              <div key={pub.id} className={`p-5 flex gap-3 items-start transition-colors ${editing?.id === pub.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pub.published ? "bg-green-950 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                      {pub.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs text-slate-400">{pub.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-1">{pub.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{pub.date}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {pub.fileUrl && (
                    <a href={pub.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-400 hover:bg-teal-950 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => setEditing(editing?.id === pub.id ? null : pub)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === pub.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleToggle(pub)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-950 transition-colors">
                    {pub.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => handleDelete(pub.id)}
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
            {editing ? <Pencil className="w-4 h-4 text-cbi-yellow" /> : <Plus className="w-4 h-4 text-teal-400" />}
            {editing ? `Editing: ${editing.title.slice(0, 28)}` : "Add Publication"}
          </h2>
          <PublicationForm initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
