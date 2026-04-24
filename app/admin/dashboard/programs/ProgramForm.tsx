"use client";

import { useState, useEffect } from "react";
import { upsertProgram } from "@/lib/actions";
import type { Program } from "@/lib/data";

const ICONS = ["BookOpen", "Heart", "Apple", "Droplets", "ShieldCheck", "Wheat", "HandHeart", "Users", "Globe"];
const EMPTY: Omit<Program, "id"> = { title: "", description: "", icon: "Heart", order: 1, published: true };

export default function ProgramForm({ initial, nextOrder, onDone }: { initial?: Program | null; nextOrder: number; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Program, "id"> & { id?: string }>(initial ?? { ...EMPTY, order: nextOrder });
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? { ...EMPTY, order: nextOrder }); }, [initial, nextOrder]);

  function set(field: string, value: string | number | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertProgram(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="Program name" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Icon</label>
        <select value={form.icon} onChange={(e) => set("icon", e.target.value)} className={inputCls}>
          {ICONS.map((i) => <option key={i}>{i}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Order</label>
        <input type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value))} min={1} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Description *</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} required rows={3}
          placeholder="Short description..." className={`${inputCls} resize-none`} />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 rounded" />
        <span className="text-sm text-slate-300">Published</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Program"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">Cancel</button>
        )}
      </div>
    </form>
  );
}
