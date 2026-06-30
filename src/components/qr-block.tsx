// A deterministic, decorative QR-style block rendered from a seed string.
// Purely visual (no real encoding) — good enough for a static demo ticket.
export function QrBlock({ seed, size = 92 }: { seed: string; size?: number }) {
  const n = 11;
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const cells: boolean[] = [];
  for (let i = 0; i < n * n; i++) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    cells.push((h & 7) > 3);
  }

  const isFinder = (r: number, c: number) => {
    const corners = [
      [0, 0],
      [0, n - 3],
      [n - 3, 0],
    ];
    return corners.some(([fr, fc]) => r >= fr && r < fr + 3 && c >= fc && c < fc + 3);
  };

  return (
    <div
      className="grid rounded-md bg-paper p-1"
      style={{ width: size, height: size, gridTemplateColumns: `repeat(${n}, 1fr)` }}
      aria-label="Ticket QR code"
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        const finder = isFinder(r, c);
        const ring =
          (r === 0 || r === 2 || c === 0 || c === 2) &&
          ((r < 3 && c < 3) || (r < 3 && c >= n - 3) || (r >= n - 3 && c < 3));
        const filled = finder ? ring || (r === 1 && c === 1) || (r === 1 && c === n - 2) || (r === n - 2 && c === 1) : on;
        return (
          <span
            key={i}
            className={filled ? "bg-ink" : "bg-transparent"}
            style={{ aspectRatio: "1" }}
          />
        );
      })}
    </div>
  );
}
