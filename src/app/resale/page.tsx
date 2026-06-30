import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ListTicketDialog } from "@/components/list-ticket-dialog";
import { resaleListings } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Resale Marketplace — VibePass",
};

export default function ResalePage() {
  return (
    <div className="shell py-10">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="eyebrow">Verified resale</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
            Tickets from real fans, capped at face value.
          </h1>
          <p className="mt-3 text-muted">
            Plans changed? Pass your ticket on — or pick up one that someone couldn’t use. Every
            listing is verified and price-capped, so nobody gets gouged.
          </p>
        </div>
        <ListTicketDialog />
      </div>

      {/* Trust strip */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, t: "Verified transfers", d: "Each ticket is re-issued to the buyer — no screenshots." },
          { icon: BadgeCheck, t: "Face-value cap", d: "Sellers can’t list above the original price." },
          { icon: ArrowRight, t: "Instant delivery", d: "The new ticket lands in your wallet on purchase." },
        ].map((f) => (
          <div key={f.t} className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pine/10 text-pine">
              <f.icon className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-medium text-ink">{f.t}</div>
              <div className="text-[13px] leading-snug text-muted">{f.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-serif text-xl font-semibold">{resaleListings.length} listings available</h2>
        <span className="text-[13px] text-muted">Updated moments ago</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {resaleListings.map((r) => {
          const below = r.resalePrice < r.faceValue;
          return (
            <div
              key={r.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.eventTitle} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3">
                  <Badge tone="pine" className="bg-paper/90 backdrop-blur">
                    <BadgeCheck className="mr-1 h-3 w-3" /> Verified
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <Badge tone="neutral">{r.category}</Badge>
                  <span className="text-[12px] text-muted">{r.qty} available</span>
                </div>
                <h3 className="mt-2.5 font-serif text-[16px] font-semibold leading-snug">
                  {r.eventTitle}
                </h3>
                <div className="mt-1.5 space-y-1 text-[13px] text-muted">
                  <div>{r.ticketName}</div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {r.venue}, {r.city} · {format(new Date(r.date), "MMM d")}
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between border-t border-line pt-3.5">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl font-semibold">{formatPrice(r.resalePrice)}</span>
                      {below && (
                        <span className="text-[13px] text-faint line-through">{formatPrice(r.faceValue)}</span>
                      )}
                    </div>
                    <div className="text-[11px] text-muted">listed by {r.seller}</div>
                  </div>
                  <Link
                    href={`/events/${r.eventSlug}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-medium text-paper hover:bg-ink/90"
                  >
                    Buy
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
