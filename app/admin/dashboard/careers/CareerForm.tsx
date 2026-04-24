"use client";

import { useState, useEffect } from "react";
import { upsertCareer } from "@/lib/actions";
import type { CareerOpening } from "@/lib/data";

const EMPTY: Omit<CareerOpening, "id"> = {
  title: "", department: "", location: "", type: "Full-time",
  deadline: new Date().toISOString().split("T")[0], published: true,
};

export default function CareerForm({ initial, onDone }: { initial?: CareerOpening | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<CareerOpening, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY); }, [initial]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertCareer(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Job Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="e.g. Field Officer" className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Department</label>
          <input type="text" value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="e.g. Programs" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Location</label>
          <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Abuja, Nigeria" className={inputCls} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
          <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
            {["Full-time", "Part-time", "Contract", "Volunteer", "Internship"].map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Deadline</label>
          <input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} className={inputCls} />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 rounded" />
        <span className="text-sm text-slate-300">Published</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Opening"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">Cancel</button>
        )}
      </div>
    </form>
  );
}
