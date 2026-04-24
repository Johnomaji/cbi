import { getAnnouncements } from "@/lib/data";
import AnnouncementBarClient from "./AnnouncementBarClient";

export default async function AnnouncementBar() {
  const announcements = await getAnnouncements();
  const active = announcements.filter((a) => a.active);
  if (active.length === 0) return null;

  const dismissKey = active.map((a) => a.id).join(",");

  return <AnnouncementBarClient items={active} dismissKey={dismissKey} />;
}
