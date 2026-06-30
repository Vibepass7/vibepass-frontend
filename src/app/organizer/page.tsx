import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Plus,
  QrCode,
  Settings,
  Ticket,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dashboard } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const nav = [
  { label: "Overview", icon: BarChart3, href: "/organizer", active: true },
  { label: "Events", icon: CalendarDays, href: "/organizer/events/new" },
  { label: "Attendees", icon: Users, href: "/organizer/checkin" },
  { label: "Check-in", icon: QrCode, href: "/organizer/checkin" },
  { label: "Settings", icon: Settings, href: "/organizer" },
];

export default function OrganizerPage() {
  const { kpis, salesByDay, channels, managed } = dashboard;
  const peak = Math.max(...salesByDay.map((d) => d.value));

  return (
    <div className="shell py-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Organizer</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Good morning, Foundry Live</h1>
          <p className="mt-2 text-muted">Here’s how your events are tracking this week.</p>
        </div>
        <Button href="/organizer/events/new" size="lg">
          <Plus className="h-4 w-4" /> Create event
        </Button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Side nav */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="flex gap-1 overflow-x-auto rounded-xl border border-line bg-surface p-1.5 lg:flex-col">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  n.active ? "bg-ink text-paper" : "text-muted hover:bg-ink/5 hover:text-ink"
                }`}
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-6">
          {/* KPIs */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Kpi icon={<TrendingUp className="h-4 w-4" />} label="Revenue (30d)" value={formatPrice(kpis.revenue)} delta="+12.4%" />
            <Kpi icon={<Ticket className="h-4 w-4" />} label="Tickets sold" value={kpis.ticketsSold.toLocaleString()} delta="+8.1%" />
            <Kpi icon={<CalendarDays className="h-4 w-4" />} label="Active events" value={String(kpis.activeEvents)} />
            <Kpi icon={<Users className="h-4 w-4" />} label="Avg. fill rate" value={`${Math.round(kpis.avgFill * 100)}%`} delta="+3.0%" />
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* Sales chart */}
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-semibold">Sales this week</h2>
                <span className="text-[13px] text-muted">tickets / day</span>
              </div>
              <div className="mt-6 flex items-end justify-between gap-3">
                {salesByDay.map((d) => (
                  <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[11px] tabular-nums text-faint">{d.value}</span>
                    <div className="flex h-36 w-full items-end" title={`${d.value} tickets`}>
                      <div
                        className="w-full rounded-t-md bg-accent/85 transition-all hover:bg-accent"
                        style={{ height: `${Math.max(6, (d.value / peak) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[12px] text-muted">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className="rounded-2xl border border-line bg-surface p-6">
              <h2 className="font-serif text-lg font-semibold">Where sales come from</h2>
              <div className="mt-6 space-y-4">
                {channels.map((c) => (
                  <div key={c.label}>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink">{c.label}</span>
                      <span className="font-medium text-muted">{c.value}%</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-ink/5">
                      <div className="h-full rounded-full bg-pine" style={{ width: `${c.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Managed events */}
          <div className="rounded-2xl border border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="font-serif text-lg font-semibold">Your events</h2>
              <Link href="/organizer" className="link-underline text-sm font-medium text-ink">
                Manage all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="text-left text-[12px] uppercase tracking-wide text-faint">
                    <th className="px-6 py-3 font-medium">Event</th>
                    <th className="px-3 py-3 font-medium">Date</th>
                    <th className="px-3 py-3 font-medium">Sold</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 text-right font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {managed.map((e) => {
                    const pct = e.capacity ? Math.round((e.sold / e.capacity) * 100) : 0;
                    return (
                      <tr key={e.title} className="hover:bg-paper/60">
                        <td className="px-6 py-4 font-medium text-ink">{e.title}</td>
                        <td className="px-3 py-4 text-muted">{e.date}</td>
                        <td className="px-3 py-4">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink/5">
                              <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[12px] tabular-nums text-muted">{pct}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <Badge
                            tone={
                              e.status === "Draft"
                                ? "outline"
                                : e.status === "Selling fast"
                                  ? "accent"
                                  : "pine"
                            }
                          >
                            {e.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right font-medium tabular-nums">
                          {e.revenue ? formatPrice(e.revenue) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-center text-[13px] text-muted">
            This is a demo dashboard with sample data.{" "}
            <Link href="/" className="link-underline font-medium text-ink">
              Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  delta,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink/5 text-ink">{icon}</span>
        {delta && (
          <span className="inline-flex items-center gap-0.5 text-[12px] font-medium text-pine">
            <ArrowUpRight className="h-3.5 w-3.5" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4 font-serif text-2xl font-semibold">{value}</div>
      <div className="mt-0.5 text-[13px] text-muted">{label}</div>
    </div>
  );
}
