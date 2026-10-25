#!/usr/bin/env bash
# Run ONCE on a machine with internet access. Downloads the original, unmodified
# Grenzenlos Deutsch audio (CC BY-NC-SA 4.0) into the site so it works offline afterwards.
set -euo pipefail
cd "$(dirname "$0")/.."
DEST=public/assets/german/audio
BASE=https://grenzenlos-deutsch.com/familie/wp-content/uploads
mkdir -p "$DEST"
for n in Yasmin Johannes Max Julia; do
  f="AUD_Familie_Einheit1_Lektion1_${n}.m4a"
  echo "Downloading $f"
  curl -fL "$BASE/$f" -o "$DEST/$f"
done
echo "Done. Files are in $DEST"
