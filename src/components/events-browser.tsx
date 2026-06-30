"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { EventCard } from "@/components/event-card";
import { categories, eventFromLow, events, type Category } from "@/lib/data";
import { cn } from "@/lib/utils";

type Sort = "soon" | "price-low" | "price-high";

export function EventsBrowser({ initialCat, initialQuery }: { initialCat?: string; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery ?? "");
  const [cat, setCat] = useState<Category | "All">(
    (categories.find((c) => c.name === initialCat)?.name as Category) ?? "All",
  );
  const [sort, setSort] = useState<Sort>("soon");

  const results = useMemo(() => {
    let list = events.filter((e) => {
      const matchesCat = cat === "All" || e.category === cat;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        [e.title, e.venue, e.city, e.country, e.category, e.organizer]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCat && matchesQuery;
    });
    list = [...list].sort((a, b) => {
      if (sort === "soon") return +new Date(a.date) - +new Date(b.date);
      if (sort === "price-low") return eventFromLow(a) - eventFromLow(b);
      return eventFromLow(b) - eventFromLow(a);
    });
    return list;
  }, [query, cat, sort]);

  return (
    <div className="shell py-10">
      <div className="max-w-2xl">
        <p className="eyebrow">Browse</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">What are you in the mood for?</h1>
        <p className="mt-3 text-muted">
          {results.length} {results.length === 1 ? "event" : "events"} match your search.
        </p>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-ink/15 bg-surface px-3.5 py-1 focus-within:border-ink/40">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists, venues, cities…"
            className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-faint"
          />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4 text-faint" />
          <span className="text-muted">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm outline-none focus:border-ink/40"
          >
            <option value="soon">Date — soonest</option>
            <option value="price-low">Price — low to high</option>
            <option value="price-high">Price — high to low</option>
          </select>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={cat === "All"} onClick={() => setCat("All")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.name} active={cat === c.name} onClick={() => setCat(c.name)}>
            {c.name}
          </Chip>
        ))}
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-line py-20 text-center">
          <p className="font-serif text-xl text-ink">Nothing here yet</p>
          <p className="mt-2 text-sm text-muted">Try a different search or clear your filters.</p>
          <button
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
            className="mt-5 text-sm font-medium text-accent-ink hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line bg-surface text-muted hover:border-ink/30 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}
