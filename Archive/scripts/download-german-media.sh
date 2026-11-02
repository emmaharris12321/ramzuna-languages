#!/usr/bin/env bash
# Run ONCE on a machine with internet access. Downloads the original, unmodified Grenzenlos Deutsch
# media (CC BY-NC-SA 4.0) for Einheit 1, Lektion 1 into the site, so it works offline afterwards.
set -euo pipefail
cd "$(dirname "$0")/.."
U=https://grenzenlos-deutsch.com/familie/wp-content/uploads
mkdir -p public/assets/german/audio public/assets/german/img public/assets/german/video

for n in Yasmin Johannes Max Julia; do
  curl -fL "$U/AUD_Familie_Einheit1_Lektion1_${n}.mp4" -o "public/assets/german/audio/AUD_Familie_Einheit1_Lektion1_${n}.mp4"
done

for f in Yasmin-223x300.png Johannes.pgn_-211x300.png Max.pgn_-211x300.png Julia-251x300.png; do
  curl -fL "$U/$f" -o "public/assets/german/img/$f"
done
for i in 1 2 3 4; do
  curl -fL "$U/2016/10/IMG_Familie_Unit1_Lesson1_SpeechBubble$i.png" -o "public/assets/german/img/IMG_Familie_Unit1_Lesson1_SpeechBubble$i.png"
done
for n in Evi Miriam PetraBuda Laura; do
  curl -fL "$U/2016/10/PIC_Familie_Unit1_Lesson-1_${n}-1024x576.jpg" -o "public/assets/german/img/PIC_Familie_Unit1_Lesson-1_${n}-1024x576.jpg"
done

# The lesson video is hosted on Vimeo (id 288164075). This needs yt-dlp: https://github.com/yt-dlp/yt-dlp
if command -v yt-dlp >/dev/null; then
  yt-dlp --referer https://grenzenlos-deutsch.com/ -f "mp4/best" \
    -o public/assets/german/video/VID_Familie_Einheit1_Lektion1.mp4 https://player.vimeo.com/video/288164075
else
  echo "yt-dlp not found: download the video manually and save it as"
  echo "  public/assets/german/video/VID_Familie_Einheit1_Lektion1.mp4"
fi
echo "Done."
