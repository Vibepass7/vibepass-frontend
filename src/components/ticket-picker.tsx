"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { ticketsLeft, type EventItem } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

export function TicketPicker({ event }: { event: EventItem }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [added, setAdded] = useState(false);

  const total = useMemo(
    () =>
      event.tickets.reduce((sum, t) => sum + (qty[t.id] ?? 0) * t.price, 0),
    [qty, event.tickets],
  );
  const count = Object.values(qty).reduce((a, b) => a + b, 0);

  const bump = (id: string, delta: number, max: number) =>
    setQty((q) => {
      const next = Math.min(max, Math.max(0, (q[id] ?? 0) + delta));
      return { ...q, [id]: next };
    });

  const addToCart = () => {
    event.tickets.forEach((t) => {
      const n = qty[t.id] ?? 0;
      if (n > 0) {
        add({
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.date,
          venue: `${event.venue}, ${event.city}`,
          ticketId: t.id,
          ticketName: t.name,
          price: t.price,
          qty: n,
        });
      }
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 550);
  };

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-lg font-semibold">Choose tickets</h3>
        <span className="text-xs text-muted">Held 10 min at checkout</span>
      </div>

      <div className="mt-4 space-y-3">
        {event.tickets.map((t) => {
          const left = ticketsLeft(t);
          const soldOut = left === 0;
          const n = qty[t.id] ?? 0;
          return (
            <div
              key={t.id}
              className={cn(
                "rounded-xl border p-3.5 transition-colors",
                n > 0 ? "border-ink/40 bg-paper" : "border-line",
                soldOut && "opacity-55",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-ink">{t.name}</div>
                  <div className="text-[13px] text-muted">{t.blurb}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-ink">{formatPrice(t.price)}</div>
                  {!soldOut && left < 60 && (
                    <div className="text-[11px] font-medium text-accent-ink">{left} left</div>
                  )}
                </div>
              </div>

              {t.perks && (
                <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-center gap-1 text-[12px] text-muted">
                      <Check className="h-3 w-3 text-pine" /> {p}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-3 flex items-center justify-between">
                {soldOut ? (
                  <span className="text-xs font-medium uppercase tracking-wide text-faint">
                    Sold out
                  </span>
                ) : (
                  <span className="text-xs text-faint">Max 8 per order</span>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => bump(t.id, -1, Math.min(8, left))}
                    disabled={n === 0}
                    className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink disabled:opacity-30 hover:border-ink/40"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm font-medium tabular-nums">{n}</span>
                  <button
                    onClick={() => bump(t.id, 1, Math.min(8, left))}
                    disabled={soldOut || n >= Math.min(8, left)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink disabled:opacity-30 hover:border-ink/40"
                    aria-label="Increase"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div>
          <div className="text-xs text-muted">Subtotal</div>
          <div className="font-serif text-xl font-semibold">{formatPrice(total)}</div>
        </div>
        <Button onClick={addToCart} disabled={count === 0} size="lg">
          {added ? "Added ✓" : count > 0 ? `Reserve ${count}` : "Select tickets"}
        </Button>
      </div>
    </div>
  );
}
