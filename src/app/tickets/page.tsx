"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, QrCode, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrBlock } from "@/components/qr-block";
import { events } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { CartLine } from "@/components/cart-provider";

type Held = {
  id: string;
  eventTitle: string;
  ticketName: string;
  date: string;
  venue: string;
  image: string;
  qty: number;
};

// A couple of pre-owned demo tickets so the wallet isn't empty on first visit.
const seeded: Held[] = [
  {
    id: "VP-580114",
    eventTitle: events[2].title,
    ticketName: "3-Day GA",
    date: events[2].date,
    venue: `${events[2].venue}, ${events[2].city}`,
    image: events[2].image,
    qty: 2,
  },
  {
    id: "VP-470992",
    eventTitle: events[1].title,
    ticketName: "Conference Pass",
    date: events[1].date,
    venue: `${events[1].venue}, ${events[1].city}`,
    image: events[1].image,
    qty: 1,
  },
];

export default function TicketsPage() {
  const [held, setHeld] = useState<Held[]>(seeded);
  const [active, setActive] = useState<Held | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vibepass.lastOrder");
      if (!raw) return;
      const order = JSON.parse(raw) as { id: string; lines: CartLine[] };
      const fromOrder: Held[] = order.lines.map((l) => {
        const ev = events.find((e) => e.id === l.eventId);
        return {
          id: order.id,
          eventTitle: l.eventTitle,
          ticketName: l.ticketName,
          date: l.eventDate,
          venue: l.venue,
          image: ev?.image ?? events[0].image,
          qty: l.qty,
        };
      });
      setHeld((prev) => {
        const seen = new Set(prev.map((p) => p.id + p.ticketName));
        const extra = fromOrder.filter((f) => !seen.has(f.id + f.ticketName));
        return [...extra, ...prev];
      });
    } catch {}
  }, []);

  return (
    <div className="shell py-10">
      <p className="eyebrow">Your wallet</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">My tickets</h1>
      <p className="mt-3 text-muted">Tap any ticket to show its code at the door.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {held.map((t) => (
          <button
            key={t.id + t.ticketName}
            onClick={() => setActive(t)}
            className="group flex items-stretch overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="relative w-28 shrink-0 sm:w-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.image} alt={t.eventTitle} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-center justify-between">
                <Badge tone="accent">{t.ticketName}</Badge>
                <span className="text-[11px] text-faint">{t.qty} ×</span>
              </div>
              <h3 className="mt-2 font-serif text-base font-semibold leading-snug">{t.eventTitle}</h3>
              <div className="mt-auto space-y-1 pt-3 text-[13px] text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {format(new Date(t.date), "EEE, MMM d · h:mm a")}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {t.venue}
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-[13px] font-medium text-accent-ink">
                <QrCode className="h-4 w-4" /> Show ticket
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-line p-6 text-center">
        <p className="text-sm text-muted">Looking for something new?</p>
        <Button href="/events" variant="outline" className="mt-3">
          Discover events
        </Button>
      </div>

      {/* QR modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-surface p-7 text-center shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
              {active.ticketName}
            </div>
            <h3 className="mt-1.5 font-serif text-xl font-semibold">{active.eventTitle}</h3>
            <p className="mt-1 text-sm text-muted">
              {format(new Date(active.date), "EEE, MMM d · h:mm a")}
            </p>
            <div className="mt-6 grid place-items-center">
              <div className="rounded-2xl border border-line p-4">
                <QrBlock seed={active.id + active.ticketName} size={180} />
              </div>
            </div>
            <p className="mt-4 text-sm font-medium tracking-wide text-ink">{active.id}</p>
            <p className="mt-1 text-[12px] text-muted">Present this code at entry</p>
          </div>
        </div>
      )}
    </div>
  );
}
