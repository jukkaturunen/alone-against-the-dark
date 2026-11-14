# Development workflow

Approved by the user on 14 November 2026 to reduce quota consumption.

- Main chat coordinates, integrates, reviews and communicates. Recommended model: GPT-6.1 Sol at medium effort. The user controls the main chat model picker; recording this preference does not change the active model.
- Use at most two concurrent workers initially, with short self-contained briefs rather than the entire chat history.
- Routine source extraction and entry conversion: GPT-6.1 Sol, low effort.
- Implementation, save compatibility and focused review: GPT-6.1 Sol, medium effort.
- Increase effort or use Astra only for a specific unresolved problem; do not routinely use a high-effort orchestrator.
- Workers own separate files or connected content modules. One owner integrates shared engine/UI changes. Do not assign arbitrary numerical entry ranges that split connected branches.
- Verify source references, outgoing links, conditions and consequences. Run focused tests while implementing, then one integration test/build pass. Browser verification should cover changed user flows rather than repeat unchanged flows.
- Commit finished playable batches and maintain progress records. Parallelism reduces elapsed time but does not guarantee lower total account usage.

## Next milestone

Rest and continue tomorrow: calendar-aware hours and travel, daily attempt resets, meal/sleep consequences, and migration of existing rest/day-end saves. Preserve Boston as an explicit unfinished-content boundary until onward entries exist.

Before implementation, reconcile `DAY-RULES.md` with `CONTINUATION-DESIGN.md`. These preparation notes are worker output for review, not implemented behavior.
