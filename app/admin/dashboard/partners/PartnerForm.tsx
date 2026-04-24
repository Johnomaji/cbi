"use client";

import { useState, useEffect } from "react";
import { upsertPartner } from "@/lib/actions";
import type { Partner } from "@/lib/data";

const EMPTY: Omit<Partner, "id"> = { name: "", logoUrl: "", order: 1 };

export default function PartnerForm({ initial, nextOrder, onDone }: { initial?: Partner | null; nextOrder: number; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Partner, "id"> & { id?: string }>(initial ?? { ...EMPTY, order: nextOrder });
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? { ...EMPTY, order: nextOrder }); }, [initial, nextOrder]);

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertPartner(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Partner Name *</label>
        <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder="Organisation name" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Logo URL</label>
        <input type="text" value={form.logoUrl} onChange={(e) => set("logoUrl", e.target.value)}
          placeholder="https://... or /images/logo.png" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Order</label>
        <input type="number" value={form.order} onChange={(e) => set("order", parseInt(e.target.value))} min={1} className={inputCls} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Partner"}
        </button>
        {isEditing && (
          <button type="button" onClick={onDone}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">Cancel</button>
        )}
      </div>
    </form>
  );
}
