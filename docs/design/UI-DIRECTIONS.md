# UI direction review

Prepared and reviewed on 14 November 2026. The user selected Investigator's dossier: "let's go with 1, investigator's dossier".

Three interactive concepts are presented in the project chat using the same fictional, spoiler-free study scene. They are design previews, not the game implementation. Sample checks, inventory, letter, and destinations are illustrative and do not establish adventure rules or content.

## Investigator's dossier (selected)

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

## Design decision

Use Investigator's dossier for the playable opening. Preserve the warm paper surface, readable serif story text, restrained green accents, left character sidebar, and notebook navigation. Retain the story, investigator, journal, handouts, and locations views. On small screens, reflow navigation and preserve access to important character status.

The visual direction is accepted. Refine remaining interaction details within this direction; do not restart style selection. The fictional sample scene, fixed rolls, sample destinations, and sample inventory must be replaced with verified adventure content and mechanics when building the playable opening. Review that opening with the user before expanding to the complete adventure.

## Validation

The inline preview script passed a JavaScript syntax check. Browser rendering and interaction were not independently verified in this turn; the local preview server could not bind within the current execution permissions. Review the rendered inline concepts with the user before acceptance.
