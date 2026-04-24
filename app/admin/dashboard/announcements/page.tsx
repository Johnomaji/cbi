import { getAnnouncements } from "@/lib/data";
import AnnouncementManager from "./AnnouncementManager";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Announcements</h1>
        <p className="text-slate-400 text-sm mt-1">Manage the scrolling announcement bar on your website.</p>
      </div>
      <AnnouncementManager announcements={announcements} />
    </div>
  );
}
