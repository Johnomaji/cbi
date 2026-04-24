"use client";

import { useState, useEffect } from "react";
import { upsertTeamMember } from "@/lib/actions";
import type { TeamMember } from "@/lib/data";

const EMPTY = (nextOrder: number) => ({ name: "", title: "", initials: "", email: "", bio: "", order: nextOrder });

export default function TeamForm({ nextOrder, initial, onDone }: { nextOrder: number; initial?: TeamMember | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<TeamMember, "id"> & { id?: string }>(initial ?? EMPTY(nextOrder));
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY(nextOrder)); }, [initial, nextOrder]);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertTeamMember(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[
        { label: "Full Name *", field: "name", placeholder: "e.g. Rejoice Mark" },
        { label: "Job Title *", field: "title", placeholder: "e.g. Executive Director" },
        { label: "Initials *", field: "initials", placeholder: "e.g. RM" },
        { label: "Email *", field: "email", placeholder: "name@cbi.ngo" },
      ].map(({ label, field, placeholder }) => (
        <div key={field}>
          <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
          <input type={field === "email" ? "email" : "text"} value={form[field as keyof typeof form] as string}
            onChange={(e) => set(field, e.target.value)} placeholder={placeholder} required className={inputCls} />
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Bio</label>
        <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3}
          placeholder="Short biography..." className={`${inputCls} resize-none`} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Display Order</label>
        <input type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value))} min={1} className={inputCls} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Member"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
