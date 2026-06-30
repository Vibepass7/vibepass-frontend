import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TicketPicker } from "@/components/ticket-picker";
import { EventCard } from "@/components/event-card";
import { events, getEvent } from "@/lib/data";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const d = new Date(event.date);
  const related = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-line">
        <div className="shell flex items-center gap-2 py-3 text-[13px] text-muted">
          <Link href="/events" className="hover:text-ink">Events</Link>
          <span className="text-faint">/</span>
          <Link href={`/events?cat=${event.category}`} className="hover:text-ink">
            {event.category}
          </Link>
          <span className="text-faint">/</span>
          <span className="truncate text-ink">{event.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="shell pt-8">
        <div className="relative overflow-hidden rounded-2xl border border-line shadow-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.title} className="h-[300px] w-full object-cover sm:h-[420px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
            <div className="flex gap-2">
              <Badge tone="accent">{event.category}</Badge>
              {event.trending && <Badge className="bg-paper/90">Trending</Badge>}
            </div>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold text-paper sm:text-5xl">
              {event.title}
            </h1>
            <p className="mt-2 max-w-xl text-paper/80">{event.tagline}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="shell grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          {/* Meta strip */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-4">
            <Meta icon={<CalendarDays className="h-4 w-4" />} label="Date" value={format(d, "EEE, MMM d")} />
            <Meta icon={<Clock className="h-4 w-4" />} label="Doors" value={event.doors ?? format(d, "h:mm a")} />
            <Meta icon={<MapPin className="h-4 w-4" />} label="Venue" value={event.venue} />
            <Meta icon={<Users className="h-4 w-4" />} label="By" value={event.organizer} />
          </div>

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold">About this event</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-muted">
              {event.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {event.lineup && (
            <section className="mt-10">
              <h2 className="font-serif text-xl font-semibold">
                {event.category === "Conference" ? "On the agenda" : "Line-up"}
              </h2>
              <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
                {event.lineup.map((l, i) => (
                  <li key={l} className="flex items-center gap-4 px-5 py-3.5">
                    <span className="font-serif text-sm text-faint tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-ink">{l}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h2 className="font-serif text-xl font-semibold">Venue</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <div className="flex items-center justify-between bg-surface px-5 py-4">
                <div>
                  <div className="font-medium text-ink">{event.venue}</div>
                  <div className="text-sm text-muted">
                    {event.city}, {event.country}
                  </div>
                </div>
                <MapPin className="h-5 w-5 text-faint" />
              </div>
              <div className="grain grid h-40 place-items-center border-t border-line bg-paper text-sm text-faint">
                Interactive map preview
              </div>
            </div>
          </section>
        </div>

        {/* Sticky picker */}
        <div>
          <div className="lg:sticky lg:top-24">
            <TicketPicker event={event} />
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[13px] text-muted">
              <ShieldCheck className="h-4 w-4 text-pine" /> Secure checkout · Verified resale
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="shell pb-4">
          <h2 className="font-serif text-2xl font-semibold">More {event.category.toLowerCase()}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-faint">
        {icon}
        {label}
      </div>
      <div className="mt-1 truncate font-medium text-ink">{value}</div>
    </div>
  );
}
