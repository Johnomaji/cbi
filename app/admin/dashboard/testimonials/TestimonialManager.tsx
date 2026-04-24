"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTestimonial } from "@/lib/actions";
import { Pencil, Trash2, Plus, Star, MessageSquare } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import TestimonialForm from "./TestimonialForm";

export default function TestimonialManager({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Testimonial | null>(null);

  async function handleDelete(id: string) { await deleteTestimonial(id); router.refresh(); }
  function handleDone() { setEditing(null); router.refresh(); }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3">
        <div className="bg-slate-800 rounded-2xl border border-slate-700">
          <div className="p-5 border-b border-slate-700 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h2 className="font-semibold text-white">Testimonials</h2>
            <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded-full">{testimonials.length} total</span>
          </div>
          <div className="divide-y divide-slate-700">
            {testimonials.length === 0 && <p className="p-8 text-center text-slate-600 text-sm">No testimonials yet.</p>}
            {testimonials.map((t) => (
              <div key={t.id} className={`p-4 flex gap-3 items-start transition-colors ${editing?.id === t.id ? "bg-slate-700/50" : ""}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-cbi-yellow fill-cbi-yellow" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditing(editing?.id === t.id ? null : t)}
                    className={`p-1.5 rounded-lg transition-colors ${editing?.id === t.id ? "text-cbi-yellow bg-amber-950" : "text-slate-400 hover:text-cbi-yellow hover:bg-amber-950"}`}>
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
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
            {editing ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <TestimonialForm initial={editing} onDone={handleDone} />
        </div>
      </div>
    </div>
  );
}
