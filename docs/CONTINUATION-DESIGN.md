# Continuing the Arkham investigation

## Day rollover

- Keep `START` and `MORNING` for the prologue. Use the current UTC calendar date for game-local times, including depot departures, Harding nightfall, and arrival schedules. Route waits, travel, both parts of a skill check, and sleep through the same time advancement. Settle each day boundary once, including during longer journeys. An action that finishes at midnight can reach the next day. Apply actual venue and entry restrictions when offering and executing actions.
- At entry 102, **Turn in for the night** should record the approved sleep interval and return a playable state at home at the resulting wake time. Remove the generic 11 PM checkpoint for new play. A character still in Harding House must use the printed exit or forced consequence before travelling. Waiting, travelling, and sleeping have distinct effects.
- Keep the last meal timestamp across midnight to enforce the chosen spacing rule. Track meals taken and owed, plus sleep credited and owed, as described in [the day rules](DAY-RULES.md). Define how overnight sleep is credited and when fasting damage and natural recovery are applied. Date only checks that renew daily. Keep one-time checks, evidence, and story flags persistent. The existing `repeat` boolean groups daily and one-time checks together. Classify newspaper, library, Harding searches, and Harding follow-up checks before allowing retries. Account for Harding discoveries awarded on entry, such as the astronomical material at 24.
- Keep home rest and meals available through September 8. Add the dated branches as their destination entries ship and preserve the current state at any unsupported route. Confirm venue schedules against the handout. The university hours check currently excludes Saturdays despite the library scene's Saturday hours. Apply the specific library and office schedules through the same eligibility helper used by travel and actions.

## Existing dossiers

Introduce save schema 3. Keep the browser storage key and migrate both browser and portable saves through the same code. Preserve the existing v1 dice conversion as a step to v2, then validate against the old contract before converting v2 to v3. Back up the exact old browser library before any upgraded write and retain the existing v1 backup. Keep the portable envelope aligned with the game schema. Reject unknown versions and leave corrupt input intact.

| Previous state | First resume under the new rules |
| --- | --- |
| Playing on September 1 or 2 | Same clock, entry, and location, with pending dice and Luck costs intact. Seed daily check eligibility from the recorded attempts. |
| `complete` / `rest` | Make entry 102 playable at the recorded September 3 wake time. The eight-hour advance already happened. Assign the legacy meals and attempts to September 2 and settle any newly applicable carryover once. |
| `complete` / `dayEnd` | Resume at the saved location and entry at 11 PM. The next legal action or wait can carry the clock into September 3. Preserve any required exit or consequence. |
| `complete` / `boston`, or `ending` | Boston stays reviewable until entry 64 has playable onward choices. Entry 574 remains a story ending. |

Remove the legacy completion flag when reopening a save. Preserve allocation, recorded vitals, assets, inventory, clues, notes, visit history, and the original log and dice outcomes. Seed any debts supported by the save. Document how new rules start when historical data is incomplete and log each new consequence. Update the dossier list, story panel, daily necessities, and About copy so a reopened dossier presents normal choices and current day counts. Review fixed save limits against the new supported scope, especially timestamp ceilings and historical log, meal, and visit counts.

## Adding source entries in batches

Follow `harding.js` for grouping scenes, clues, and checks by location. Give each new entry its printed number and page, location, and authored outgoing links, and register it for save validation. Preserve saved identifiers and handle location changes through the entry transition. Check each batch for duplicate IDs, missing scene/choice/check targets, missing clues, and mismatched location registrations. Keep unresolved source discrepancies recorded with their references. At a content boundary, preserve the current entry, time, and any in-progress decision so a later batch can enable onward choices from that same state.

## Acceptance checks

- Rest from a freshly played evening and resume an imported legacy rest save. Both wake at the correct time and survive reload/export-import without adding another night or applying penalties twice.
- Resume legacy dayEnd at the depot and inside Harding. At the depot, cross midnight and catch a train on September 3. Inside Harding, retain the printed exit sequence. Verify nightfall on a later date, opening/closing boundaries, and the transition from September 8 to 9.
- Cross midnight while a meal is still too recent. Exercise each food/sleep threshold from the day rules, including a multi-day advance, and verify the result survives reload. Retry a daily failure tomorrow and confirm permanent checks and earned evidence do not reset.
- Load the v1 pending-roll fixture and representative v2 pending, rest, dayEnd, Boston, and ending states through portable import and browser storage. Resolve the same dice result with the same Luck cost. Check exact backup bytes and rejection without overwrite for a malformed or unknown save.
- Check batch references and play one route from the existing game through each added branch, including a save and resume at the new boundary. Smoke-test the resumed dossier in the browser.
