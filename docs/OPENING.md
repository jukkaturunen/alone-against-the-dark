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

Harding House, stores, hospital, combat, sanity loss, investigator succession, onward trains, ocean travel, and later days are not implemented yet. Unavailable locations are labeled, rather than redirected or replaced with invented scenes. The first investigator is supported; arbitrary custom investigators and additional skill specialisms remain future work.

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

Version 1 saves contain investigator allocation, current entry/location/time, immutable past roll log, unresolved roll, last outcome, available funds, possessions, discovered clues, flags, attempts, meals, sleep, and player notes. Imports are validated and assigned a fresh dossier ID; they never silently replace an existing dossier. Unknown versions are rejected. Corrupt browser storage is preserved and must not be overwritten automatically.

Future expansion must migrate complete opening saves into an appropriate continuation, preserve pending outcomes and spent Luck, and translate recorded meals/sleep into ongoing day bookkeeping.

## Runtime choices

The app uses browser-native JavaScript modules with no runtime dependencies. State transitions and source content are separate from presentation. A small Node server serves only `web/` (or `dist/` for production preview), never the repository root. The eventual Vercel build is a static site; no deployment or access configuration has been applied.
