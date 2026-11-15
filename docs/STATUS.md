# Project status

Updated: 15 November 2026.

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

## v0.6.0

- 119 of 593 reachable entries, up 34 from v0.5.0 (85). This includes the numbered daily activity-table branches and the two harbor checkpoints.
- Added Cunard activity choices, shipboard encounters, recovery, gambling results, and arrival at Athens or Alexandria.
- Schema 5 resumes old embarkation checkpoints on the first morning aboard. Verified an existing embarked save in the browser and continued past the cabin encounter to Monday.
- 58 automated tests and the production build passed.

## v0.7.0

- 151 of 593 reachable entries, up 32 from v0.6.1 (119).
- Opened the Athens Bureau of Investigation, Hall of Justice, taxi leads, and supporting city services. Added the Alexandria dockside branch, Cairo station, and scheduled rail and steamer routes.
- Harbor checkpoints now resume at the saved arrival time. Verified an old Piraeus save through the case report and reload in the browser.

## v0.8.0

- 193 of 593 reachable entries, up 42 from v0.7.0 (151).
- Added Athens’ museum, Piosotos Café, the Hawkes apartment encounter, the European edition of the New York Sun, and Cairo Museum exhibits and interviews before and after October 30.
- Added original illustrations for three Cairo clues. Verified the Athens museum report through a browser reload and tested both Cairo exhibit dates and the staff interview.

## v0.9.0

- 232 of 593 reachable entries, up 39 from v0.8.0 (193).
- Added the Parthenon encounter and ring, the Kyonas charter, Cairo Police, Fuzira Marketplace, and the two-day road to the first chamber at Tell-el-Amarna.
- Verified the Parthenon encounter after a browser reload. Automated tests also cover the surviving and fatal routes, charter timing, Fuzira prices, and saving at Tell-el-Amarna.

## v0.10.0

- 329 of 593 reachable entries, up 97 from v0.9.0 (232). This excludes the prepared Harding House entries 68/188 and entry 421, which requires an item not yet obtainable.
- Added the public tomb chambers, the four exterior surveys, the concealed entrance, and the hidden pyramid's passage network, hazards, and ritual clues.
- The pyramid map fills with the original tiles as the player reaches sections. Existing dossiers retain their progress. Verified the map with a browser import and checked all puzzle links, 77 automated tests, and the production build.

## v0.11.0

- 405 of 593 reachable entries, up 76 from v0.10.0 (329).
- Opened scheduled routes to Bremen, the harbor and inn, the Amulet of Nodens encounter, and The Dark Sea. The ship offers cabin and deck investigations, a way to wait out the passage, and a playable victory ending aboard.
- Normal arrivals at Antarctica base camp save at entry 520. Tested the shipboard victory and landfall, plus boarding and saved voyage progress in the browser.

## v0.12.0

- 447 of 593 reachable entries, up 42 from v0.11.0 (405). This includes reachable evidence-only entries and excludes 68, 188, and 421.
- Opened all three Antarctica expedition parties, the Lost City above and below ground, and the ritual endings. Added three illustrated map handouts.
- Save schema 7 reopens old base camp dossiers at the recorded date and adds the expedition map. Verified Trip C through a browser reload at the Lost City and checked the map handout. The automated tests cover save migration, the three trips, the combined descent check, and two playable victories.

## Next step

Add investigator succession and the other investigators' starting routes. Cross-region transport from the Lost City and the remaining side branches are also pending. Vercel deployment and music remain later steps.

## Resuming work

Read this file and PLAN.md, inspect the current Git state, and continue from the next unfinished step. Record significant decisions and checkpoints here so interruptions do not lose project direction.
