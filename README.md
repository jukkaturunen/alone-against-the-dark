# Alone Against the Dark

A personal web adaptation of the solo Call of Cthulhu adventure, using the approved Investigator's dossier design.

## Play locally

Requires Node.js 22 or newer. No runtime dependencies or API keys are needed.

```sh
npm run dev
```

Open the printed local URL (normally http://127.0.0.1:4173).

## Current playable scope

The opening telegram and one day of preparations in Arkham: Louis Grunewald's 150-point skill allocation, bank, newspaper research, university library and faculty, Harding House conversations and research, meals, and the train to Boston. The opening ends on arrival in Boston, after sleeping at home, or at the late-night checkpoint. Shopping, medical treatment, later days, and the onward adventure are explicitly unavailable.

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
