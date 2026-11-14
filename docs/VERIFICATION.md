# Opening verification

Verified 14 November 2026.

## Automated checks

`npm test`: 22 passing tests covering:

- Exact skill allocation budget and skill limits.
- Opening gates and initial evidence discovery.
- Travel time, closed locations, and duplicate withdrawal prevention.
- Research time, daily limits, explicit library retries, and closing time.
- Pending-roll persistence; Luck spending; fumble and Luck-roll exclusions.
- Percentile success thresholds.
- Meal spacing and daily limits.
- Faculty branches, funding, and the abandonment ending.
- Train waiting/arrival, sleep completion, and late-night endpoint.
- Import/export, multiple dossiers, invalid-save rejection, and corrupt-storage preservation.
- Library access after department offices close.

`npm run build`: successful; six app files copied to `dist/`.

JavaScript syntax and `git diff --check`: passed.

HTTP boundary checks: app returns 200; original source PDF path and `.git/config` return 404.

## Browser playthrough

Exercised the visible app through the Codex in-app browser:

1. Created a named investigation using the optional balanced allocation.
2. Read the actual opening telegram and verified it remained discovered after reload.
3. Advanced to the next morning, ate, and travelled to the Advertiser.
4. Rolled Library Use: 96 against 80. Reload preserved that exact unresolved roll.
5. Spent 16 Luck: Luck dropped from 50 to 34 and the appropriate clipping unlocked.
6. Wrote a journal note and confirmed the note, evidence, Luck, and time persisted after reload.
7. Travelled to the depot at 10 AM, took the noon train, and arrived in Boston at 1 PM with the opening marked complete.
8. Exported the completed dossier, imported the downloaded file, and confirmed a separate dossier was created.
9. Created a separate opening preview for user review.

No browser console errors or warnings were observed during the exercised flow.

## Layout review

Inspected the dossier at 1280px desktop and 390px phone widths. Confirmed no horizontal overflow at 390px and 320px. Character status remains visible and navigation wraps on phones. Fixed scroll retention so a new scene begins at the top after setup or navigation. Browser viewport override was reset after testing.

The final late-night endpoint and after-hours library adjustments were verified by added engine tests; the browser walkthrough above exercised the principal path before those two targeted adjustments.

## Remaining review

User playtest of reading comfort, navigation, pace, and skill allocation is the next checkpoint. The full adventure is not yet playable. Cross-device/cloud saving, concurrent-tab coordination, full accessibility audit, later-day rules, and production hosting are not claimed as verified.
