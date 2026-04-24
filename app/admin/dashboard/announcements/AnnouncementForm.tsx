"use client";

import { useState, useEffect } from "react";
import { upsertAnnouncement } from "@/lib/actions";
import type { Announcement } from "@/lib/data";

const EMPTY = { text: "", link: "", linkText: "", active: true };

export default function AnnouncementForm({ initial, onDone }: { initial?: Announcement | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Announcement, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY); }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertAnnouncement(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Announcement Text *</label>
        <textarea value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
          required rows={3} placeholder="Enter announcement text..."
          className={`${inputCls} resize-none`} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Link URL (optional)</label>
        <input type="text" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
          placeholder="/blog or https://..." className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Link Text (optional)</label>
        <input type="text" value={form.linkText} onChange={(e) => setForm((f) => ({ ...f, linkText: e.target.value }))}
          placeholder="Read more" className={inputCls} />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="w-4 h-4 rounded" />
        <span className="text-sm text-slate-300">Active (show in bar)</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Announcement"}
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
