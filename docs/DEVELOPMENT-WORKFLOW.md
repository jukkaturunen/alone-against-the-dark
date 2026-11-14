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

## Sprint reports

Report the cumulative number of distinct, reachable numbered entries out of 593 at the end of every sprint, along with the net change. Count scenes and entries represented by unlockable evidence once each. Exclude prepared but unreachable entries.

## Next milestone

Continue the New York location table and build the route to embarkation. Use connected branches as worker assignments.
