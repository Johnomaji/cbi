"use client";

import { useState, useEffect } from "react";
import { upsertTestimonial } from "@/lib/actions";
import type { Testimonial } from "@/lib/data";

const EMPTY: Omit<Testimonial, "id"> = { quote: "", name: "", role: "", initials: "", stars: 5 };

export default function TestimonialForm({ initial, onDone }: { initial?: Testimonial | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Testimonial, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY); }, [initial]);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertTestimonial(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Quote *</label>
        <textarea value={form.quote} onChange={(e) => set("quote", e.target.value)} required rows={4}
          placeholder="What they said..." className={`${inputCls} resize-none`} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Name *</label>
          <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Full name" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Initials</label>
          <input type="text" value={form.initials} onChange={(e) => set("initials", e.target.value)} placeholder="e.g. AM" maxLength={3} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Role / Location</label>
        <input type="text" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Community Member, Kogi State" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Stars (1–5)</label>
        <input type="number" value={form.stars} onChange={(e) => set("stars", parseInt(e.target.value))} min={1} max={5} className={inputCls} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Testimonial"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">Cancel</button>
        )}
      </div>
    </form>
  );
}
