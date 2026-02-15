# PCM81 Editor + Librarian Design Specification

## 1) Product and Platform Constraints
- **Target runtime:** Windows desktop (Electron shell + React + TypeScript renderer).
- **Offline-first:** No network required for core editing/librarian workflows.
- **Device target:** Lexicon PCM81, **OS v1**, no expansion cards.
- **MIDI/SysEx policy:** Use PCM80 SysEx schema; accept PCM81 product IDs `0x07` and `0x10`; keep monitor tooling for validating packets against hardware captures.
- **Bank behavior:** Editor can modify program bank contents in-memory. Persisting/sending to hardware always targets **Register bank**; write to first empty slot when determinable, otherwise prompt slot picker.

---

## 2) Layout Grid and Shell

## 2.1 App Window Layout
- Minimum window: **1280x800**.
- Recommended default: **1440x900**.
- Shell uses a **12-column responsive grid** with fixed right rail.

### Desktop layout (>= 1280 px width)
- **Top App Bar**: 64 px height.
- **Primary Tabs row**: 48 px height, below app bar.
- **Content area**: remaining height.
- Content area split:
  - **Main stage**: left, fluid width.
  - **Right rail**: fixed **360 px** width.

### Main stage sub-layout
- Internal 12-column grid with 24 px gutters.
- Sections:
  - **Center diagram zone** (Algorithm/Reverb/Patching): columns 2-11.
  - **Bottom inspector strip (optional)**: 220 px max height for contextual details (collapsed by default in v1).

### Right rail sub-layout
- Vertical stack with sticky sections:
  1. Transport/actions group.
  2. MIDI status + setup.
  3. Program/bank controls.
  4. File browser (fills remaining space, scrollable).

---

## 3) Navigation and Screen Map

Primary tabs (single selection):
1. **Algorithm** (default)
2. **Reverb**
3. **Patching**
4. **Common**
5. **System**

Global app surfaces:
- **MIDI Setup** modal.
- **Help** drawer/modal.
- **SysEx Monitor** panel (toggle from right rail; docked bottom sheet or modal).
- **Toasts** for non-blocking feedback.

---

## 4) Component Inventory (v1)

### Shell + layout
- `AppFrame`
- `TopBar`
- `PrimaryTabBar`
- `RightRail`
- `PaneSection`

### Parameter controls
- `Dial` (primary numeric control)
- `Toggle`
- `Dropdown`
- `ValueChip` (formatted numeric/value label)
- `ProTag` (small marker)

### PCM81 workflow components
- `DiagramCanvas` (algorithm/reverb routing)
- `FileBrowserList`
- `SysExMonitor`
- `BankProgramStatus`

### Feedback and overlays
- `Modal`
- `Toast`
- `ConfirmDialog`

---

## 5) Typography Scale

Typeface stack:
- UI/body: `Inter, Segoe UI, Roboto, sans-serif`
- Mono/status bytes: `JetBrains Mono, Consolas, monospace`

Scale (px / line-height / weight):
- `display-sm`: 28 / 36 / 600
- `title-lg`: 22 / 30 / 600
- `title-md`: 18 / 26 / 600
- `title-sm`: 16 / 24 / 600
- `body-lg`: 15 / 24 / 400
- `body-md`: 14 / 22 / 400
- `body-sm`: 13 / 20 / 400
- `label-md`: 12 / 16 / 500
- `label-sm`: 11 / 14 / 500
- `mono-sm`: 12 / 18 / 500

Rules:
- Tab labels use `label-md` uppercase 2% tracking.
- Dial value text uses `body-sm` mono for stable width.
- PRO tags use `label-sm` uppercase.

---

## 6) Colour Palette and Theming

Dark mode default:
- Background base: `#0B0E14`
- Surface 1: `#111826`
- Surface 2: `#182235`
- Surface 3/elevated: `#22314A`
- Border subtle: `#2E3B54`
- Border strong: `#3F5273`
- Text primary: `#E9EEF8`
- Text secondary: `#9DAEC8`
- Text muted: `#72839F`
- Brand accent: `#4DA3FF`
- Focus accent: `#7CC4FF`
- Success: `#3BC87D`
- Warning: `#F3B95B`
- Error: `#FF6B6B`
- PRO accent ring: `#BE7BFF`
- MIDI activity pulse: `#39D98A`

Contrast requirement:
- Body text must meet at least WCAG AA on primary surfaces.

---

## 7) Control Behavior + Interaction States

Common control states:
- `default`, `hover`, `active`, `focus-visible`, `disabled`, `error`.
- Focus ring: 2 px outside border using focus accent at 80% opacity.

### Dial
- Circular knob with indicator notch + value field + label.
- Drag vertical and mouse wheel increments.
- `Shift` = fine step (1/10 normal).
- Double-click resets to patch default.
- Value formatting delegated by parameter formatter (e.g., `ms`, `%`, `dB`, note values).

### PRO-only parameters
- Dial ring stroke color = PRO accent.
- Add 10x10 `PRO` tag at top-right of control card.
- Tooltip copy: `Available on PCM81 Pro configurations.`
- If unavailable in target unit profile, control is read-only (shows lock icon + muted state).

### Dropdown
- 36 px control height.
- Searchable only when option count > 12.

### Toggle
- 44x24 switch track.
- Keyboard: `Space` toggles when focused.

---

## 8) Error and Edge States

### MIDI connection states
- `Disconnected`: right rail status badge gray, actions disabled except MIDI Setup.
- `Connected/Idle`: blue badge.
- `Receiving`: pulsing green dot.
- `Error`: red badge + toast + details in SysEx Monitor.

### SysEx handling errors
- Unknown product ID -> blocking modal with raw bytes preview.
- Bad checksum/length -> non-blocking toast + detailed row in monitor.
- Timeout on send -> retry option (up to 2 automatic retries, then manual).

### Save-to-register edge cases
- First empty register slot found -> preselect and confirm.
- No empty slot determinable -> slot picker modal required.
- Write protected / reject from hardware -> error toast + keep unsaved dirty state.

### File browser errors
- Unsupported file extension: show inline warning icon + tooltip.
- Corrupt patch file: row tinted warning with `Cannot parse` reason.

---

## 9) Per-Screen Specs

## 9.1 Algorithm tab
Purpose: Primary patch editing around routing/algorithm.

Layout:
- Center: `DiagramCanvas` with node graph of active algorithm.
- Left contextual strip (optional in v1.1): algorithm metadata.
- Right rail: parameter groups bound to selected node.

Interactions:
- Click node -> loads parameter group in right panel subsection.
- Hover node -> quick summary tooltip.
- Diagram zoom fixed presets: 75/100/125%.

## 9.2 Reverb tab
Purpose: Reverb macro and deep parameter editing.

Layout:
- Center: reverb topology diagram + response hints.
- Right: grouped controls (`Early`, `Late`, `Diffusion`, `EQ`).

Interactions:
- Preset macro dropdown updates grouped defaults.
- Wet/dry and decay dials always pinned top.

## 9.3 Patching tab
Purpose: Modulation and source/destination routing.

Layout:
- Center: matrix-style patch map (source rows x destination columns).
- Right: selected patch slot editor (source, destination, amount, polarity).

Interactions:
- Click matrix cell -> selects/edits assignment.
- Empty cell double-click -> create route with default amount 0.

## 9.4 Common tab
Purpose: shared program-level controls.

Sections:
- Input/output levels.
- Mix and balance.
- Tempo/clock relations.
- Program naming metadata.

## 9.5 System tab
Purpose: global device/editor settings.

Sections:
- MIDI channel and ports.
- SysEx preferences (IDs accepted: 0x07, 0x10).
- Editor preferences (autosave interval, UI scale).

## 9.6 Right rail global panel
Order (top to bottom):
1. MIDI Setup button.
2. Help button.
3. `PCM81 -> Editor` action.
4. `Editor -> PCM81` action.
5. Bank Change dropdown + Program Change dropdown.
6. Current bank/program readout (`BANK X / PRG YY`).
7. File Browser list + import/export actions.

Button constraints:
- Primary send/receive buttons 40 px height, full width.
- Disabled when transport state invalid.

---

## 10) Accessibility and Input
- Full keyboard navigation for tabs and right-rail actions.
- Minimum hit target: 32x32 px (except dense matrix cells, min 24x24).
- DiagramCanvas node focusable via keyboard list fallback.
- Toasts announced through ARIA live region.

---

## 11) Telemetry (local-only logs)
- Write operational logs locally (rotating file) for:
  - MIDI open/close events.
  - SysEx send/receive summaries.
  - Parse errors.
- No remote analytics in v1.
