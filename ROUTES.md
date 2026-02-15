# PCM81 Editor + Librarian Routes

This app uses a single-window shell with internal route state managed in the renderer.

## Route Table

| Route | Title | Purpose | Entry Conditions |
|---|---|---|---|
| `/algorithm` | Algorithm | Primary algorithm signal flow editing. | Default on app launch. |
| `/reverb` | Reverb | Reverb-focused controls and topology view. | User selects Reverb tab. |
| `/patching` | Patching | Mod matrix and patch routing. | User selects Patching tab. |
| `/common` | Common | Shared program controls and metadata. | User selects Common tab. |
| `/system` | System | Device/editor settings, MIDI and SysEx preferences. | User selects System tab. |

## Overlay/Modal Routes (UI State)

| UI State Key | Surface | Trigger | Dismissal |
|---|---|---|---|
| `modal:midi-setup` | MIDI Setup modal | Right rail `MIDI Setup` button | Close button, Esc, backdrop click |
| `modal:slot-picker` | Register slot picker | Save when no empty slot determinable | Confirm/cancel |
| `modal:confirm-overwrite` | Overwrite confirmation | Save to occupied register slot | Confirm/cancel |
| `panel:sysex-monitor` | SysEx Monitor panel | Toggle from Help or debug control | Toggle off / close |
| `modal:help` | Help | Right rail `Help` button | Close button / Esc |

## Navigation Behavior
- Tab switch does not reset unsaved in-memory patch state.
- Switching routes preserves right rail scroll and file browser selection.
- If a modal is open, background route remains active but non-interactive.
- Deep links (future-ready): route names are stable for optional URL hash mapping (`#/algorithm`, etc.) even in desktop runtime.

## Command Actions and Route Interaction
- `PCM81 -> Editor` and `Editor -> PCM81` are global actions available on all routes.
- Bank/program change controls are global and do not navigate; they mutate active program context and refresh the current route.
- File browser row selection updates program context on the current route.

## Guardrails
- In `Disconnected` MIDI state, System route remains fully interactive; transport actions on other routes are disabled with tooltip reasons.
- Critical route transitions (e.g., program load with dirty state) require confirm dialog.
