"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Clock, Minus, Plus, Tag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/utils";

const PROMO: Record<string, number> = { VIBE10: 0.1, FIRST: 0.15 };

export default function CartPage() {
  const { lines, setQty, remove, subtotal, count } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState<{ code: string; rate: number } | null>(null);
  const [secs, setSecs] = useState(600);

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [count]);

  const fee = Math.round(subtotal * 0.06);
  const discount = applied ? Math.round(subtotal * applied.rate) : 0;
  const total = Math.max(0, subtotal + fee - discount);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  if (count === 0) {
    return (
      <div className="shell flex flex-col items-center py-28 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-ink/5">
          <Tag className="h-6 w-6 text-faint" />
        </div>
        <h1 className="mt-5 font-serif text-2xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 max-w-sm text-muted">
          Once you reserve tickets they’ll show up here, held for ten minutes.
        </p>
        <Button href="/events" className="mt-6">
          Browse events
        </Button>
      </div>
    );
  }

  return (
    <div className="shell py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">Your reservation</h1>
        <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-sm font-medium text-accent-ink">
          <Clock className="h-4 w-4" />
          Held for {mm}:{ss}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Lines */}
        <div className="space-y-3">
          {lines.map((l) => (
            <div
              key={l.eventId + l.ticketId}
              className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4"
            >
              <div className="min-w-0">
                <div className="truncate font-medium text-ink">{l.eventTitle}</div>
                <div className="text-[13px] text-muted">
                  {l.ticketName} · {format(new Date(l.eventDate), "MMM d")} · {l.venue}
                </div>
                <div className="mt-1 text-[13px] font-medium text-ink">{formatPrice(l.price)} each</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setQty(l.eventId, l.ticketId, l.qty - 1)}
                    className="grid h-7 w-7 place-items-center rounded-full border border-line hover:border-ink/40"
                    aria-label="Decrease"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm font-medium tabular-nums">{l.qty}</span>
                  <button
                    onClick={() => setQty(l.eventId, l.ticketId, l.qty + 1)}
                    className="grid h-7 w-7 place-items-center rounded-full border border-line hover:border-ink/40"
                    aria-label="Increase"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button
                  onClick={() => remove(l.eventId, l.ticketId)}
                  className="flex items-center gap-1 text-xs text-faint hover:text-accent-ink"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <h2 className="font-serif text-lg font-semibold">Order summary</h2>

            <div className="mt-4 flex gap-2">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value.toUpperCase())}
                placeholder="Promo code"
                className="field"
              />
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  const rate = PROMO[promo];
                  setApplied(rate ? { code: promo, rate } : null);
                }}
              >
                Apply
              </Button>
            </div>
            {applied && (
              <p className="mt-2 text-[13px] text-pine">
                Code {applied.code} applied — {Math.round(applied.rate * 100)}% off
              </p>
            )}
            {promo && !PROMO[promo] && !applied && (
              <p className="mt-2 text-[13px] text-muted">Try VIBE10 or FIRST.</p>
            )}

            <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Service fee" value={formatPrice(fee)} />
              {discount > 0 && <Row label="Discount" value={`– ${formatPrice(discount)}`} accent />}
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-medium">Total</span>
              <span className="font-serif text-2xl font-semibold">{formatPrice(total)}</span>
            </div>

            <Button href="/checkout" className="mt-5 w-full" size="lg">
              Checkout
            </Button>
            <Link
              href="/events"
              className="mt-3 block text-center text-sm text-muted hover:text-ink"
            >
              Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent ? "font-medium text-pine" : "font-medium text-ink"}>{value}</dd>
    </div>
  );
}
