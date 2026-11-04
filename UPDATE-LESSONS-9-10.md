# Lessons 9 and 10 source update (2026-11-04)

This is a **source-code-only Astro project**. It contains editable `src/`, `public/`, `package.json`, the lockfile, and configuration at its root. It does not contain generated `dist/` output or `node_modules/`.

## New pages

- `src/pages/resources/german-lesson-9.astro`: Lesson 9, **Freunde**, following the original saved main lesson structure (Lesen, Sprechen, Hören, Strukturen). Includes the Yasmin and Max readings, separate audio players, a Vimeo interview, grounded comprehension questions, listening answers recovered from the saved page, and ten verb-conjugation questions.
- `src/pages/resources/german-lesson-9-extension.astro`: **Extension listening practice** with the separately provided Tiradard M4A link. The two user-supplied `l9-erw` ZIP archives are byte-identical and each contains **Lesson 9 main**, so original extension exercise content could not be recovered; these extension prompts are newly authored and labeled accordingly.
- `src/pages/resources/german-lesson-10.astro`: Lesson 10, **Studium**, using the publicly available main lesson to structure reading, study subjects, speaking, *Wissenschaft*, and days of the week, with an externally hosted Yasmin recording supplied by the user. Reading and self-check activities are adapted and attributed.
- `public/assets/german/lesson-nine-interactions.js`: Self-check logic for the new multiple-choice and text exercises; no data submitted to a server.
- `public/assets/german/lesson-nine.css`: Additional styling on top of the site’s existing shared German lesson styles.

## New PDF resources

- `public/resources/pdfs/german-lesson-9-study-sheet.pdf`
- `public/resources/pdfs/german-lesson-10-study-sheet.pdf`

Both are editable **by regenerating/replacing the PDF files**; the site serves these PDF assets from `public/` via the pre-existing `src/components/PdfResources.astro`. The script `public/assets/german/pdf-downloads.js` is unchanged and performs optional asynchronous same-origin downloads with progress/cancellation and a fallback normal download link. The `german-async.astro` curriculum index now links to Lessons 1–10.

## External media

Media links are not copied into the ZIP and require a working internet connection and permission from their original host. Audio paths retain the source filenames, including the original **Yamsin** spelling in Lesson 9.

- Lesson 9 Yasmin: `https://grenzenlos-deutsch.com/familie/wp-content/uploads/AUD_Familie_Einheit1_Lektion9_Yamsin.m4a`
- Lesson 9 Max: `https://grenzenlos-deutsch.com/familie/wp-content/uploads/AUD_Familie_Einheit1_Lektion9_Max.m4a`
- Lesson 9 video: `https://player.vimeo.com/video/288175858?h=05d4c0d6d1`
- Lesson 9 extension Tiradard: `https://grenzenlos-deutsch.com/familie/wp-content/uploads/AUD_Familie_Einheit1_Lektion9_Erweiterung_Tiradard.m4a`
- Lesson 10 Yasmin: `https://grenzenlos-deutsch.com/familie/wp-content/uploads/AUD_Familie_Einheit1_Lektion10_Yasmin.m4a`

## Verification & remaining limitations

- Verified: both user Lesson 9 ZIP hashes match; Lesson 9 main content and answer keys inspected; Lesson 10 topics checked against the published original; JavaScript syntax check passed; existing asynchronous PDF downloader test passed; all ten PDF files are present and recognized by the site component; new PDFs rendered successfully.
- Not verified: complete Astro production build or playback of externally hosted recordings. The offline npm cache is incomplete, and this runtime has Node 22.16 although newer dependencies require Node >=22.19. Use Node 22.19+ to run `npm ci`, `npm run dev`, and `npm run build` in an environment with registry access.

Source attribution: *Grenzenlos Deutsch*, Familie und Freunde, Einheit 1, Lessons 9 and 10, licensed CC BY-NC-SA 4.0: https://creativecommons.org/licenses/by-nc-sa/4.0/. Adaptations preserve this attribution and license.
