# German curriculum redesign

The German curriculum at /resources/german-async now presents all three units openly, without accordion or dropdown navigation. A featured lesson card provides the starting point; numbered units and English lesson descriptions explain the path ahead. Only lesson 1 is available, with all other lessons clearly marked coming soon.

The layout includes mobile breakpoints, dark-mode colours, keyboard focus indicators, direct unit anchors and reduced-motion support. Existing learning materials and attribution remain in place.

The supplied Vimeo player is embedded responsively in lesson 1. Vimeo requires internet; the offline messaging and download label now distinguish the embedded video from locally saved materials. Playback depends on Vimeo availability and embedding permissions.

Changed source files:
- src/pages/resources/german-async.astro
- src/pages/resources/grenzenlos-deutsch.astro
- src/pages/resources.astro

Run npm ci, then npm run dev for development or npm run build to generate the static site. The production build passed for all 68 routes. The dist directory is included for hosting; source files are included for further editing.

## Lesson 2 extension
Added /resources/german-lesson-2 from the supplied extension archive, with the supplied responsive YouTube embed, vocabulary and numbers, grammar reference, eight new multiple-choice questions with feedback, and speaking tasks. The curriculum distinguishes extension availability from the main lesson. Production build passes for 69 routes. Browser rendering and external video playback were not verified.

## Lesson 2 main lesson
Added /resources/german-lesson-2-main using the supplied main-lesson ZIP. Curriculum now opens the main lesson and links onward to the existing extension. Includes video, numbers, vocabulary, adapted grammar explanations, eight text-based questions, original model dialogues and adapted speaking/culture tasks. Standalone source audio and original embedded exercises were not included as working assets because their required files were absent from the ZIP. Build passed for 70 routes; route links and quiz structure checked. Browser rendering and external playback remain unverified.
