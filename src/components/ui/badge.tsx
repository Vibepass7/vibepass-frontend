import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "pine" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/5 text-ink",
  accent: "bg-accent-soft text-accent-ink",
  pine: "bg-pine/10 text-pine",
  outline: "border border-line text-muted",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
