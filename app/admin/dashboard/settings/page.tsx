import { getSiteSettings } from "@/lib/data";
import SettingsForm from "./SettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Site Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Edit contact info, social links, hero section, and about content.</p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
