"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertStat, deleteStat } from "@/lib/actions";
import { Save, Trash2, Plus } from "lucide-react";
import type { StatItem } from "@/lib/data";

const EMPTY_STAT = { label: "", value: 0, suffix: "+", icon: "Users" };

export default function StatsEditor({ items }: { items: StatItem[] }) {
  const router = useRouter();
  const [stats, setStats] = useState(items);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [newStat, setNewStat] = useState(EMPTY_STAT);
  const [adding, setAdding] = useState(false);

  function update(id: string, field: keyof StatItem, value: string | number) {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: field === "value" ? Number(value) : value } : s))
    );
  }

  async function save(item: StatItem) {
    setSaving(item.id);
    await upsertStat(item);
    setSaving(null);
    setSaved(item.id);
    setTimeout(() => setSaved(null), 2000);
  }

  async function handleDelete(id: string) {
    await deleteStat(id);
    router.refresh();
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    await upsertStat(newStat);
    setNewStat(EMPTY_STAT);
    setAdding(false);
    router.refresh();
  }

  const inputCls = "w-full px-2.5 py-1.5 rounded-lg border border-slate-600 bg-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";

  return (
    <div>
      <div className="divide-y divide-slate-700">
        {stats.map((stat) => (
          <div key={stat.id} className="p-5 flex gap-4 items-center">
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => update(stat.id, "label", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Value</label>
                <input type="number" value={stat.value} onChange={(e) => update(stat.id, "value", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Suffix</label>
                <input type="text" value={stat.suffix} onChange={(e) => update(stat.id, "suffix", e.target.value)} placeholder="+" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Icon name</label>
                <input type="text" value={stat.icon} onChange={(e) => update(stat.id, "icon", e.target.value)} className={inputCls} />
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => save(stat)} disabled={saving === stat.id}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  saved === stat.id ? "bg-green-950 text-green-400" : "bg-cbi-blue text-white hover:bg-cbi-blue-dark"
                } disabled:opacity-60`}>
                <Save className="w-3.5 h-3.5" />
                {saving === stat.id ? "Saving…" : saved === stat.id ? "Saved!" : "Save"}
              </button>
              <button onClick={() => handleDelete(stat.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add new stat */}
      <form onSubmit={handleAdd} className="p-5 border-t border-slate-700 bg-slate-800/50">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" /> Add New Stat
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Label</label>
            <input type="text" value={newStat.label} onChange={(e) => setNewStat((s) => ({ ...s, label: e.target.value }))}
              required placeholder="e.g. Lives Reached" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Value</label>
            <input type="number" value={newStat.value} onChange={(e) => setNewStat((s) => ({ ...s, value: Number(e.target.value) }))}
              className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Suffix</label>
            <input type="text" value={newStat.suffix} onChange={(e) => setNewStat((s) => ({ ...s, suffix: e.target.value }))}
              placeholder="+" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Icon name</label>
            <input type="text" value={newStat.icon} onChange={(e) => setNewStat((s) => ({ ...s, icon: e.target.value }))}
              placeholder="Users" className={inputCls} />
          </div>
        </div>
        <button type="submit" disabled={adding}
          className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 flex items-center gap-2">
          <Plus className="w-3.5 h-3.5" />
          {adding ? "Adding…" : "Add Stat"}
        </button>
      </form>
    </div>
  );
}
