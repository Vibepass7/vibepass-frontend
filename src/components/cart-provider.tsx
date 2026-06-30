"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartLine = {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  ticketId: string;
  ticketName: string;
  price: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (line: CartLine) => void;
  setQty: (eventId: string, ticketId: string, qty: number) => void;
  remove: (eventId: string, ticketId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<CartState | null>(null);
const KEY = "vibepass.cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add: CartState["add"] = (line) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.eventId === line.eventId && l.ticketId === line.ticketId);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
  };

  const setQty: CartState["setQty"] = (eventId, ticketId, qty) =>
    setLines((prev) =>
      prev
        .map((l) => (l.eventId === eventId && l.ticketId === ticketId ? { ...l, qty } : l))
        .filter((l) => l.qty > 0),
    );

  const remove: CartState["remove"] = (eventId, ticketId) =>
    setLines((prev) => prev.filter((l) => !(l.eventId === eventId && l.ticketId === ticketId)));

  const clear = () => setLines([]);

  const count = lines.reduce((a, l) => a + l.qty, 0);
  const subtotal = lines.reduce((a, l) => a + l.qty * l.price, 0);

  return (
    <CartCtx.Provider value={{ lines, add, setQty, remove, clear, count, subtotal }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
