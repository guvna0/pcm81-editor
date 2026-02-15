# Component API Contracts

All contracts are written for React + TypeScript and intended for strict mode.

## 1) `Dial`

### Purpose
Continuous/discrete numeric parameter input with label and formatted value.

### Props
- `id: string`
- `label: string`
- `value: number`
- `min: number`
- `max: number`
- `step?: number` (default `1`)
- `fineStep?: number` (default `step / 10`)
- `unit?: string`
- `formatValue?: (value: number) => string`
- `isPro?: boolean`
- `isLocked?: boolean`
- `disabled?: boolean`
- `onChange: (nextValue: number) => void`
- `onCommit?: (nextValue: number) => void`

### Behavior contract
- Clamps value to `[min, max]` before calling `onChange`.
- Shift-modified input uses `fineStep`.
- Double-click resets to initial mount value unless `isLocked`/`disabled`.
- If `isPro=true`, shows PRO accent ring and `PRO` badge.

---

## 2) `Toggle`

### Props
- `id: string`
- `label: string`
- `checked: boolean`
- `disabled?: boolean`
- `description?: string`
- `onChange: (checked: boolean) => void`

### Behavior contract
- Click or Space toggles when enabled.
- Emits next state once per user gesture.

---

## 3) `Dropdown`

### Types
- `type DropdownOption = { value: string; label: string; disabled?: boolean; meta?: string }`

### Props
- `id: string`
- `label?: string`
- `value: string | null`
- `options: DropdownOption[]`
- `placeholder?: string`
- `disabled?: boolean`
- `searchable?: boolean`
- `onChange: (value: string) => void`

### Behavior contract
- `onChange` fires only on valid selectable option.
- Keyboard: Arrow keys navigate, Enter selects, Esc closes.
- If `searchable` omitted, auto-enable when options length > 12.

---

## 4) `TabBar`

### Types
- `type TabKey = 'algorithm' | 'reverb' | 'patching' | 'common' | 'system'`
- `type TabItem = { key: TabKey; label: string; disabled?: boolean; badge?: string }`

### Props
- `items: TabItem[]`
- `active: TabKey`
- `onChange: (next: TabKey) => void`

### Behavior contract
- Exactly one tab selected.
- Keyboard roving focus; Enter/Space activates.

---

## 5) `Modal`

### Props
- `isOpen: boolean`
- `title: string`
- `size?: 'sm' | 'md' | 'lg' | 'xl'` (default `md`)
- `closeOnBackdrop?: boolean` (default `true`)
- `closeOnEsc?: boolean` (default `true`)
- `footer?: React.ReactNode`
- `onClose: () => void`
- `children: React.ReactNode`

### Behavior contract
- Focus trap active while open.
- Restores previously focused element on close.
- `onClose` called exactly once per dismissal action.

---

## 6) `Toast`

### Types
- `type ToastTone = 'info' | 'success' | 'warning' | 'error'`

### Props
- `id: string`
- `tone: ToastTone`
- `message: string`
- `detail?: string`
- `durationMs?: number` (default `4000`)
- `actionLabel?: string`
- `onAction?: () => void`
- `onDismiss: (id: string) => void`

### Behavior contract
- Auto-dismiss unless hovered/focused.
- Warning/error toasts also logged to SysEx monitor event bus.

---

## 7) `SysExMonitor`

### Types
- `type SysExDirection = 'in' | 'out'`
- `type SysExStatus = 'ok' | 'warning' | 'error'`
- `type SysExEvent = {
    id: string;
    timestamp: number;
    direction: SysExDirection;
    status: SysExStatus;
    productId?: '0x07' | '0x10' | 'unknown';
    length: number;
    summary: string;
    bytesHex: string;
  }`

### Props
- `events: SysExEvent[]`
- `isOpen: boolean`
- `onClose: () => void`
- `onClear: () => void`
- `filter?: 'all' | 'in' | 'out' | 'error'`

### Behavior contract
- Most recent event at top.
- Unknown product IDs visually flagged.
- Provides copy-to-clipboard of raw hex bytes.

---

## 8) `FileBrowserList`

### Types
- `type FileEntry = {
    id: string;
    name: string;
    path: string;
    modifiedAt: number;
    sizeBytes: number;
    bank?: string;
    program?: string;
    parseState: 'valid' | 'unsupported' | 'corrupt';
  }`

### Props
- `entries: FileEntry[]`
- `selectedId: string | null`
- `onSelect: (id: string) => void`
- `onImport: () => void`
- `onExport: () => void`
- `onRefresh?: () => void`

### Behavior contract
- Single-select list.
- `parseState !== 'valid'` rows are selectable for inspection but cannot be sent to hardware.
- Supports sort by name and modified date.

---

## 9) `DiagramCanvas`

### Types
- `type DiagramNode = {
    id: string;
    label: string;
    x: number;
    y: number;
    kind: 'input' | 'block' | 'mix' | 'output';
    selected?: boolean;
  }`
- `type DiagramEdge = { id: string; from: string; to: string; style?: 'solid' | 'dashed' }`

### Props
- `nodes: DiagramNode[]`
- `edges: DiagramEdge[]`
- `zoom?: 0.75 | 1 | 1.25`
- `onNodeSelect: (id: string) => void`
- `onBackgroundClick?: () => void`

### Behavior contract
- Deterministic rendering order: edges, then nodes, then overlays.
- Node click selects one node and emits `onNodeSelect`.
- Keyboard fallback list must mirror same selection callback.
