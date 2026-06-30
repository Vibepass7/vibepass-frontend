"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarPlus, Check, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QrBlock } from "@/components/qr-block";
import { formatPrice } from "@/lib/utils";
import type { CartLine } from "@/components/cart-provider";

type Order = {
  id: string;
  lines: CartLine[];
  total: number;
  buyer: string;
  email: string;
  placedAt: string;
};

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("vibepass.lastOrder");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  if (!order) {
    return (
      <div className="shell py-28 text-center">
        <h1 className="font-serif text-2xl font-semibold">No recent order</h1>
        <p className="mt-2 text-muted">Looks like you haven’t completed a purchase yet.</p>
        <Button href="/events" className="mt-6">Browse events</Button>
      </div>
    );
  }

  return (
    <div className="shell py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine/10">
          <Check className="h-7 w-7 text-pine" />
        </div>
        <h1 className="mt-5 font-serif text-3xl font-semibold sm:text-4xl">You’re going.</h1>
        <p className="mt-3 text-muted">
          Order <span className="font-medium text-ink">{order.id}</span> is confirmed. We’ve emailed
          your tickets to <span className="font-medium text-ink">{order.email}</span>.
        </p>
      </div>

      {/* Tickets */}
      <div className="mx-auto mt-10 max-w-2xl space-y-5">
        {order.lines.map((l, i) => (
          <div
            key={l.eventId + l.ticketId}
            className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
          >
            <div className="flex items-stretch">
              <div className="flex-1 p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-ink">
                  {l.ticketName}{l.qty > 1 ? ` · ${l.qty} tickets` : ""}
                </div>
                <h3 className="mt-2 font-serif text-xl font-semibold leading-snug">{l.eventTitle}</h3>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-faint">Date</div>
                    <div className="font-medium">{format(new Date(l.eventDate), "EEE, MMM d · h:mm a")}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-faint">Venue</div>
                    <div className="font-medium">{l.venue}</div>
                  </div>
                </div>
              </div>
              {/* Perforation */}
              <div className="relative w-px bg-line">
                <span className="absolute -top-2.5 -left-2.5 h-5 w-5 rounded-full bg-paper" />
                <span className="absolute -bottom-2.5 -left-2.5 h-5 w-5 rounded-full bg-paper" />
              </div>
              <div className="grid w-36 place-items-center bg-paper p-4">
                <QrBlock seed={order.id + l.ticketId + i} />
                <div className="mt-2 text-[10px] tracking-wide text-faint">{order.id}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-3">
        <Button href="/tickets" variant="ink" size="lg">
          View in my tickets
        </Button>
        <button className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 text-sm font-medium hover:border-ink/40">
          <CalendarPlus className="h-4 w-4" /> Add to calendar
        </button>
        <button className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-surface px-5 text-sm font-medium hover:border-ink/40">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-line bg-surface p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Total paid</span>
          <span className="font-serif text-lg font-semibold">{formatPrice(order.total)}</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted">
          <Mail className="h-4 w-4" /> A receipt is on its way to your inbox.
        </p>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Changed your mind?{" "}
        <Link href="/events" className="link-underline font-medium text-ink">
          Keep browsing
        </Link>
      </p>
    </div>
  );
}
