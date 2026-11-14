# UI direction review

Prepared on 14 November 2026. Awaiting user feedback; no direction is approved yet.

Three interactive concepts are presented in the project chat using the same fictional, spoiler-free study scene. They are design previews, not the game implementation. Sample checks, inventory, letter, and destinations are illustrative and do not establish adventure rules or content.

## Investigator's dossier (recommended starting point)

Paper-like reading surface, editorial serif typography, restrained green accents, and a left sidebar containing investigator status and notebook navigation. Choices show their action and relevant check or next step.

Strength: keeps the reading experience and practical game information together. Tradeoff: more visible interface than the reading-focused alternative.

## Quiet horror

Centered reading column, larger title, generous spacing, minimal action rows, and a compact horizontal navigation bar. Investigator details live on their own screen.

Strength: immersion and comfortable long-form reading. Tradeoff: checking character status requires opening the investigator view.

## Expedition desk

Cool blue-grey palette, stronger location/time strip, and a right reference panel containing character status and navigation.

Strength: supports travel planning and resource tracking. Tradeoff: feels more like a game interface and less like a period document.

## Available preview interactions

- Story, investigator, journal, handout, and location views.
- Editable example notes, retained within the preview where host support is available.
- Fixed example dice result, explicitly labeled as a sample.
- Read a fictional letter and select a sample destination.
- Adjustable story text size through the preview's design controls.
- Responsive layout and appearance-aware palettes.

No actual game saves, travel, random rolls, music, or adventure progression are implemented.

## Feedback requested

Choose the strongest starting direction, including any elements to combine. After selection, refine that direction and review detailed interaction flows before implementation.

## Validation

The inline preview script passed a JavaScript syntax check. Browser rendering and interaction were not independently verified in this turn; the local preview server could not bind within the current execution permissions. Review the rendered inline concepts with the user before acceptance.
