"use client";

import Link from "next/link";
import { useState } from "react";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");

  return (
    <div className="shell grid min-h-[78vh] place-items-center py-12">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-paper">
              <Ticket className="h-4.5 w-4.5" />
            </span>
            <span className="font-serif text-xl font-semibold">VibePass</span>
          </Link>
          <h1 className="mt-6 font-serif text-2xl font-semibold">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            {isSignup ? "It takes less than a minute." : "Sign in to manage your tickets and events."}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-6 shadow-card">
          {isSignup && (
            <div className="mb-5">
              <span className="mb-2 block text-[13px] font-medium">I want to…</span>
              <div className="grid grid-cols-2 gap-2">
                {(["attendee", "organizer"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "rounded-xl border px-3 py-3 text-left transition-all",
                      role === r ? "border-ink bg-paper" : "border-line hover:border-ink/30",
                    )}
                  >
                    <div className="text-sm font-medium capitalize">
                      {r === "attendee" ? "Go to events" : "Sell tickets"}
                    </div>
                    <div className="text-[12px] text-muted">
                      {r === "attendee" ? "Discover & book" : "Host & manage"}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {isSignup && (
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium">Full name</span>
                <input className="field" placeholder="Alex Rivera" />
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium">Email</span>
              <input className="field" type="email" placeholder="you@example.com" />
            </label>
            <label className="block">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-medium">Password</span>
                {!isSignup && (
                  <Link href="/login" className="text-[12px] text-muted hover:text-ink">
                    Forgot?
                  </Link>
                )}
              </div>
              <input className="field" type="password" placeholder="••••••••" />
            </label>

            <Button
              href={isSignup && role === "organizer" ? "/organizer" : "/tickets"}
              className="w-full"
              size="lg"
            >
              {isSignup ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="mt-5 flex items-center gap-3 text-[12px] text-faint">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>
          <button className="mt-5 w-full rounded-full border border-ink/15 bg-surface py-2.5 text-sm font-medium hover:border-ink/40">
            Continue with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          {isSignup ? "Already have an account? " : "New to VibePass? "}
          <Link href={isSignup ? "/login" : "/signup"} className="link-underline font-medium text-ink">
            {isSignup ? "Sign in" : "Create one"}
          </Link>
        </p>
      </div>
    </div>
  );
}
