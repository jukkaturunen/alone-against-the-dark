# Alone Against the Dark

A personal web adaptation of the solo Call of Cthulhu adventure, using the approved Investigator's dossier design.

## Play locally

Requires Node.js 22 or newer. No runtime dependencies or API keys are needed.

```sh
npm run dev
```

Open the printed local URL (normally http://127.0.0.1:4173).

## Current playable scope

Play the opening telegram and prepare in Arkham across multiple days before taking the train through Boston to New York. Resting at home through 8 September advances to the next morning. Old rest and late-night saves resume automatically. Buy supplies or recover health in Arkham. In New York, research at the public library, eat at Grand Central, or stay at the hotel. Older Boston checkpoints now resume at the station. Visit New York’s contacts and board the Saturday Cunard liner at Pier 56. Play the crossing’s shipboard encounters and disembark at Athens or Alexandria. Continue to the Bureau of Investigation and Hall of Justice in Athens, explore the Alexandria docks, visit the Athens museum and Piosotos Café, or take the train to Cairo and explore its museum and Fuzira Marketplace. Search the pyramid at Tell-el-Amarna, explore the public tomb, and fill in a map of the hidden sections as you discover them.

Follow the expedition lead to Bremen and board The Dark Sea. Investigate aboard, or land at Antarctica base camp and choose one of three expedition parties. The Lost City has explorable streets, underground passages, and several endings. Existing base camp dossiers resume at their saved date.

At eligible endings, pass the investigation from Grunewald to Ernest Holt, Lydia Lau, and Devon Wilson. Each starts with their own character sheet and supplies. Journal notes and the event timeline remain in the same dossier.

Progress, pending dice results, discovered evidence, and notes autosave in this browser. Separate dossiers and JSON export/import are supported. Import creates a separate dossier. Browser storage is not cross-device cloud storage; export a backup before clearing browser data.

## Checks and build

```sh
npm test
npm run build
npm run preview
```

The production build copies only `web/` into `dist/`. `vercel.json` prepares this output for Vercel; no deployment has been created. Website access must be configured separately from repository privacy.

## Structure

- `web/data.js`: verified opening scenes, clues, skill bases, and location metadata.
- `web/engine.js`: state transitions, rolls, timekeeping, and save validation.
- `web/storage.js`: browser persistence and portable saves.
- `web/app.js`, `web/styles.css`: dossier interface.
- `scripts/`: dependency-free local server and build.
- `test/`: rules and persistence regression tests.

## Project documents

- [Approved plan](docs/PLAN.md)
- [Progress and next steps](docs/STATUS.md)
- [UI direction](docs/design/UI-DIRECTIONS.md)
- [Opening scope and adaptation decisions](docs/OPENING.md)
- [Verification](docs/VERIFICATION.md)

## Local source material

The owner supplies three PDFs in `src/`: the adventure, handouts and ready-made investigators, and the Keeper Rulebook. Originals are excluded from Git and the web server. A fresh clone does not include them. The private repository contains the adapted opening's text and rules; it is not a public redistribution package.

Alone Against the Dark © Chaosium Inc. Adventure by Matthew Costello with Mike Mason. This is a personal adaptation, not an official Chaosium product.
