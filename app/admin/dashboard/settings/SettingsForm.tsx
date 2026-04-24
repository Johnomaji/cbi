"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSiteSettings } from "@/lib/actions";
import type { SiteSettings } from "@/lib/data";

type Section = "contact" | "social" | "hero" | "about";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteSettings>(initial);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("contact");

  function set(field: keyof SiteSettings, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await updateSiteSettings(form);
    setLoading(false);
    setSaved(true);
    router.refresh();
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-slate-600 bg-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-cbi-blue";
  const textareaCls = `${inputCls} resize-none`;

  const sections: { id: Section; label: string }[] = [
    { id: "contact", label: "Contact Info" },
    { id: "social", label: "Social Links" },
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About / Executive" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section tabs */}
      <div className="flex gap-1 bg-slate-800 rounded-xl p-1 w-fit">
        {sections.map((s) => (
          <button key={s.id} type="button" onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? "bg-cbi-blue text-white" : "text-slate-400 hover:text-white"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === "contact" && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
          <h2 className="font-semibold text-white">Contact Information</h2>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="info@example.org" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Phone</label>
            <input type="text" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+234 ..." className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Address</label>
            <textarea value={form.address} onChange={(e) => set("address", e.target.value)} rows={2} placeholder="Street, City, State" className={textareaCls} />
          </div>
        </div>
      )}

      {activeSection === "social" && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
          <h2 className="font-semibold text-white">Social Media URLs</h2>
          {([
            { field: "facebookUrl", label: "Facebook" },
            { field: "twitterUrl", label: "Twitter / X" },
            { field: "linkedinUrl", label: "LinkedIn" },
            { field: "instagramUrl", label: "Instagram" },
            { field: "youtubeUrl", label: "YouTube" },
          ] as { field: keyof SiteSettings; label: string }[]).map(({ field, label }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
              <input type="url" value={form[field] as string} onChange={(e) => set(field, e.target.value)} placeholder="https://..." className={inputCls} />
            </div>
          ))}
        </div>
      )}

      {activeSection === "hero" && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
          <h2 className="font-semibold text-white">Hero Section</h2>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Tagline (small text above heading)</label>
            <input type="text" value={form.heroTagline} onChange={(e) => set("heroTagline", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Heading</label>
            <textarea value={form.heroHeading} onChange={(e) => set("heroHeading", e.target.value)} rows={2} className={textareaCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
            <textarea value={form.heroDescription} onChange={(e) => set("heroDescription", e.target.value)} rows={3} className={textareaCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Hero Image URL</label>
            <input type="text" value={form.heroImageUrl} onChange={(e) => set("heroImageUrl", e.target.value)} placeholder="/images/hero.jpg or https://..." className={inputCls} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([
              { valField: "heroStat1Value", lblField: "heroStat1Label", n: "1" },
              { valField: "heroStat2Value", lblField: "heroStat2Label", n: "2" },
              { valField: "heroStat3Value", lblField: "heroStat3Label", n: "3" },
            ] as { valField: keyof SiteSettings; lblField: keyof SiteSettings; n: string }[]).map(({ valField, lblField, n }) => (
              <div key={n} className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Stat {n} Value</label>
                  <input type="text" value={form[valField] as string} onChange={(e) => set(valField, e.target.value)} placeholder="5,000+" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Stat {n} Label</label>
                  <input type="text" value={form[lblField] as string} onChange={(e) => set(lblField, e.target.value)} placeholder="Beneficiaries" className={inputCls} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "about" && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 space-y-4">
          <h2 className="font-semibold text-white">About / Executive Message</h2>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Body Text</label>
            <textarea value={form.aboutBody} onChange={(e) => set("aboutBody", e.target.value)} rows={5} placeholder="The executive message text..." className={textareaCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Director Phone</label>
            <input type="text" value={form.aboutPhone} onChange={(e) => set("aboutPhone", e.target.value)} placeholder="+234 ..." className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Beneficiary Count</label>
            <input type="text" value={form.aboutBeneficiaryCount} onChange={(e) => set("aboutBeneficiaryCount", e.target.value)} placeholder="5,000+" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">About Image 1 URL</label>
              <input type="text" value={form.aboutImageUrl1} onChange={(e) => set("aboutImageUrl1", e.target.value)} placeholder="/images/about1.jpg" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">About Image 2 URL</label>
              <input type="text" value={form.aboutImageUrl2} onChange={(e) => set("aboutImageUrl2", e.target.value)} placeholder="/images/about2.jpg" className={inputCls} />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button type="submit" disabled={loading}
          className="px-8 py-2.5 bg-cbi-blue text-white rounded-lg font-semibold text-sm hover:bg-cbi-blue-dark transition-colors disabled:opacity-60">
          {loading ? "Saving…" : "Save Settings"}
        </button>
        {saved && <span className="text-green-400 text-sm font-medium">Saved successfully.</span>}
      </div>
    </form>
  );
}
