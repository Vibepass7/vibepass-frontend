import Link from "next/link";
import { Ticket } from "lucide-react";

const cols = [
  {
    title: "Discover",
    links: [
      { label: "Browse events", href: "/events" },
      { label: "Festivals", href: "/events?cat=Festival" },
      { label: "Conferences", href: "/events?cat=Conference" },
      { label: "Resale marketplace", href: "/resale" },
    ],
  },
  {
    title: "Organizers",
    links: [
      { label: "Create an event", href: "/organizer/events/new" },
      { label: "Dashboard", href: "/organizer" },
      { label: "Check-in tools", href: "/organizer/checkin" },
      { label: "Sign in", href: "/login" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Help center", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper">
              <Ticket className="h-4 w-4" />
            </span>
            <span className="font-serif text-lg font-semibold">VibePass</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            A calmer way to discover live events and a fairer way to sell them. Built for the
            people on both sides of the door.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-faint">
              {c.title}
            </h4>
            <ul className="mt-4 space-y-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-xs text-faint sm:flex-row">
          <p>© {2026} VibePass. A demo experience.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-ink">Privacy</Link>
            <Link href="/" className="hover:text-ink">Terms</Link>
            <Link href="/" className="hover:text-ink">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
