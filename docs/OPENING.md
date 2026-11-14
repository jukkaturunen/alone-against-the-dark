# Playable opening: scope and interpretation

## Source mapping

All references below refer to printed pages. Original PDFs remain in local `src/`.

| Feature | Source |
| --- | --- |
| Initial investigator and 150 added skill points | Adventure p. 5; Handouts p. 5 |
| Base skills and percentile difficulty thresholds | Keeper Rulebook pp. 56, 82–83 |
| Luck spending, prohibitions, fumbles | Adventure p. 6; Keeper Rulebook p. 99 |
| Travel, research, food, sleep, telephone rules | Adventure pp. 7–8 |
| Opening telegram and overnight transition | Entry 13, pp. 11–12 |
| Grunewald's home | Entry 102, p. 25 |
| Bank | Entry 3, p. 10 |
| Newspaper research | Entry 60, p. 19; outcomes 48, 125, 168 |
| Newspaper information | Entries 80 and 136 |
| University, faculty, and library | Entries 82, 122, 100, 186, 145; research outcomes 25 and 70 |
| Abandoning the journey | Entry 574 |
| Diner | Entry 593, p. 90 |
| Arkham-to-Boston train | Entries 16 and 64 |
| Location schedules | Handouts pp. 3–4 |

## Boundaries

The build covers the evening of 1 September and the first day in Arkham on 2 September 1931. It ends at Boston, after turning in at home, or at a late-night checkpoint. Ending this preview is not treated as winning the adventure. The Dean's abandonment option is a genuine story ending.

Stores, hospital, combat, sanity loss, investigator succession, onward trains, ocean travel, and later days are not implemented yet. Unavailable locations are labeled, rather than redirected or replaced with invented scenes. The first investigator is supported; arbitrary custom investigators and additional skill specialisms remain future work.

## Explicit adaptation choices

- The book specifies evening for the introduction and the next morning after sleeping, but not exact hours. The journal uses 8 PM for the introduction and 6 AM for the following morning, with eight hours of sleep recorded; intervening evening time covers packing and correspondence.
- Skill setup includes a broad fixed list of period skills and relevant specialisms. The supplied investigator's percentages override generic bases. Added points must total 150, and final values are capped at 99. Cthulhu Mythos starts at zero and cannot receive setup points. The optional balanced allocation is a convenience, not prescribed by the book.
- Local travel takes one hour. Movement inside the university does not add another local-travel hour. Each faculty interview, research attempt, and newspaper information request/call costs one hour; the last is a consistent interpretation of the general topic/interview rule where the entry gives no explicit duration.
- University offices close at 5 PM; library access remains possible until 9 PM. Research can finish at closing, but cannot start then.
- Newspaper checks are once per skill that day. Entry 145 expressly permits an attempt each hour at the university library. Already discovered evidence cannot be farmed or duplicated.
- Percentile rolls use browser cryptographic randomness. The rolled result is saved before the player accepts it or spends Luck. Fumbles and Luck rolls cannot be altered. No Luck recovery or pushed rolls are implemented.
- Meals each take an hour, with at least six hours between their start times and two per day. The first day can have missed meals; the record is preserved. Later-day meal debt, fasting damage, and sleep debt must be implemented before removing the date boundary.
- Rest at home is offered from 8 PM onward in this opening. It advances eight hours and ends the slice. A checkpoint at 11 PM prevents players outside the home from becoming stuck at the date boundary.
- Automatic evidence collection preserves only discovered material. Looking at evidence, menus, the character sheet, or notes consumes no game time. The telegram is transcribed as text, rather than shipped as a PDF image.
- Some narrative passages are condensed, notably entry 102 and the abandonment ending. Such scenes are marked as screen adaptations. No generated branches are added.

## Save contract

Saves contain investigator allocation, current entry/location/time, immutable past roll log, unresolved roll, last outcome, available funds, possessions, discovered clues, flags, attempts, meals, sleep, and player notes. Imports are validated and assigned a fresh dossier ID; they never silently replace an existing dossier. Unknown versions are rejected. Corrupt browser storage is preserved and must not be overwritten automatically.

Future expansion must migrate complete opening saves into an appropriate continuation, preserve pending outcomes and spent Luck, and translate recorded meals/sleep into ongoing day bookkeeping.

## Runtime choices

The app uses browser-native JavaScript modules with no runtime dependencies. State transitions and source content are separate from presentation. A small Node server serves only `web/` (or `dist/` for production preview), never the repository root. The eventual Vercel build is a static site; no deployment or access configuration has been applied.

## Harding House expansion (v0.2.0)

- Entry 113 conversations follow the printed outcomes: Fast Talk, Charm, and bribery lead directly to refusals; Persuade calls for a roll. Each conversation costs one hour under the general interview rule. Bribery does not deduct money when refused.
- “Respectable hours” is interpreted as 8 AM–8 PM; nighttime approach begins at 8 PM. Door/window access and procedural Stealth checks do not add an unspecified hour. Each room search costs one hour, once per listed skill per day. Follow-up History at 212 adds an hour only on success.
- Entry 52 requires Stealth for every room attempt. On failure, the chosen room is shown before entry 51; searching and travel are blocked until that consequence is resolved. Leaving entry 150 also requires Stealth.
- Entry 7 explicitly directs trying a door to 51, even following successful Stealth. This unusual printed route is preserved rather than silently redirected to 52.
- Source discrepancy awaiting review: entry 68 lists incoming references from 24 and 49, but neither entry's outgoing text directs there. Entries 68/188 and the drawing are prepared in the content module, but no invented path exposes them. The reachable map-like symbol from entry 46 uses a cropped original drawing.
- Nameless Cults initial reading takes an additional hour, grants 3 Mythos points once, and adds the book to possessions. A search is unavailable too late to finish this initial reading. Full reading, Sanity costs, and spell study remain deferred with later days. A natural 01 is treated as critical even at zero Mythos; Luck cannot purchase a critical.
- Save schema 2 adds Mythos and explicit check difficulty/duration. Schema 1 imports and browser saves are migrated while preserving pending rolls, notes, funds, and outcomes. The original browser library is backed up before upgrading. Completed opening dossiers remain completed; later-day continuation still requires a future migration.
