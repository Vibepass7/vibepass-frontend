# VibePass — Static Frontend

A complete static frontend for an event ticketing platform, built with Next.js. Every screen is
driven by typed mock data — no backend, no real payments. The flows are real; the data is faked.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## What's inside

| Route | What it is |
|---|---|
| `/` | Landing — hero, search, categories, featured events, organizer CTA |
| `/events` | Browse with live search, category filter, sort |
| `/events/[slug]` | Event detail — line-up, venue, ticket picker with quantity + holds |
| `/cart` | Reservation with a 10-minute hold timer and promo codes (`VIBE10`, `FIRST`) |
| `/checkout` | Three-step checkout (contact → payment → review) |
| `/confirmation` | Digital tickets with QR codes |
| `/tickets` | My-tickets wallet with a tap-to-show QR modal |
| `/resale` | Verified resale marketplace + "sell your ticket" dialog |
| `/login`, `/signup` | Auth screens with attendee/organizer role select |
| `/organizer` | Organizer dashboard — KPIs, charts, events table |
| `/organizer/events/new` | Create-event flow (details → tickets → review) with live preview |
| `/organizer/checkin` | Live door check-in scanner — simulate scans, manual entry, dup detection |

The cart persists to `localStorage`, so it survives reloads.

## Screenshots / visual pass

A headless-Chrome script captures full-page screenshots of every route (desktop + mobile):

```bash
npm start &                 # or npm run dev
bash scripts/shoot.sh       # writes PNGs to ./screenshots
```

It auto-detects `google-chrome`/`chromium`. Edit the `ROUTES` array in `scripts/shoot.sh`
to add pages or change viewport sizes.

## Design system

- **Type:** Fraunces (serif display) + Inter (body)
- **Palette:** warm paper `#FAF7F1`, ink `#1B1814`, terracotta accent `#C24A26`, pine `#2E4A3E`
- Tailwind tokens live in `tailwind.config.ts`; base styles in `src/app/globals.css`

## Structure

```
src/
  app/            # routes (App Router)
  components/     # header, footer, cards, cart provider, pickers
  components/ui/  # button, badge primitives
  lib/data.ts     # all mock events, tickets, dashboard figures
  lib/utils.ts    # cn(), formatPrice()
```

Swapping in a real API later means replacing the selectors in `src/lib/data.ts` with `fetch` calls —
the component layer stays the same.

## Note

Pinned to `next@15.1.6`. When your network is stable, run `npm i next@15` to pick up the latest
security patch for the 15.x line.
