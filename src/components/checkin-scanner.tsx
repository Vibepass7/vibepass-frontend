"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  Check,
  ScanLine,
  TriangleAlert,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { checkinEvent, checkinQueue, type Attendee } from "@/lib/data";
import { cn } from "@/lib/utils";

type Scan = { attendee: Attendee; at: number; status: "ok" | "dup" };

export function CheckinScanner() {
  const [queue, setQueue] = useState<Attendee[]>(checkinQueue);
  const [count, setCount] = useState(checkinEvent.checkedIn);
  const [log, setLog] = useState<Scan[]>([]);
  const [flash, setFlash] = useState<"ok" | "dup" | null>(null);
  const [manual, setManual] = useState("");
  const [scanned, setScanned] = useState<Set<string>>(new Set());

  const pct = Math.round((count / checkinEvent.capacity) * 100);

  const admit = (a: Attendee) => {
    const dup = scanned.has(a.code);
    const status: Scan["status"] = dup ? "dup" : "ok";
    setFlash(status);
    setTimeout(() => setFlash(null), 700);
    setLog((l) => [{ attendee: a, at: Date.now(), status }, ...l].slice(0, 8));
    if (!dup) {
      setScanned((s) => new Set(s).add(a.code));
      setCount((c) => c + 1);
    }
  };

  const simulate = () => {
    if (queue.length === 0) return;
    const [next, ...rest] = queue;
    setQueue(rest);
    admit(next);
  };

  const submitManual = (e: React.FormEvent) => {
    e.preventDefault();
    const code = manual.trim().toUpperCase();
    if (!code) return;
    const found =
      checkinQueue.find((a) => a.code === code) ??
      ({ id: "m" + code, name: "Guest", ticketType: "General Admission", code } as Attendee);
    admit(found);
    setManual("");
  };

  return (
    <div className="shell py-8">
      <Link
        href="/organizer"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Door check-in</p>
          <h1 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">{checkinEvent.title}</h1>
          <p className="mt-1.5 text-sm text-muted">
            {checkinEvent.venue} · {format(new Date(checkinEvent.date), "EEE, MMM d")}
          </p>
        </div>
        <Badge tone="pine">● Live</Badge>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Scanner */}
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div
            className={cn(
              "relative grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border-2 border-dashed transition-colors",
              flash === "ok" && "border-pine bg-pine/10",
              flash === "dup" && "border-accent bg-accent-soft",
              !flash && "border-line bg-ink",
            )}
          >
            {flash === "ok" ? (
              <div className="text-center text-pine">
                <Check className="mx-auto h-14 w-14" />
                <p className="mt-2 font-serif text-xl font-semibold">Admitted</p>
              </div>
            ) : flash === "dup" ? (
              <div className="text-center text-accent-ink">
                <TriangleAlert className="mx-auto h-14 w-14" />
                <p className="mt-2 font-serif text-xl font-semibold">Already scanned</p>
              </div>
            ) : (
              <>
                <ScanLine className="h-16 w-16 text-paper/30" />
                <div className="absolute inset-x-8 top-1/2 h-0.5 animate-pulse bg-accent/70" />
                <p className="absolute bottom-4 text-[13px] text-paper/50">
                  Point camera at the ticket QR
                </p>
              </>
            )}
          </div>

          <button
            onClick={simulate}
            disabled={queue.length === 0}
            className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper transition-colors hover:bg-ink/90 disabled:opacity-40"
          >
            <ScanLine className="h-4 w-4" />
            {queue.length ? "Simulate next scan" : "Queue empty"}
          </button>

          <form onSubmit={submitManual} className="mt-3 flex gap-2">
            <input
              value={manual}
              onChange={(e) => setManual(e.target.value)}
              placeholder="Enter code manually (e.g. VP-204881)"
              className="field"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg border border-ink/15 bg-surface px-4 text-sm font-medium hover:border-ink/40"
            >
              Check
            </button>
          </form>
        </div>

        {/* Stats + feed */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[13px] text-muted">Checked in</div>
                <div className="font-serif text-3xl font-semibold tabular-nums">
                  {count.toLocaleString()}
                  <span className="text-lg text-faint"> / {checkinEvent.capacity.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl font-semibold text-pine">{pct}%</div>
                <div className="text-[12px] text-muted">capacity</div>
              </div>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink/5">
              <div className="h-full rounded-full bg-pine transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <UserCheck className="h-4 w-4 text-muted" />
              <h2 className="font-serif text-base font-semibold">Recent scans</h2>
            </div>
            {log.length === 0 ? (
              <div className="px-5 py-12 text-center text-sm text-muted">
                No scans yet — admit your first guest.
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {log.map((s, i) => (
                  <li key={i} className="flex items-center justify-between px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-full",
                          s.status === "ok" ? "bg-pine/10 text-pine" : "bg-accent-soft text-accent-ink",
                        )}
                      >
                        {s.status === "ok" ? <Check className="h-4 w-4" /> : <TriangleAlert className="h-4 w-4" />}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-ink">{s.attendee.name}</div>
                        <div className="text-[12px] text-muted">
                          {s.attendee.ticketType} · {s.attendee.code}
                        </div>
                      </div>
                    </div>
                    <span className="text-[12px] text-faint">
                      {s.status === "ok" ? "Admitted" : "Rejected"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
