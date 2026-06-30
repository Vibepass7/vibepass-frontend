import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { categories, events } from "@/lib/data";

export default function HomePage() {
  const featured = events.filter((e) => e.featured);
  const trending = events.filter((e) => e.trending).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grain absolute inset-0 opacity-60" />
        <div className="shell relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="eyebrow">Live events · {events.length} on sale now</p>
            <h1 className="mt-5 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              The night out
              <br />
              starts <span className="text-accent">here.</span>
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted">
              Concerts, festivals, conferences and matchdays — all in one place, with honest
              pricing and tickets that just work.
            </p>

            <form
              action="/events"
              className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-ink/15 bg-surface p-1.5 shadow-card focus-within:border-ink/40"
            >
              <Search className="ml-3 h-4 w-4 shrink-0 text-faint" />
              <input
                name="q"
                placeholder="Search artists, venues, cities…"
                className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Search
              </Button>
            </form>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-pine" /> Verified resale
              </span>
              <span className="flex items-center gap-1.5">
                <Ticket className="h-4 w-4 text-pine" /> Instant mobile tickets
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-pine" /> No surprise fees
              </span>
            </div>
          </div>

          {/* Hero collage */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                {featured.slice(0, 1).map((e) => (
                  <HeroTile key={e.id} src={e.image} title={e.title} sub={e.city} tall />
                ))}
                {featured.slice(1, 2).map((e) => (
                  <HeroTile key={e.id} src={e.image} title={e.title} sub={e.city} />
                ))}
              </div>
              <div className="space-y-4">
                {featured.slice(2, 3).map((e) => (
                  <HeroTile key={e.id} src={e.image} title={e.title} sub={e.city} />
                ))}
                {trending.slice(0, 1).map((e) => (
                  <HeroTile key={e.id} src={e.image} title={e.title} sub={e.city} tall />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="shell py-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Find your scene</h2>
            <p className="mt-2 text-muted">Six worlds, one pass.</p>
          </div>
          <Link href="/events" className="link-underline hidden text-sm font-medium text-ink sm:block">
            All events
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/events?cat=${c.name}`}
              className="group rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-ink/30 hover:shadow-card"
            >
              <div className="font-serif text-base font-semibold text-ink">{c.name}</div>
              <div className="mt-1 text-xs leading-snug text-muted">{c.blurb}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured events */}
      <section className="shell pb-4">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold sm:text-3xl">On sale now</h2>
          <Link href="/events" className="link-underline text-sm font-medium text-ink">
            See all
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {events.slice(0, 4).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="shell py-20">
        <div className="rounded-2xl border border-line bg-surface p-8 shadow-card sm:p-12">
          <div className="max-w-xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">
              From “let’s go” to “we’re in” in three steps.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { n: "01", t: "Discover", d: "Browse curated events near you, with real availability — never a sold-out surprise at checkout." },
              { n: "02", t: "Reserve", d: "Pick your seats or tier. We hold them for ten minutes so you can finish without the rush." },
              { n: "03", t: "Walk in", d: "Your ticket lands in your wallet instantly. Scan at the door — that’s the whole thing." },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-serif text-3xl font-semibold text-accent">{s.n}</div>
                <h3 className="mt-3 font-serif text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizer CTA */}
      <section className="shell pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-14 text-paper sm:px-14">
          <div className="grain absolute inset-0 opacity-[0.08]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft">
                For organizers
              </p>
              <h2 className="mt-4 max-w-lg font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                Sell out the room. Keep more of the door.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/70">
                Set up an event in minutes, track sales in real time, and check guests in from your
                phone. Flat fees, no lock-in.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href="/organizer" variant="primary" size="lg">
                Open the dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HeroTile({ src, title, sub, tall }: { src: string; title: string; sub: string; tall?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line shadow-card ${
        tall ? "aspect-[3/4]" : "aspect-square"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
        <div className="text-sm font-medium leading-tight text-paper">{title}</div>
        <div className="text-xs text-paper/70">{sub}</div>
      </div>
    </div>
  );
}
