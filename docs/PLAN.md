# Approved project plan

Approved in chat on 14 November 2026. Vercel selected as the eventual deployment target.

## Intended experience

Faithfully adapt the published solo adventure into an atmospheric web game. Preserve player choices and deductions while automating bookkeeping. Support desktop and tablet first with a usable phone layout.

## Phases

1. Map scenes, choices, conditions, consequences, locations, and handouts. Retain source references for verification. Flag ambiguous instructions for review. Use only the Keeper Rulebook mechanics needed by the adventure.
2. Design the UI with the user before implementing the game. Present two or three visual directions using the same spoiler-free sample scene. Starting proposal: a 1930s investigator's dossier with warm paper, restrained dark surroundings, period typography, and readable text. Review play, investigator, journal/handout, travel, and dice-result screens.
3. Build a fully playable opening section: investigator setup and skill allocation, branching choices, a skill check, elapsed time, a handout, and saving/resuming. Gather user feedback before expanding.
4. Complete the adventure and its systems: required checks, combat, sanity, health, equipment, meals, sleep, travel, location schedules, and investigator succession. Explain rolls and consequences without revealing undiscovered information. Include player notes.
5. Verify connections, conditional choices, time-sensitive events, handout access, succession, endings, representative playthroughs, and save recovery. Verify content throughout development.
6. Polish atmosphere. Optional music comes only after the game works well.

## Initial scope

- Complete published adventure and four supplied investigators.
- Faithful authored narrative and rules with convenient automation.
- Autosave, separate playthroughs, and export/import backups.
- Private personal use initially; repository privacy and website access are separate decisions.
- No live AI narrator or generated story branches.

## Repository and deployment

Use a private GitHub repository named `alone-against-the-dark`. Track application code, plans, and design documents. Keep original PDFs local and ignored by Git. Connect to Vercel after the first playable section; do not deploy during planning or UI review.

Choose the application framework during implementation planning, with Vercel as the hosting target. Keep adventure content, game rules/state, and presentation separable so UI changes do not alter adventure behavior.

## Optional audio

ElevenLabs is a possible music provider, not connected or selected yet. Prefer generating a small collection of ambient tracks during development and playing those files in-game. Include user-controlled volume and gentle mood transitions. Audio must not block the core game.

## Review gates

The high-level plan is approved. UI direction still needs to be developed with and accepted by the user before game implementation. Review the playable opening before full adventure expansion.
