import { getEvents } from "@/lib/data";
import EventManager from "./EventManager";

export default async function AdminEventsPage() {
  const events = await getEvents();
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Events</h1>
        <p className="text-slate-400 text-sm mt-1">Manage events and activities.</p>
      </div>
      <EventManager events={events} />
    </div>
  );
}
