"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMilestone, upsertMilestone } from "@/lib/actions";
import { Pencil, Trash2, Plus, Clock } from "lucide-react";
import type { Milestone } from "@/lib/data";
import MilestoneForm from "./MilestoneForm";

export default function MilestoneManager({ milestones }: { milestones: Milestone[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Milestone | null>(null);
  const sorted = [...milestones].sort((a, b) => a.order - b.order);

  async function handleDelete(id: string) { await deleteMilestone(id); router.refresh(); }
  function handleDone() { setEditing(null); router.refresh(); }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Milestones</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{milestones.length} total</span>
          </div>
          <div className="divide-y divide-slate-700">
            {sorted.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No milestones yet.</p>}
            {sorted.map((m) => (
              <div key={m.id} className={`p-4 flex gap-3 items-start transition-colors ${editing?.id === m.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs bg-cbi-blue/20 text-blue-400 px-2 py-0.5 rounded-full font-semibold">{m.year}</span>
                    <span className="text-xs text-slate-500">#{m.order}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{m.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{m.desc}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === m.id ? null : m)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === m.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
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
            {editing ? "Edit Milestone" : "Add Milestone"}
          </h2>
          <MilestoneForm initial={editing} nextOrder={milestones.length + 1} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
