import PageLayout from "@/app/components/PageLayout";
import { getEvents } from "@/lib/data";
import { Clock, MapPin, Tag, CalendarDays, ExternalLink, Images } from "lucide-react";
import Link from "next/link";
import type { Event } from "@/lib/data";

export const metadata = { title: "Events | Care Best Initiative" };

const typeCls: Record<string, string> = {
  Conference:  "bg-blue-100 text-blue-700",
  Training:    "bg-green-100 text-green-700",
  Forum:       "bg-purple-100 text-purple-700",
  Orientation: "bg-amber-100 text-amber-700",
  Workshop:    "bg-teal-100 text-teal-700",
  Webinar:     "bg-rose-100 text-rose-700",
};

export default async function EventsPage() {
  const all = (await getEvents())
    .filter((e) => e.published)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const now = new Date();
  const upcoming = all.filter((e) => new Date(e.date) >= now);
  const past     = all.filter((e) => new Date(e.date) < now);

  return (
    <PageLayout>
      <div className="bg-cbi-blue-dark relative overflow-hidden py-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cbi-yellow/10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-cbi-yellow font-semibold text-sm flex items-center gap-2 mb-3">
            <span className="w-6 h-0.5 bg-cbi-yellow inline-block" /> What&apos;s Happening
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Events</h1>
          <p className="mt-4 text-blue-200 max-w-2xl leading-relaxed">Conferences, trainings, forums, and community events organized by Care Best Initiative.</p>
        </div>
      </div>

      <div className="py-16 bg-bg transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Upcoming Events */}
          {upcoming.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                <h2 className="text-2xl font-bold text-fg">Upcoming Events</h2>
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  {upcoming.length} upcoming
                </span>
              </div>
              <div className="space-y-5">
                {upcoming.map((e) => <EventCard key={e.id} event={e} upcoming />)}
              </div>
            </div>
          )}

          {/* Past Events */}
          {past.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-5 h-5 text-fg3 flex-shrink-0" />
                <h2 className="text-2xl font-bold text-fg">Past Events</h2>
                <span className="ml-auto px-3 py-1 bg-muted text-fg3 text-xs font-semibold rounded-full">
                  {past.length} completed
                </span>
              </div>
              <div className="space-y-5 opacity-80">
                {past.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </div>
          )}

          {all.length === 0 && (
            <div className="text-center py-24">
              <CalendarDays className="w-16 h-16 text-fg3 mx-auto mb-4" />
              <h3 className="font-bold text-fg text-xl mb-2">No Events Yet</h3>
              <p className="text-fg2">Check back soon for upcoming events and activities.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

function EventCard({ event, upcoming = false }: { event: Event; upcoming?: boolean }) {
  const d = new Date(event.date);
  return (
    <div className={`bg-surface border ${upcoming ? "border-cbi-blue/30 shadow-sm" : "border-border"} rounded-2xl overflow-hidden hover:shadow-lg transition-all`}>
      <div className="flex gap-0 items-stretch">
        {/* Date column */}
        <div className={`flex-shrink-0 w-20 flex flex-col items-center justify-center py-5 px-2 text-center ${upcoming ? "bg-cbi-blue" : "bg-muted"}`}>
          <div className={`text-3xl font-black ${upcoming ? "text-white" : "text-fg3"}`}>
            {d.getDate()}
          </div>
          <div className={`text-xs font-bold uppercase tracking-wide ${upcoming ? "text-blue-200" : "text-fg3"}`}>
            {d.toLocaleDateString("en-GB", { month: "short" })}
          </div>
          <div className={`text-xs mt-0.5 ${upcoming ? "text-blue-300" : "text-fg3"}`}>
            {d.getFullYear()}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 p-5">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeCls[event.type] ?? "bg-muted text-fg2"}`}>
              <Tag className="w-3 h-3" />{event.type}
            </span>
            {upcoming && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Upcoming
              </span>
            )}
          </div>
          <h3 className="font-bold text-fg text-base mb-1.5">{event.title}</h3>
          <p className="text-fg2 text-sm leading-relaxed mb-3">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-fg3">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex-shrink-0 flex items-center pr-5 pl-2">
          {upcoming ? (
            <a
              href={`mailto:info@cbi.ngo?subject=Register for Event: ${encodeURIComponent(event.title)}&body=I would like to register for the event "${event.title}" on ${event.date} at ${event.location}.%0D%0A%0D%0APlease confirm my registration.`}
              className="inline-flex flex-col items-center gap-1.5 px-4 py-3 bg-cbi-blue text-white rounded-xl text-xs font-semibold hover:bg-cbi-blue-dark transition-colors text-center whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              Register
            </a>
          ) : (
            <Link
              href="/gallery"
              className="inline-flex flex-col items-center gap-1.5 px-4 py-3 bg-muted border border-border text-fg2 rounded-xl text-xs font-semibold hover:bg-border transition-colors text-center whitespace-nowrap"
            >
              <Images className="w-4 h-4" />
              View Photos
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
