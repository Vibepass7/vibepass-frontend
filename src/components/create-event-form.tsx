"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ImagePlus,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

const steps = ["Details", "Tickets", "Review"] as const;

type Tier = { id: number; name: string; price: string; qty: string };

export function CreateEventForm() {
  const [step, setStep] = useState(0);
  const [published, setPublished] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "Music",
    date: "",
    time: "",
    venue: "",
    city: "",
    about: "",
  });
  const [tiers, setTiers] = useState<Tier[]>([
    { id: 1, name: "General Admission", price: "", qty: "" },
  ]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const addTier = () =>
    setTiers((t) => [...t, { id: Date.now(), name: "", price: "", qty: "" }]);
  const removeTier = (id: number) => setTiers((t) => t.filter((x) => x.id !== id));
  const setTier = (id: number, k: keyof Tier, v: string) =>
    setTiers((t) => t.map((x) => (x.id === id ? { ...x, [k]: v } : x)));

  const detailsOk = form.title && form.date && form.venue && form.city;
  const ticketsOk = tiers.every((t) => t.name && t.price && t.qty);
  const capacity = tiers.reduce((a, t) => a + (parseInt(t.qty) || 0), 0);

  if (published) {
    return (
      <div className="shell py-24 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pine/10">
          <Check className="h-7 w-7 text-pine" />
        </div>
        <h1 className="mt-5 font-serif text-3xl font-semibold">“{form.title}” is live.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Your event is published and on sale. Share the link, watch sales roll in, and check guests
          in from your phone on the night.
        </p>
        <div className="mt-7 flex justify-center gap-3">
          <Button href="/organizer">Go to dashboard</Button>
          <Button href="/organizer/checkin" variant="outline">
            Open check-in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-8">
      <Link href="/organizer" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to dashboard
      </Link>

      <h1 className="mt-5 font-serif text-3xl font-semibold sm:text-4xl">Create an event</h1>

      {/* Stepper */}
      <ol className="mt-6 flex items-center gap-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full text-[13px] font-semibold transition-colors",
                  i <= step ? "bg-ink text-paper" : "border border-line text-faint",
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={cn("text-sm", i === step ? "font-medium text-ink" : "text-muted")}>{s}</span>
            </div>
            {i < steps.length - 1 && <span className="h-px w-8 bg-line" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-line bg-surface p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">The basics</h2>
              <Field label="Event title">
                <input className="field" placeholder="e.g. Summer Rooftop Sessions" value={form.title} onChange={set("title")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category">
                  <select className="field" value={form.category} onChange={set("category")}>
                    {categories.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Date">
                    <input type="date" className="field" value={form.date} onChange={set("date")} />
                  </Field>
                  <Field label="Time">
                    <input type="time" className="field" value={form.time} onChange={set("time")} />
                  </Field>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Venue">
                  <input className="field" placeholder="The Foundry" value={form.venue} onChange={set("venue")} />
                </Field>
                <Field label="City">
                  <input className="field" placeholder="Brooklyn" value={form.city} onChange={set("city")} />
                </Field>
              </div>
              <Field label="About">
                <textarea
                  className="field min-h-24 resize-y"
                  placeholder="Tell guests what to expect…"
                  value={form.about}
                  onChange={set("about")}
                />
              </Field>
              <div>
                <span className="mb-1.5 block text-[13px] font-medium">Cover image</span>
                <div className="grid h-32 place-items-center rounded-xl border border-dashed border-line bg-paper text-sm text-faint">
                  <div className="flex flex-col items-center gap-1.5">
                    <ImagePlus className="h-5 w-5" />
                    Drag an image here or browse
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-semibold">Ticket types</h2>
                <button onClick={addTier} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink hover:underline">
                  <Plus className="h-4 w-4" /> Add tier
                </button>
              </div>
              {tiers.map((t, i) => (
                <div key={t.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium uppercase tracking-wide text-faint">
                      Tier {i + 1}
                    </span>
                    {tiers.length > 1 && (
                      <button onClick={() => removeTier(t.id)} className="text-faint hover:text-accent-ink" aria-label="Remove tier">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-[1.5fr_1fr_1fr]">
                    <input className="field" placeholder="Name (e.g. VIP)" value={t.name} onChange={(e) => setTier(t.id, "name", e.target.value)} />
                    <input className="field" placeholder="Price $" value={t.price} onChange={(e) => setTier(t.id, "price", e.target.value.replace(/[^0-9]/g, ""))} />
                    <input className="field" placeholder="Quantity" value={t.qty} onChange={(e) => setTier(t.id, "qty", e.target.value.replace(/[^0-9]/g, ""))} />
                  </div>
                </div>
              ))}
              <p className="text-[13px] text-muted">
                Total capacity: <span className="font-medium text-ink">{capacity.toLocaleString()}</span> tickets
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold">Review &amp; publish</h2>
              <div className="rounded-xl border border-line bg-paper p-4 text-sm">
                <Summary label="Title" value={form.title} />
                <Summary label="When" value={[form.date, form.time].filter(Boolean).join(" · ") || "—"} />
                <Summary label="Where" value={[form.venue, form.city].filter(Boolean).join(", ") || "—"} />
                <Summary label="Category" value={form.category} />
                <Summary label="Capacity" value={`${capacity.toLocaleString()} tickets`} />
              </div>
              <ul className="divide-y divide-line rounded-xl border border-line">
                {tiers.map((t) => (
                  <li key={t.id} className="flex justify-between px-4 py-3 text-sm">
                    <span>{t.name || "Untitled tier"} · {t.qty || 0} available</span>
                    <span className="font-medium">{t.price ? formatPrice(parseInt(t.price)) : "—"}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-muted">
                Publishing puts this event on sale immediately. You can edit it anytime.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="text-sm text-muted hover:text-ink">
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 0 ? !detailsOk : !ticketsOk}
                size="lg"
              >
                Continue
              </Button>
            ) : (
              <Button onClick={() => setPublished(true)} size="lg">
                Publish event
              </Button>
            )}
          </div>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <p className="mb-3 text-[13px] font-medium text-muted">Live preview</p>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
            <div className="grain grid aspect-[4/3] place-items-center bg-paper text-faint">
              <ImagePlus className="h-7 w-7" />
            </div>
            <div className="p-4">
              <Badge tone="neutral">{form.category}</Badge>
              <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">
                {form.title || "Your event title"}
              </h3>
              <div className="mt-2 space-y-1 text-[13px] text-muted">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {form.date ? form.date : "Date to be set"}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {[form.venue, form.city].filter(Boolean).join(", ") || "Venue to be set"}
                </div>
              </div>
              <div className="mt-3 border-t border-line pt-3 text-sm text-muted">
                from{" "}
                <span className="font-semibold text-ink">
                  {tiers.some((t) => t.price)
                    ? formatPrice(Math.min(...tiers.filter((t) => t.price).map((t) => parseInt(t.price))))
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
