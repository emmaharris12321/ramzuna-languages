# Homepage redesign

This package retains the original Astro website, content, palette, fonts, assets and routes.
The refreshed homepage is in `src/pages/index.astro` and its scoped styles are in
`src/css/home-redesign.css`. Original shared components are retained.
The hero, impact strip, programme cards, Palestinian Voices feature, section ordering
and visual spacing have changed. No changes have been made to enrolment notices,
impact numbers, lessons, resource downloads, donations, or external destinations.

## Run locally
Use Node.js 22.19+ (as stated in the original README).
Run `npm install`, then `npm run dev`. To create production output, run `npm run build`.

## Validation
Archive contents and original files were checked. A production Astro build has not been
run: the available environment lacks the locked dependencies and has no internet access.
Review the homepage on desktop and mobile before publishing.
