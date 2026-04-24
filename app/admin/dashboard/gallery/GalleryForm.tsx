"use client";

import { useState, useEffect } from "react";
import { upsertGalleryItem } from "@/lib/actions";
import type { GalleryItem } from "@/lib/data";

const EMPTY: Omit<GalleryItem, "id"> = { title: "", caption: "", category: "Programs", date: new Date().toISOString().split("T")[0], imageUrl: "" };

export default function GalleryForm({ initial, onDone }: { initial?: GalleryItem | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<GalleryItem, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY); }, [initial]);

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertGalleryItem(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)}
          required placeholder="Photo title" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Image URL</label>
        <input type="text" value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="https://... or /images/photo.jpg" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
        <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
          {["WASH", "Nutrition", "Education", "Health", "Protection", "Livelihoods", "Events", "Community", "Training"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
        <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Caption</label>
        <textarea value={form.caption} onChange={(e) => set("caption", e.target.value)} rows={3}
          placeholder="Image caption or description..." className={`${inputCls} resize-none`} />
      </div>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Item"}
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
