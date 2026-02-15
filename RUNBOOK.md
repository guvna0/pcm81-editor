# PCM81 Editor Runbook (Tickets 1-6)

## Run in development
1. Install dependencies: `npm install`
2. Start app: `npm run dev`
3. Electron window should open with React UI, tabs, right rail, MIDI Setup modal, and SysEx Monitor.

## Test and checks
- Typecheck: `npm run typecheck`
- Lint alias: `npm run lint`
- Unit tests: `npm test`

## Build
- Production build: `npm run build`
- Output:
  - Renderer: `dist/renderer`
  - Main/preload: `dist/main`

## Package (manual baseline)
- This repository currently outputs build artifacts only.
- To package installers, add `electron-builder` or `electron-forge` and configure Windows targets.

## Filesystem behavior
- Patch files are saved in `./patches` (working directory) as:
  - `<name>_<timestamp>.syx`
  - `<name>_<timestamp>.json` (metadata sidecar)
- Save operations are restricted to Register bank at service layer.
