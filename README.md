# Modifier Music - PCM81 Editor

Electron + React scaffolding for a production PCM81 desktop editor.

## Current scope

- Modern dark-mode UI shell with capsule navigation (no tabs).
- Placeholder control panel with high-contrast dials and required interactions.
- Data-driven PCM81 algorithm catalogue with provenance metadata.
- Catalogue validation and Vitest tests for the verified minimum algorithm names.

## Not yet implemented

- SysEx decode/encode, parameter mapping, algorithm-ID decoding, device store/write workflows.
- Live MIDI device interrogation and bank/program workflows.

> SysEx work is intentionally blocked until authoritative PCM81 MIDI implementation documentation is present in-repo.
