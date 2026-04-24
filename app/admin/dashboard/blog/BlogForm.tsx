"use client";

import { useState, useEffect } from "react";
import { upsertPost } from "@/lib/actions";
import type { Post } from "@/lib/data";

const EMPTY = {
  title: "", slug: "", excerpt: "", content: "",
  category: "Impact", author: "", date: new Date().toISOString().split("T")[0],
  image: "", published: false,
};

export default function BlogForm({ initial, onDone }: { initial?: Post | null; onDone?: () => void }) {
  const [form, setForm] = useState<Omit<Post, "id"> & { id?: string }>(initial ?? EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initial ?? EMPTY);
  }, [initial]);

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await upsertPost(form);
    setLoading(false);
    onDone?.();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const isEditing = !!form.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {[
        { label: "Title *", field: "title", placeholder: "Post title" },
        { label: "Slug *", field: "slug", placeholder: "post-url-slug" },
        { label: "Author *", field: "author", placeholder: "Author name" },
        { label: "Image URL", field: "image", placeholder: "/images/post.jpg" },
      ].map(({ label, field, placeholder }) => (
        <div key={field}>
          <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
          <input
            type="text"
            value={form[field as keyof typeof form] as string}
            onChange={(e) => set(field, e.target.value)}
            placeholder={placeholder}
            required={label.endsWith("*")}
            className={inputCls}
          />
        </div>
      ))}

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
        <select value={form.category} onChange={(e) => set("category", e.target.value)} className={inputCls}>
          {["Impact", "Programs", "Stories", "WASH", "Health", "Education", "Nutrition"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
        <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Excerpt *</label>
        <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} required rows={2}
          placeholder="Short summary..." className={`${inputCls} resize-none`} />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Content *</label>
        <textarea value={form.content} onChange={(e) => set("content", e.target.value)} required rows={5}
          placeholder="Full post content..." className={`${inputCls} resize-none`} />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.published} onChange={(e) => set("published", e.target.checked)} className="w-4 h-4 rounded" />
        <span className="text-sm text-slate-300">Publish immediately</span>
      </label>

      <div className="flex gap-2 pt-1">
        <button type="submit" disabled={loading}
          className="flex-1 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : isEditing ? "Save Changes" : "Create Post"}
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
