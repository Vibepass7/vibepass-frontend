import { EventsBrowser } from "@/components/events-browser";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const sp = await searchParams;
  return <EventsBrowser initialCat={sp.cat} initialQuery={sp.q} />;
}
