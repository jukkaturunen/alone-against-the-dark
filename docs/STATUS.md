# Project status

Updated: 14 November 2026.

## Decisions

- High-level plan approved; see PLAN.md.
- Eventual deployment target: Vercel.
- Private GitHub repository; original source PDFs remain local.
- UI direction accepted: Investigator's dossier, selected by the user on 14 November 2026.
- Ambient music is optional and deferred.

## Completed

- Located the three source PDFs.
- Reviewed adventure introduction/rules and handouts at a planning level.
- Saved the approved plan and repository housekeeping files.
- Created and verified the private GitHub repository; initial checkpoint uploaded.
- Prepared three interactive, spoiler-free UI concepts in the project chat: Investigator's dossier, Quiet horror, and Expedition desk. See design/UI-DIRECTIONS.md.
- User reviewed the concepts and selected Investigator's dossier.

- Built the first playable opening with the approved dossier design and verified source content.
- Added investigator setup, Arkham choices, dice and Luck, timekeeping, evidence, notes, separate saves, and export/import.
- Passed 22 automated tests, built the static app, and exercised the main flow in the browser at desktop and phone widths. See VERIFICATION.md.
- Prepared Vercel build configuration; no deployment has been created.

- Tagged and pushed the accepted opening as v0.1.0.
- Added Harding House conversations, stealth, research, evidence drawings, and schema-1 save migration for v0.2.0.
- Passed 36 automated tests and browser checks of the new branch, pending-roll persistence, Luck, clue display, travel restrictions, and phone layout.

## v0.3.0

- Added overnight continuation, date-aware travel and opening hours, meal and sleep accounting, daily research resets, and four dated Arkham entries.
- Version 1 and 2 dossiers upgrade on load. Rest and late-night checkpoints reopen at their saved timestamps. The browser retains a backup of the old library.
- Verified the migrated next morning in the browser and passed the automated suite and production build.

## v0.4.0

- 73 of 593 reachable entries, up 23 from v0.3.0 (50). Count includes reachable evidence-only entries and deduplicates entry 25. Prepared entries 68 and 188 remain excluded.
- Enabled Arkham’s store and hospital. Added both directions of rail travel through Boston, Grand Central meals, the New York hotel, and all seven library topics with follow-up checks and two illustrated clues.
- Schema 4 reopens Boston checkpoints at their original date and time, keeps a browser backup, and supports the 12:30 AM Boston arrival.

## v0.5.0

- 85 of 593 reachable entries, up 12 from v0.4.0 (73). Entry 187 counts as the embarkation checkpoint, with its activities still in development.
- Added the Greek Consulate, Wilentz Booksellers, New York Sun reports, taxis, food stands and the food-poisoning branch. New York’s hospital and store reuse entries 585 and 38.
- Pier 56 lists the next Saturday sailing. Boarding advances to noon and saves the dossier at entry 187. Verified the pier in the browser and tested boarding, save restore, weekday hours, purchases, date gates, and street-food consequences.

## Next step

Implement the Cunard activity table and arrival routes. Vercel deployment and music remain later steps.

## Resuming work

Read this file and PLAN.md, inspect the current Git state, and continue from the next unfinished step. Record significant decisions and checkpoints here so interruptions do not lose project direction.
