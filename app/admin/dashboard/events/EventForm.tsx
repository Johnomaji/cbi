"use client";

import { useState, useEffect } from "react";
import { upsertEvent } from "@/lib/actions";
import type { Event } from "@/lib/data";

const EMPTY = { title: "", description: "", date: "", time: "9:00 AM", location: "", type: "Conference", published: true };

export default function EventForm({ initial, onDone }: { initial?: Event | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Event, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm(initial ?? EMPTY); }, [initial]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertEvent(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Title *</label>
        <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required placeholder="Event title" className={inputCls} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Date *</label>
          <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} required className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Time</label>
          <input type="text" value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="9:00 AM" className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Location *</label>
        <input type="text" value={form.location} onChange={(e) => set("location", e.target.value)} required placeholder="City, State" className={inputCls} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
        <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
          {["Conference", "Training", "Forum", "Orientation", "Workshop", "Webinar"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3}
          placeholder="Event description..." className={`${inputCls} resize-none`} />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 rounded" />
        <span className="text-sm text-slate-300">Publish immediately</span>
      </label>
      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Add Event"}
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
