"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProgram, upsertProgram } from "@/lib/actions";
import { Pencil, Trash2, Eye, EyeOff, Plus, LayoutGrid } from "lucide-react";
import type { Program } from "@/lib/data";
import ProgramForm from "./ProgramForm";

export default function ProgramManager({ programs }: { programs: Program[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Program | null>(null);
  const sorted = [...programs].sort((a, b) => a.order - b.order);

  async function handleDelete(id: string) { await deleteProgram(id); router.refresh(); }
  async function handleToggle(p: Program) { await upsertProgram({ ...p, published: !p.published }); router.refresh(); }
  function handleDone() { setEditing(null); router.refresh(); }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Programs</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{programs.length} total</span>
          </div>
          <div className="divide-y divide-slate-700">
            {sorted.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No programs yet.</p>}
            {sorted.map((p) => (
              <div key={p.id} className={`p-4 flex gap-3 items-start transition-colors ${editing?.id === p.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.published ? "bg-green-950 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                      {p.published ? "Published" : "Hidden"}
                    </span>
                    <span className="text-xs text-slate-500">#{p.order} · {p.icon}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{p.description}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === p.id ? null : p)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === p.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleToggle(p)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-950 transition-colors">
                    {p.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
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
            {editing ? <Pencil className="w-4 h-4 text-cbi-yellow" /> : <Plus className="w-4 h-4 text-blue-400" />}
            {editing ? "Edit Program" : "Add Program"}
          </h2>
          <ProgramForm initial={editing} nextOrder={programs.length + 1} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
