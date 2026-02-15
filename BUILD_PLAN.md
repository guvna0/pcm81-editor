# Build Plan (Vertical Slice Tickets)

Order is intentional; each ticket leaves the app runnable.

## T01 — App shell + routing scaffold
**Goal:** Introduce stable route state for five primary tabs.

**Acceptance criteria**
- Tab keys: algorithm, reverb, patching, common, system.
- Route state persists while app runs.
- Active tab styling matches tokenized dark theme.

## T02 — Token system wiring
**Goal:** Load `UI_TOKENS.json` into CSS variables/theme module.

**Acceptance criteria**
- Color, spacing, typography, radii available as runtime theme values.
- Existing hard-coded style values replaced in shell components.
- No visual regressions in current placeholder UI.

## T03 — Right rail skeleton and action layout
**Goal:** Implement right rail with required action buttons and status area.

**Acceptance criteria**
- Buttons: MIDI Setup, Help, PCM81->Editor, Editor->PCM81.
- Bank/program controls visible with current readout.
- Rail layout remains fixed width and scroll-safe.

## T04 — Reusable primitives (TabBar, Modal, Toast)
**Goal:** Standardize common controls before domain-specific features.

**Acceptance criteria**
- `TabBar`, `Modal`, `Toast` implemented to COMPONENTS.md contract.
- Keyboard navigation + focus ring behavior verified.
- Toast stack supports at least 3 simultaneous messages.

## T05 — Dial control v1
**Goal:** Replace current parameter knob implementation with contract-compliant `Dial`.

**Acceptance criteria**
- Supports drag, wheel, shift-fine adjustment, reset on double-click.
- Value formatting callback supported.
- Disabled and error states rendered correctly.

## T06 — PRO parameter styling and lock logic
**Goal:** Visual and behavior treatment for PRO-only parameters.

**Acceptance criteria**
- PRO accent ring and PRO badge displayed when `isPro`.
- Locked state prevents edits and shows tooltip rationale.
- Non-PRO parameters unaffected.

## T07 — DiagramCanvas foundation (Algorithm tab)
**Goal:** Build interaction-ready diagram canvas for algorithm view.

**Acceptance criteria**
- Renders nodes/edges from data model.
- Node selection updates parameter panel context.
- Zoom presets 75/100/125 available.

## T08 — FileBrowserList integration
**Goal:** Add right-rail file list for local patch browsing.

**Acceptance criteria**
- List shows filename, metadata, parse state.
- Import/export actions wired to stubs with toast feedback.
- Unsupported/corrupt rows visibly differentiated.

## T09 — MIDI Setup and device state model
**Goal:** Establish MIDI connection lifecycle and status badges.

**Acceptance criteria**
- States: disconnected, connected-idle, receiving, error.
- MIDI setup modal allows selecting input/output devices.
- Right rail action enable/disable logic tied to state.

## T10 — SysEx transport baseline (PCM80 format + PCM81 IDs)
**Goal:** Implement send/receive parser with dual product ID acceptance.

**Acceptance criteria**
- Accept product IDs 0x07 and 0x10.
- Reject invalid checksum/length with explicit error events.
- Send/receive actions invoke transport service and emit toasts.

## T11 — SysEx Monitor panel
**Goal:** Add packet/event inspection UI for debugging and validation.

**Acceptance criteria**
- Monitor displays direction, status, timestamp, summary, raw bytes.
- Filter supports all/in/out/error.
- Copy raw hex action available per event.

## T12 — Register-bank save workflow
**Goal:** Enforce save target policy and slot selection behavior.

**Acceptance criteria**
- Save operation targets register bank only.
- First empty slot auto-selected when determinable.
- Slot picker modal shown when no empty slot is known.

## T13 — Program/bank change interactions
**Goal:** Make bank/program selectors functional and stateful.

**Acceptance criteria**
- Current bank/program readout updates after selection or device pull.
- Dirty-state confirmation shown when loading another program.
- Route does not change when bank/program changes.

## T14 — Reverb/Patching/Common/System screen completion pass
**Goal:** Replace placeholder content with structured v1 screen layouts.

**Acceptance criteria**
- Each tab includes required sections from DESIGN.md.
- Controls use shared primitives and tokens.
- Empty states and loading states are present.

## T15 — Hardware validation harness and QA checklist
**Goal:** Validate SysEx against real PCM81 captures and finalize release readiness.

**Acceptance criteria**
- Comparison tool verifies outbound/inbound bytes against sniffed dumps.
- Known-good capture fixtures committed for regression tests.
- QA checklist includes offline startup, MIDI error recovery, save workflow.
