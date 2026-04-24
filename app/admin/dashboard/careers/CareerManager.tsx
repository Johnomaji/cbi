"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCareer, upsertCareer } from "@/lib/actions";
import { Pencil, Trash2, Eye, EyeOff, Plus, Briefcase } from "lucide-react";
import type { CareerOpening } from "@/lib/data";
import CareerForm from "./CareerForm";

export default function CareerManager({ careers }: { careers: CareerOpening[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<CareerOpening | null>(null);

  async function handleDelete(id: string) { await deleteCareer(id); router.refresh(); }
  async function handleToggle(c: CareerOpening) { await upsertCareer({ ...c, published: !c.published }); router.refresh(); }
  function handleDone() { setEditing(null); router.refresh(); }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Career Openings</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{careers.length} total</span>
          </div>
          <div className="divide-y divide-slate-700">
            {careers.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No openings yet.</p>}
            {careers.map((c) => (
              <div key={c.id} className={`p-4 flex gap-3 items-start transition-colors ${editing?.id === c.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.published ? "bg-green-950 text-green-400" : "bg-slate-700 text-slate-400"}`}>
                      {c.published ? "Published" : "Hidden"}
                    </span>
                    <span className="text-xs text-slate-500">{c.type}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.department} · {c.location}</p>
                  <p className="text-xs text-slate-600 mt-0.5">Deadline: {c.deadline}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === c.id ? null : c)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === c.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleToggle(c)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-950 transition-colors">
                    {c.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
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
            {editing ? "Edit Opening" : "Add Opening"}
          </h2>
          <CareerForm initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
