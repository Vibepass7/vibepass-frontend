export type Category =
  | "Music"
  | "Conference"
  | "Sports"
  | "Festival"
  | "Theater"
  | "Comedy";

export type TicketType = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  total: number;
  sold: number;
  perks?: string[];
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  date: string; // ISO
  doors?: string;
  venue: string;
  city: string;
  country: string;
  image: string;
  organizer: string;
  featured?: boolean;
  trending?: boolean;
  about: string[];
  lineup?: string[];
  tickets: TicketType[];
};

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const categories: { name: Category; blurb: string }[] = [
  { name: "Music", blurb: "Concerts, gigs & club nights" },
  { name: "Conference", blurb: "Talks, summits & workshops" },
  { name: "Festival", blurb: "Multi-day & open-air" },
  { name: "Sports", blurb: "Matchdays & tournaments" },
  { name: "Theater", blurb: "Stage, opera & dance" },
  { name: "Comedy", blurb: "Stand-up & live shows" },
];

export const events: EventItem[] = [
  {
    id: "e1",
    slug: "midnight-bloom-live",
    title: "Midnight Bloom — Live in Concert",
    tagline: "The acclaimed debut tour, finally on this coast.",
    category: "Music",
    date: "2026-07-18T20:00:00",
    doors: "7:00 PM",
    venue: "The Foundry",
    city: "Brooklyn",
    country: "USA",
    image: U("1470229722913-7c0e2dbbafd3"),
    organizer: "Foundry Live",
    featured: true,
    trending: true,
    about: [
      "Midnight Bloom bring their sold-out debut tour to The Foundry for one night only — a 90-minute set with full band and a string section.",
      "Doors open at 7:00 PM. Support act announced two weeks before the show. All ages welcome with a guardian.",
    ],
    lineup: ["Midnight Bloom", "Sea of Glass", "Marlow"],
    tickets: [
      { id: "t1", name: "General Admission", price: 48, blurb: "Standing floor access", total: 800, sold: 612 },
      { id: "t2", name: "Balcony Seated", price: 72, blurb: "Reserved seat, upper tier", total: 240, sold: 121, perks: ["Reserved seat", "Coat check"] },
      { id: "t3", name: "VIP Pit", price: 145, blurb: "Front-row pit + lounge", total: 60, sold: 54, perks: ["Front pit", "Early entry", "Signed poster"] },
    ],
  },
  {
    id: "e2",
    slug: "shapeof-tomorrow-summit",
    title: "Shape of Tomorrow — Design & AI Summit",
    tagline: "Two days on the craft behind intelligent products.",
    category: "Conference",
    date: "2026-09-24T09:00:00",
    venue: "Pier 27 Conference Center",
    city: "San Francisco",
    country: "USA",
    image: U("1540575467063-178a50c2df87"),
    organizer: "Tomorrow Studio",
    featured: true,
    about: [
      "A two-day, single-track summit for designers, engineers and founders shaping the next generation of software.",
      "Includes 18 talks, four hands-on workshops, and a closing dinner overlooking the bay.",
    ],
    lineup: ["Keynote: The Quiet Interface", "Workshop: Prototyping with intent", "Panel: Trust by design"],
    tickets: [
      { id: "t1", name: "Workshop Pass", price: 690, blurb: "All talks + 4 workshops", total: 200, sold: 168, perks: ["All sessions", "Workshops", "Closing dinner"] },
      { id: "t2", name: "Conference Pass", price: 420, blurb: "All talks + panels", total: 600, sold: 311 },
      { id: "t3", name: "Student", price: 120, blurb: "Valid ID required at door", total: 120, sold: 96 },
    ],
  },
  {
    id: "e3",
    slug: "harvest-sound-festival",
    title: "Harvest Sound Festival",
    tagline: "Three days. Four stages. One long golden weekend.",
    category: "Festival",
    date: "2026-08-14T12:00:00",
    venue: "Ridgewood Fields",
    city: "Austin",
    country: "USA",
    image: U("1533174072545-7a4b6ad7a6c3"),
    organizer: "Harvest Collective",
    featured: true,
    trending: true,
    about: [
      "Harvest Sound returns to Ridgewood Fields with a curated bill spanning folk, electronic and everything in between.",
      "Camping, local food vendors, and a dedicated family meadow. Re-entry permitted with wristband.",
    ],
    lineup: ["River & Oak", "Neon Cartography", "The Lantern Club", "Aya", "Field Notes"],
    tickets: [
      { id: "t1", name: "3-Day GA", price: 189, blurb: "Full weekend access", total: 4000, sold: 3120 },
      { id: "t2", name: "3-Day + Camping", price: 269, blurb: "GA plus tent pitch", total: 1500, sold: 980, perks: ["Camping", "Showers", "Re-entry"] },
      { id: "t3", name: "Single Day", price: 89, blurb: "Choose your day at checkout", total: 2000, sold: 742 },
    ],
  },
  {
    id: "e4",
    slug: "city-classic-derby",
    title: "City Classic — The Derby",
    tagline: "Rivals since 1921. Settle it under the lights.",
    category: "Sports",
    date: "2026-07-05T18:30:00",
    venue: "Crowne Park Stadium",
    city: "Manchester",
    country: "UK",
    image: U("1574629810360-7efbbe195018"),
    organizer: "Crowne Park",
    trending: true,
    about: [
      "The fixture the whole city circles on the calendar. Gates open 90 minutes before kick-off.",
      "Family stand available. Away supporters seated in the North End.",
    ],
    tickets: [
      { id: "t1", name: "South Stand", price: 55, blurb: "Behind the goal", total: 6000, sold: 5400 },
      { id: "t2", name: "Main Stand", price: 95, blurb: "Halfway line, covered", total: 3000, sold: 2210, perks: ["Covered seating", "Programme"] },
      { id: "t3", name: "Hospitality", price: 240, blurb: "Lounge, dining & padded seat", total: 300, sold: 268, perks: ["Three-course meal", "Lounge access", "Padded seat"] },
    ],
  },
  {
    id: "e5",
    slug: "a-quiet-light-play",
    title: "A Quiet Light",
    tagline: "A new play about the things we leave unsaid.",
    category: "Theater",
    date: "2026-10-02T19:30:00",
    venue: "The Aldridge Theatre",
    city: "London",
    country: "UK",
    image: U("1503095396549-807759245b35"),
    organizer: "Aldridge Productions",
    about: [
      "A spare, luminous two-act play that has critics calling it the season's quiet triumph.",
      "Running time 2 hours including one interval. Recommended 14+.",
    ],
    tickets: [
      { id: "t1", name: "Stalls", price: 65, blurb: "Ground level, central", total: 300, sold: 188 },
      { id: "t2", name: "Dress Circle", price: 85, blurb: "First balcony", total: 180, sold: 96 },
      { id: "t3", name: "Restricted View", price: 28, blurb: "Side seats, partial view", total: 60, sold: 41 },
    ],
  },
  {
    id: "e6",
    slug: "after-hours-comedy",
    title: "After Hours — Stand-Up Showcase",
    tagline: "Six comics, one mic, no second takes.",
    category: "Comedy",
    date: "2026-07-26T21:00:00",
    venue: "The Basement Room",
    city: "Chicago",
    country: "USA",
    image: U("1516280440614-37939bbacd81"),
    organizer: "Basement Comedy",
    about: [
      "A late-night showcase of touring headliners and sharp local newcomers. 18+, two-drink minimum.",
      "Intimate 120-seat room — there is no bad seat, but the front row is fair game.",
    ],
    tickets: [
      { id: "t1", name: "General", price: 24, blurb: "Open seating", total: 90, sold: 71 },
      { id: "t2", name: "Reserved Booth", price: 40, blurb: "Two-seat booth", total: 30, sold: 22, perks: ["Reserved booth", "Priority entry"] },
    ],
  },
  {
    id: "e7",
    slug: "neon-cartography-club",
    title: "Neon Cartography — Club Night",
    tagline: "A four-hour journey through ambient house.",
    category: "Music",
    date: "2026-08-02T22:00:00",
    venue: "Vault 9",
    city: "Berlin",
    country: "Germany",
    image: U("1493676304819-0d7a8d026dcf"),
    organizer: "Vault 9",
    about: [
      "An extended set from Neon Cartography in Vault 9's main room. Strict no-phones-on-floor policy.",
      "Entry from 10 PM. No re-entry after 1 AM.",
    ],
    tickets: [
      { id: "t1", name: "Advance", price: 22, blurb: "Limited early release", total: 200, sold: 200 },
      { id: "t2", name: "Standard", price: 30, blurb: "Door price, online", total: 400, sold: 188 },
    ],
  },
  {
    id: "e8",
    slug: "open-table-food-fair",
    title: "Open Table — Street Food Fair",
    tagline: "Forty kitchens, one very long afternoon.",
    category: "Festival",
    date: "2026-09-06T11:00:00",
    venue: "Dockside Yards",
    city: "Lisbon",
    country: "Portugal",
    image: U("1414235077428-338989a2e8c0"),
    organizer: "Open Table",
    about: [
      "A roaming celebration of the city's best independent kitchens, from wood-fired everything to natural wine.",
      "Free for under-12s. Tokens sold on site; entry ticket covers the grounds.",
    ],
    tickets: [
      { id: "t1", name: "Day Entry", price: 14, blurb: "Grounds access", total: 5000, sold: 1840 },
      { id: "t2", name: "Tasting Pass", price: 46, blurb: "Entry + 6 tasting tokens", total: 1200, sold: 612, perks: ["6 tasting tokens", "Fast lane", "Tote bag"] },
    ],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function ticketsLeft(t: TicketType) {
  return Math.max(0, t.total - t.sold);
}

export function eventFromLow(e: EventItem) {
  return Math.min(...e.tickets.map((t) => t.price));
}

export function soldRatio(e: EventItem) {
  const total = e.tickets.reduce((a, t) => a + t.total, 0);
  const sold = e.tickets.reduce((a, t) => a + t.sold, 0);
  return total ? sold / total : 0;
}

// ---- Organizer dashboard mock figures ----
export const dashboard = {
  organizer: "Foundry Live",
  kpis: {
    revenue: 184250,
    ticketsSold: 4218,
    activeEvents: 5,
    avgFill: 0.82,
  },
  salesByDay: [
    { day: "Mon", value: 42 },
    { day: "Tue", value: 51 },
    { day: "Wed", value: 38 },
    { day: "Thu", value: 64 },
    { day: "Fri", value: 92 },
    { day: "Sat", value: 118 },
    { day: "Sun", value: 73 },
  ],
  channels: [
    { label: "Direct", value: 54 },
    { label: "Social", value: 27 },
    { label: "Partners", value: 12 },
    { label: "Resale", value: 7 },
  ],
  managed: [
    { title: "Midnight Bloom — Live in Concert", date: "Jul 18", sold: 787, capacity: 1100, status: "On sale", revenue: 51240 },
    { title: "Harvest Sound Festival", date: "Aug 14", sold: 4842, capacity: 7500, status: "On sale", revenue: 98110 },
    { title: "Neon Cartography — Club Night", date: "Aug 02", sold: 388, capacity: 600, status: "Selling fast", revenue: 9860 },
    { title: "After Hours — Stand-Up", date: "Jul 26", sold: 93, capacity: 120, status: "Selling fast", revenue: 2420 },
    { title: "Winter Sessions (draft)", date: "—", sold: 0, capacity: 900, status: "Draft", revenue: 0 },
  ],
};

// ---- Resale marketplace ----
export type ResaleListing = {
  id: string;
  eventSlug: string;
  eventTitle: string;
  category: Category;
  date: string;
  venue: string;
  city: string;
  image: string;
  ticketName: string;
  faceValue: number;
  resalePrice: number;
  qty: number;
  seller: string;
  verified: boolean;
};

export const resaleListings: ResaleListing[] = [
  {
    id: "r1", eventSlug: "harvest-sound-festival", eventTitle: events[2].title, category: "Festival",
    date: events[2].date, venue: events[2].venue, city: events[2].city, image: events[2].image,
    ticketName: "3-Day GA", faceValue: 189, resalePrice: 175, qty: 2, seller: "Dana K.", verified: true,
  },
  {
    id: "r2", eventSlug: "midnight-bloom-live", eventTitle: events[0].title, category: "Music",
    date: events[0].date, venue: events[0].venue, city: events[0].city, image: events[0].image,
    ticketName: "Balcony Seated", faceValue: 72, resalePrice: 72, qty: 1, seller: "Marco P.", verified: true,
  },
  {
    id: "r3", eventSlug: "city-classic-derby", eventTitle: events[3].title, category: "Sports",
    date: events[3].date, venue: events[3].venue, city: events[3].city, image: events[3].image,
    ticketName: "Main Stand", faceValue: 95, resalePrice: 88, qty: 4, seller: "Priya S.", verified: true,
  },
  {
    id: "r4", eventSlug: "neon-cartography-club", eventTitle: events[6].title, category: "Music",
    date: events[6].date, venue: events[6].venue, city: events[6].city, image: events[6].image,
    ticketName: "Advance", faceValue: 22, resalePrice: 20, qty: 2, seller: "Jonas W.", verified: true,
  },
  {
    id: "r5", eventSlug: "shapeof-tomorrow-summit", eventTitle: events[1].title, category: "Conference",
    date: events[1].date, venue: events[1].venue, city: events[1].city, image: events[1].image,
    ticketName: "Conference Pass", faceValue: 420, resalePrice: 380, qty: 1, seller: "Aisha R.", verified: true,
  },
  {
    id: "r6", eventSlug: "a-quiet-light-play", eventTitle: events[4].title, category: "Theater",
    date: events[4].date, venue: events[4].venue, city: events[4].city, image: events[4].image,
    ticketName: "Dress Circle", faceValue: 85, resalePrice: 79, qty: 2, seller: "Tom H.", verified: true,
  },
];

// ---- Check-in scanner (live door) ----
export type Attendee = {
  id: string;
  name: string;
  ticketType: string;
  code: string;
};

export const checkinEvent = {
  title: events[0].title,
  date: events[0].date,
  venue: `${events[0].venue}, ${events[0].city}`,
  capacity: 1100,
  checkedIn: 742,
};

export const checkinQueue: Attendee[] = [
  { id: "a1", name: "Lena Ortiz", ticketType: "VIP Pit", code: "VP-204881" },
  { id: "a2", name: "Samuel Idris", ticketType: "General Admission", code: "VP-204882" },
  { id: "a3", name: "Yara Haddad", ticketType: "Balcony Seated", code: "VP-204883" },
  { id: "a4", name: "Noah Fischer", ticketType: "General Admission", code: "VP-204884" },
  { id: "a5", name: "Mei Tanaka", ticketType: "VIP Pit", code: "VP-204885" },
  { id: "a6", name: "Diego Salas", ticketType: "General Admission", code: "VP-204886" },
];
