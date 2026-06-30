import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="shell flex flex-col items-center py-32 text-center">
      <p className="font-serif text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">This page slipped the lineup</h1>
      <p className="mt-2 max-w-sm text-muted">
        The event you’re after may have wrapped, moved, or never existed. Let’s get you back.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Home</Button>
        <Button href="/events" variant="outline">
          Browse events
        </Button>
      </div>
    </div>
  );
}
