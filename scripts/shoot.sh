#!/usr/bin/env bash
# Visual pass: capture full-page screenshots of every key route with headless Chrome.
# Usage:  bash scripts/shoot.sh [base_url]
# Requires a running server (npm run dev / npm start) and google-chrome or chromium.
set -euo pipefail

BASE="${1:-http://localhost:3000}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/screenshots"
mkdir -p "$OUT"

CHROME="$(command -v google-chrome-stable || command -v google-chrome || command -v chromium-browser || command -v chromium)"
echo "Using $CHROME"
echo "Shooting $BASE -> $OUT"

# route|filename|width|height
ROUTES=(
  "/|home|1440|2600"
  "/events|events|1440|1700"
  "/events/midnight-bloom-live|event-detail|1440|2200"
  "/resale|resale|1440|1700"
  "/tickets|tickets|1440|1300"
  "/organizer|organizer-dashboard|1440|1700"
  "/organizer/events/new|create-event|1440|1500"
  "/organizer/checkin|checkin-scanner|1440|1200"
  "/cart|cart-empty|1440|1000"
  "/login|login|1440|1100"
  "/signup|signup|1440|1200"
  "/|home-mobile|420|2900"
  "/events|events-mobile|420|2400"
)

for r in "${ROUTES[@]}"; do
  IFS='|' read -r path name w h <<< "$r"
  "$CHROME" --headless --disable-gpu --hide-scrollbars --no-sandbox \
    --force-device-scale-factor=1 \
    --window-size="${w},${h}" \
    --virtual-time-budget=9000 \
    --run-all-compositor-stages-before-draw \
    --screenshot="$OUT/${name}.png" \
    "${BASE}${path}" >/dev/null 2>&1
  echo "  ✓ ${name}.png (${w}x${h})"
done

echo "Done. $(ls "$OUT" | wc -l) screenshots in $OUT"
