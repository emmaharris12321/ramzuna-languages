# German curriculum redesign

The German curriculum at /resources/german-async now presents all three units openly, without accordion or dropdown navigation. A featured lesson card provides the starting point; numbered units and English lesson descriptions explain the path ahead. Only lesson 1 is available, with all other lessons clearly marked coming soon.

The layout includes mobile breakpoints, dark-mode colours, keyboard focus indicators, direct unit anchors and reduced-motion support. Existing learning materials and attribution remain in place.

The supplied Vimeo player is embedded responsively in lesson 1. Vimeo requires internet; the offline messaging and download label now distinguish the embedded video from locally saved materials. Playback depends on Vimeo availability and embedding permissions.

Changed source files:
- src/pages/resources/german-async.astro
- src/pages/resources/grenzenlos-deutsch.astro
- src/pages/resources.astro

Run npm ci, then npm run dev for development or npm run build to generate the static site. The production build passed for all 68 routes. The dist directory is included for hosting; source files are included for further editing.
