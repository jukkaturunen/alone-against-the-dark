# Playable opening: scope and interpretation

The opening and Harding sections below record v0.1–v0.2 behavior. See the v0.3 and v0.4 notes for current calendar and save behavior.

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


## Multi-day Arkham (v0.3.0)

Resting at home plays through the wake time. Travel, research, and waiting can cross midnight. Daily resets apply to newspaper checks, room searches, and Harding persuasion. Previously collected evidence and one-time follow-up attempts persist. Saturday library hours and September 9 / October 1 branches use the in-game date. After a visit to entry 147, its return link goes to 102 with home meals and sleep disabled so the printed redirects cannot trap the player.

Meal periods count on their start date and must start six hours apart, including across midnight. Meal periods make up yesterday's debt first. Unpaid debt expires with one health lost at midnight, and missed current periods carry one day forward. Where food is unavailable, a one-hour substitute rest counts as a period and costs at most one health per date. On a date with a fasting penalty, daily natural healing is skipped. A night without a sleep block by 8 AM adds eight hours to the next block. These timing choices resolve ambiguities in the source. Sleep at home is available from 8 PM into the early morning, through September 8.

Save schema 3 preserves historical meals, notes, clues, and pending dice. A migrated rest checkpoint starts at its already-recorded wake time with prior-day meal debt initialized. A migrated late-night checkpoint resumes in place with its original exit requirements. Boston still ends the preview.


## Boston, New York and Arkham services (v0.4.0)

- Rail travel follows entries 16, 64, and 146. Schedules use the in-game date, including the 12:30 AM Boston arrival. Local travel stays within the current city. Legacy Boston checkpoints resume in place with the train schedule available.
- Arkham's store uses a fixed selection of ordinary purchases without debiting cash, consistent with the equipment rules on p. 7. Hospital recovery uses Luck and the appropriate D3 roll for the first 24-hour period and one point for each additional 24-hour period. Meals and sleep are scheduled during treatment and hospital recovery replaces ordinary daily healing.
- At the New York library, each topic takes two hours and counts toward the two topics per visit. Follow-up rolls are once per visit. A successful language check takes two additional hours for its book. The first reading at entry 140 grants one Mythos and costs one Sanity. Entries 117 and 182 unlock cropped source illustrations. Entry 25 shares its existing Arkham clue.
- Boston lodging with friends and the New York hotel use the existing continuous sleep rules. The hotel offers room service. Rail and lodging prices are not specified in the source entries, so this version follows the general rule allowing reasonable expenses without bookkeeping.


## New York and embarkation (v0.5.0)

- Greek Consulate 30 follows the split weekday opening hours. Wilentz 54 allows three distinct books, with normal purchase bookkeeping omitted per p. 7. Phrase books are retained for later use in Athens and Cairo.
- The New York Sun uses the regular daily hours or a Luck check outside them. Arrival costs the usual hour of local travel. Reports unlock on the dates given by the source. Entry 190 unlocks the dispatch at entry 156 from December 1, which retains its printed December 20 dateline.
- New York’s taxis use the shared local travel time. Street food takes one hour and triggers a Constitution check on a 10 on 1D10. Failure takes three hours and costs one health.
- Pier 56 lists the next departure. The board action is available on the departure date through noon and advances to that departure time. Entry 187 saves the embarkation checkpoint for the future ship activity table. Tickets and travel expenses follow the optional book-keeping rule, so the purchase is implicit in boarding.


## Cunard crossing (v0.6.0)

- Entry 187 offers activities one period at a time rather than asking players to commit to all three at the start of the day. Morning, afternoon and evening choices use the printed time slots. The ship calendar tracks days and skips ordinary hourly meal and sleep accounting. A printed “move on a day” ends the remaining periods for that day.
- The ship encounters use staged percentile checks and a compact combat sequence. Shipboard treatment uses voyage days. After the guarded escape at 139, players can select their destination without further activity rolls. Investigator succession after an ending remains pending.
- Gambling at 579 and 385 changes carried cash. Losses are limited to cash on hand. Routine purchases and fares follow the book’s optional expense bookkeeping rule.
- Version 5 migrates prior entry 187 checkpoints from the saved Saturday departure to Sunday morning. Checkpoints at Piraeus and Alexandria preserve landfall at noon Monday and 1 PM Tuesday, respectively.

The v0.6.1 activity table adds two pacing options. Skip quiet periods looks for the next period where an available activity can lead to an encounter. Skip to landfall passes over all remaining activities and leaves the port choice open. Both are available between encounters.


## Athens and Alexandria (v0.7.0)

- The Athens Bureau follows the 2–6 PM afternoon hours printed in entry 130 and the weekday rule in the handout. The Hall of Justice follows its own 3–7 PM window. Grunewald needs an interpreter, a phrasebook, or an allocated Greek skill to speak with the sergeant. Christos’s fee is quoted in the scene and falls under optional expense bookkeeping.
- Alexandria’s dockside conversation requires an allocated Arabic skill. Combat in the passage uses a compact percentile sequence. The Athens moderate hotel supports the first night. Its second-night branch and the onward leads from Athens and Cairo are pending.
- Trains and steamers follow station and harbor schedules and advance the in-game clock. The Athens-to-Cairo train branch through entry 42 and long-distance sailings will open with their destination content.
- Save schema 6 reopens old harbor checkpoints at their recorded location and time.


## Museums and Piosotos Café (v0.8.0)

- The Athens museum closes for lunch and the director is away from December onward. Its galleries share the archaeological report with the Arkham newspaper. Interview observations are recorded as evidence.
- Cairo’s museum changes on October 30 and charges one in-game hour for each post-cutoff exhibit or office visit. The curator interviews and exhibits are playable. The theft and earlier confrontation branches are deferred.
- At Piosotos, Christos can interpret automatically. The apartment encounter checks five observations before the Intelligence roll. Intelligence bonuses are capped at 99%. The card game’s twenty minutes are rounded to half an hour to match the game clock. Its $35 in winnings change carried cash.


## The Parthenon, Fuzira, and Tell-el-Amarna (v0.9.0)

- The first Parthenon visit uses the printed sunset encounter regardless of arrival hour. Breaking the second grapple uses an Extreme STR check to represent the combined opposition. The survivor’s cab and rest advance to the next morning, grant the warning and ring, and leave later visits quiet.
- The Kyonas takes 24 hours to prepare and 48 hours to cross. The self-drive route to Tell-el-Amarna takes 48 hours each way. These actions account for provisions and overnight stops together. The driver-guide route and the tomb beyond its first chamber are pending.
- Fuzira’s outfitters use sample prices with the printed 200% markup and a successful Hard bargain returns them to normal. These purchases debit carried cash. The dagger stall represents the three-hour prize attempt with one roll. Its piastres are not converted to dollars. The mirror encounter resolves immediate Sanity loss; its later pursuit and hired bearers are pending.
