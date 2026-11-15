# Visual refinement — Ramzunā Languages

## Assessment
The original desktop root size was 18px, enlarging every rem-based dimension by 12.5% compared with the usual 16px default. Programme cards had a forced 440px minimum height, and the hero used 8rem of vertical padding on each side at desktop. Multiple large headings, pills, timelines, shadows and repeated application notices competed for attention. These are source-based findings; live browser preview was unavailable in this environment.

## Changes
- Restored browser-default text scaling; body text remains readable and zoomable.
- Refined the hero around one message, retaining the existing illustration and brand colours. Reduced hero padding to 36–68px at the top, with a compact impact-statistics row below.
- Removed the decorative wave and duplicate floating “free” badge.
- Removed programme-card minimum heights and enlarged desktop overrides. Unified card padding, corners, type scale and stroke icons.
- Reduced homepage section padding from 80–112px (90–126px at the former desktop root size) to 48–64px.
- Replaced the oversized calendar timeline with compact term dates, preserving all supplied dates.
- Kept the existing section order, programme links, content pages, imagery and dependencies.
- Simplified repetitive closure copy while retaining the notice in the hero and teaching card. Changed the bottom invitation to focus on available learning resources.
- Replaced “From Sign-Up to Fluency in 4 Steps” with “How learning with us works”, avoiding an implied fluency guarantee.
- Retained the usability fixes from the previous revision.

## Verification
- Production build: passed; all 89 pages generated.
- Homepage: exactly one H1; local image files exist; all local link destinations generated.
- Visual browser QA: unverified because the managed preview relay was unavailable. Check desktop, mobile, dark mode and keyboard interactions before deploying.
- No live site was deployed.

## Use
Run `npm ci`, then `npm run dev`. Build for production with `npm run build`.
