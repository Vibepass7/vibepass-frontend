import Link from "next/link";
import { format } from "date-fns";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { eventFromLow, soldRatio, type EventItem } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export function EventCard({ event }: { event: EventItem }) {
  const ratio = soldRatio(event);
  const almostGone = ratio > 0.85;
  const d = new Date(event.date);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone="neutral" className="bg-paper/90 backdrop-blur">
            {event.category}
          </Badge>
          {almostGone && <Badge tone="accent">Almost gone</Badge>}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-3">
          <div className="rounded-lg bg-paper px-2.5 py-1.5 text-center leading-none shadow-sm">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-accent-ink">
              {format(d, "MMM")}
            </div>
            <div className="font-serif text-lg font-semibold text-ink">{format(d, "d")}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-[17px] font-semibold leading-snug text-ink">
          {event.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-muted">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          {event.venue}, {event.city}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
          <span className="text-sm text-muted">
            from <span className="font-semibold text-ink">{formatPrice(eventFromLow(event))}</span>
          </span>
          <span className="text-[13px] font-medium text-accent-ink transition-transform group-hover:translate-x-0.5">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
