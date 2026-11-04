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

## Remove repeated extension content
Removed the repeated video, vocabulary cards, number list and grammar reference from the extension. It now contains only follow-up questions and independent writing/speaking tasks, with links back to the main lesson for reference. Build passed.

## Lesson 3 extension
Added Claudia and Anna readings, supplied Claudia audio, Anna image, supplied Vimeo embed, adapted grammar and eight practice questions, plus writing tasks. Main lesson 3 is not yet hosted. Anna audio is not included. Build and asset/link checks passed; browser playback not verified.

## Lesson 3 main lesson
Added Johannes and Julia readings and supplied audio, both supplied Vimeo videos, adapted grammar, eight practice questions, and writing tasks. Curriculum opens the main lesson, which leads to the extension. Shared grammar removed from extension and replaced by a review link. Build passed for 72 routes and media paths/navigation checked; playback remains unverified.

## Lesson 4 alphabet
Added full alphabet listing with 18 supplied recordings (A–P, R, S), native audio controls, individual downloads, spelling dialogue, speaking prompts, present-tense table and four practice questions. Missing recordings are labelled. Only one audio plays at a time. Build passed for 73 routes; media paths and counts verified. Browser playback remains unverified.

## Additional alphabet recordings
Added Q, T, U, V, W, Y, Z, Ä, Ö, Ü and ß. Alphabet now has 29 recordings; only X remains pending. Special-character filenames use explicit ASCII mappings. Production build and all 29 audio paths verified; playback remains unverified.

## Lesson 4 extension and video
Added supplied YouTube video to main lesson. Added separate extension with source-based ten-blank verb exercise, spelling tasks and useful phrases. Main lesson links to extension; recordings and video are not duplicated. Production build and page structure checks passed. Browser interaction and media playback remain unverified.

## Lesson 5: Zählen 2 (main + extension)
Recreated Lesson 5 and its extension from the user-supplied saved pages, with the same site layout and lesson progression as Lessons 1–4. Main lesson includes numbers up to 1,000, age, contact details, addresses and international dialling codes, university dialogue, cultural context, speaking and writing practice, listening comprehension, and conjugation of *sein*. Extension includes the original follow-up topics and interactive checks. Included the supplied YouTube and Vimeo embeds. The source pages did not contain all remote audio assets, so number recordings link to the source website, and any listening exercises requiring missing sound have text-based alternatives. Added local static HTML pages in dist for both routes. Astro package installation/build could not be rerun here; the static pages were generated and verified separately.

## 2026-11-04 follow-up: Lesson 6 and printable PDFs

- The existing Lesson 6 placeholder has been replaced with a complete Hobbys
  lesson page, retaining the original course's order: reading/listening,
  vocabulary, structures, listening video and speaking.
- The four M4A links supplied by the user are embedded as individual audio
  elements, alongside existing local portraits for Yasmin, Max, Johannes and
  Julia. The user's Vimeo URL is included in the listening section.
- These remote audio/video files are linked, not bundled: network access and
  original host permissions are required; stream availability was not verified.
- Lessons 1–6 have original Ramzunā printable PDF study sheets under
  `public/resources/pdfs/`. The reusable `PdfResources.astro` component
  provides non-blocking, cancellable downloads and a native direct-link
  fallback, and appears on the learning path and on Lesson 5/6 pages.
- Matching static files have been updated in `dist/`; a full Astro rebuild
  remains unverified because the dependency registry was unreachable.

## Lesson 7 and Lesson 8 additions (2026-11-04)

Lesson 7 follows the original sequence **Wortschatz, Sprechen, Wortschatz, Strukturen, Sprechen**, with a separate **Schreiben, Strukturen, Wortschatz** extension. The user-provided offline HTML includes the original illustrations but did not supply playable H5P packages. New accessible practice exercises are explicitly adaptations.

Lesson 8 uses the original *Personen beschreiben* structure **Lesen, Sprechen, Hören, Strukturen** and externally streamed media links supplied by the user. It is an adaptation, not a verbatim page copy. The original extension for Lesson 8 is not included.

Two new PDF study sheets (Lessons 7–8) are bundled; eight PDFs are referenced by `PdfResources.astro`. The progressive-enhancement asynchronous PDF handler is unchanged.

## Lesson 9 and 10 additions (2026-11-04)

Lesson 9 follows the supplied original *Freunde* HTML and includes Yasmin/Max recordings, Vimeo interview, listening comprehension with original answer keys, the conjugation table and adapted interactive tasks. Two supplied archives labeled extension were byte-identical main-lesson exports; the Tiradard recording is presented on a separately labeled adapted extension page. Lesson 10 follows the published *Studium* lesson sequence and incorporates the user-provided Yasmin audio. Both have new locally included PDF study sheets, delivered through the existing asynchronous PDF component. The learning path now links to Lessons 1–10. Full build is not verified in this environment.
