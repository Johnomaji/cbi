"use client";

import { useState, useEffect } from "react";
import { upsertMilestone } from "@/lib/actions";
import type { Milestone } from "@/lib/data";

const EMPTY: Omit<Milestone, "id"> = { year: "", title: "", desc: "", order: 1 };

export default function MilestoneForm({ initial, nextOrder, onDone }: { initial?: Milestone | null; nextOrder: number; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Milestone, "id"> & { id?: string }>(initial ?? { ...EMPTY, order: nextOrder });
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? { ...EMPTY, order: nextOrder }); }, [initial, nextOrder]);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertMilestone(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Year *</label>
          <input type="text" value={form.year} onChange={(e) => set("year", e.target.value)} required placeholder="e.g. 2020" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Order</label>
          <input type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value))} min={1} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="Milestone title" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Description *</label>
        <textarea value={form.desc} onChange={(e) => set("desc", e.target.value)} required rows={3}
          placeholder="Brief description..." className={`${inputCls} resize-none`} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Milestone"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">Cancel</button>
        )}
      </div>
    </form>
  );
}
