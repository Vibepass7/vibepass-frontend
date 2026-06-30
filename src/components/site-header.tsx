"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, Ticket, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/events", label: "Browse" },
  { href: "/events?cat=Festival", label: "Festivals" },
  { href: "/resale", label: "Resale" },
  { href: "/organizer", label: "For organizers" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper">
            <Ticket className="h-4 w-4" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">VibePass</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "text-sm text-muted transition-colors hover:text-ink",
                pathname === n.href && "text-ink",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/tickets"
            className="hidden rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink lg:block"
          >
            My tickets
          </Link>
          <Link
            href="/login"
            className="hidden rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-10 items-center gap-2 rounded-full border border-ink/15 bg-surface px-4 text-sm font-medium transition-colors hover:border-ink/40"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-semibold text-paper">
                {count}
              </span>
            )}
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="shell flex flex-col py-3">
            {[...nav, { href: "/tickets", label: "My tickets" }, { href: "/login", label: "Sign in" }].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm text-muted hover:text-ink"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
