"use client";

import { useState } from "react";
import { Check, ShieldCheck, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/data";

export function ListTicketDialog() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [price, setPrice] = useState("");
  const [evt, setEvt] = useState(events[0].slug);

  const close = () => {
    setOpen(false);
    setTimeout(() => setDone(false), 200);
  };

  return (
    <>
      <Button variant="ink" onClick={() => setOpen(true)}>
        <Tag className="h-4 w-4" /> Sell your ticket
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-surface p-6 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-pine/10">
                  <Check className="h-6 w-6 text-pine" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold">Listing submitted</h3>
                <p className="mt-2 text-sm text-muted">
                  We’ll verify your ticket and publish it to the marketplace within a few minutes.
                </p>
                <Button onClick={close} className="mt-5">
                  Done
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-xl font-semibold">List a ticket for resale</h3>
                <p className="mt-1 text-sm text-muted">
                  Sell at or below face value. We verify every transfer.
                </p>
                <div className="mt-5 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-[13px] font-medium">Event</span>
                    <select
                      value={evt}
                      onChange={(e) => setEvt(e.target.value)}
                      className="field"
                    >
                      {events.map((ev) => (
                        <option key={ev.slug} value={ev.slug}>
                          {ev.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] font-medium">Quantity</span>
                      <select className="field">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-[13px] font-medium">Asking price</span>
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="$"
                        className="field"
                      />
                    </label>
                  </div>
                  <p className="flex items-center gap-1.5 rounded-lg bg-pine/5 px-3 py-2.5 text-[13px] text-pine">
                    <ShieldCheck className="h-4 w-4 shrink-0" /> Price capped at face value to keep
                    things fair.
                  </p>
                </div>
                <Button onClick={() => setDone(true)} className="mt-5 w-full" size="lg">
                  List ticket
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
