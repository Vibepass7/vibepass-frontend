"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";
import { cn, formatPrice } from "@/lib/utils";

const steps = ["Contact", "Payment", "Review"] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, count, clear } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    card: "",
    exp: "",
    cvc: "",
  });

  const fee = Math.round(subtotal * 0.06);
  const total = subtotal + fee;

  if (count === 0) {
    return (
      <div className="shell py-28 text-center">
        <h1 className="font-serif text-2xl font-semibold">Nothing to check out</h1>
        <Button href="/events" className="mt-6">Browse events</Button>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const canContinue =
    step === 0
      ? form.firstName && form.lastName && /.+@.+\..+/.test(form.email)
      : step === 1
        ? form.card.replace(/\s/g, "").length >= 12 && form.exp && form.cvc.length >= 3
        : true;

  const placeOrder = () => {
    const order = {
      id: "VP-" + Math.floor(100000 + ((subtotal * 97 + lines.length) % 899999)),
      lines,
      total,
      buyer: `${form.firstName} ${form.lastName}`,
      email: form.email,
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem("vibepass.lastOrder", JSON.stringify(order));
    clear();
    router.push("/confirmation");
  };

  return (
    <div className="shell py-10">
      <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {/* Stepper */}
          <ol className="flex items-center gap-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "grid h-7 w-7 place-items-center rounded-full text-[13px] font-semibold transition-colors",
                      i <= step ? "bg-ink text-paper" : "border border-line text-faint",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className={cn("text-sm", i === step ? "font-medium text-ink" : "text-muted")}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && <span className="h-px w-8 bg-line" />}
              </li>
            ))}
          </ol>

          <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold">Where do we send the tickets?</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First name">
                    <input className="field" value={form.firstName} onChange={set("firstName")} />
                  </Field>
                  <Field label="Last name">
                    <input className="field" value={form.lastName} onChange={set("lastName")} />
                  </Field>
                </div>
                <Field label="Email">
                  <input
                    className="field"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>
                <p className="text-[13px] text-muted">
                  Your mobile tickets and receipt go straight to this inbox.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold">Payment</h2>
                <Field label="Card number">
                  <div className="relative">
                    <input
                      className="field pl-10"
                      placeholder="4242 4242 4242 4242"
                      value={form.card}
                      onChange={set("card")}
                    />
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
                  </div>
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry">
                    <input className="field" placeholder="MM / YY" value={form.exp} onChange={set("exp")} />
                  </Field>
                  <Field label="CVC">
                    <input className="field" placeholder="123" value={form.cvc} onChange={set("cvc")} />
                  </Field>
                </div>
                <p className="flex items-center gap-1.5 text-[13px] text-muted">
                  <Lock className="h-3.5 w-3.5" /> Demo only — no real card is charged.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-serif text-xl font-semibold">Review &amp; confirm</h2>
                <div className="rounded-xl border border-line bg-paper p-4 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Name</span>
                    <span className="font-medium">{form.firstName} {form.lastName}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Email</span>
                    <span className="font-medium">{form.email}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted">Card</span>
                    <span className="font-medium">•••• {form.card.replace(/\s/g, "").slice(-4) || "0000"}</span>
                  </div>
                </div>
                <ul className="divide-y divide-line rounded-xl border border-line">
                  {lines.map((l) => (
                    <li key={l.eventId + l.ticketId} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-ink">
                        {l.qty} × {l.ticketName}
                        <span className="block text-[12px] text-muted">{l.eventTitle}</span>
                      </span>
                      <span className="font-medium">{formatPrice(l.qty * l.price)}</span>
                    </li>
                  ))}
                </ul>
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
                <Button onClick={() => setStep(step + 1)} disabled={!canContinue} size="lg">
                  Continue
                </Button>
              ) : (
                <Button onClick={placeOrder} size="lg">
                  Pay {formatPrice(total)}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-serif text-lg font-semibold">Summary</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.eventId + l.ticketId} className="flex justify-between">
                  <span className="text-muted">{l.qty} × {l.ticketName}</span>
                  <span className="font-medium">{formatPrice(l.qty * l.price)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Service fee</dt>
                <dd>{formatPrice(fee)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="font-medium">Total</span>
              <span className="font-serif text-xl font-semibold">{formatPrice(total)}</span>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-[12px] text-muted">
              <ShieldCheck className="h-4 w-4 text-pine" /> PCI-compliant · encrypted at rest
            </p>
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
