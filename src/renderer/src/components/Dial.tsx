import { useMemo, useRef, useState, type PointerEvent, type WheelEvent } from 'react';

type Props = {
  label: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  onChange: (next: number) => void;
};

export const Dial = ({ label, min, max, value, unit, onChange }: Props): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [manualValue, setManualValue] = useState(String(value));
  const dragState = useRef<{ startY: number; startValue: number; fine: boolean } | null>(null);

  const ratio = useMemo(() => (value - min) / (max - min), [value, min, max]);
  const rotation = -135 + ratio * 270;

  const clamp = (candidate: number): number => Math.max(min, Math.min(max, candidate));

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    dragState.current = { startY: event.clientY, startValue: value, fine: event.shiftKey };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!dragState.current) return;
    const pixelDelta = dragState.current.startY - event.clientY;
    const dragScale = dragState.current.fine || event.shiftKey ? 800 : 220;
    const nextValue = clamp(dragState.current.startValue + (pixelDelta / dragScale) * (max - min));
    onChange(Number(nextValue.toFixed(2)));
  };

  const onPointerUp = (): void => {
    dragState.current = null;
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const step = event.shiftKey ? (max - min) / 400 : (max - min) / 100;
    const next = value + (event.deltaY < 0 ? step : -step);
    onChange(Number(clamp(next).toFixed(2)));
  };

  if (isEditing) {
    return (
      <div className="dial">
        <label>{label}</label>
        <input
          className="dial__input"
          autoFocus
          value={manualValue}
          onChange={(event) => setManualValue(event.target.value)}
          onBlur={() => {
            const parsed = Number(manualValue);
            if (!Number.isNaN(parsed)) onChange(clamp(parsed));
            setIsEditing(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              const parsed = Number(manualValue);
              if (!Number.isNaN(parsed)) onChange(clamp(parsed));
              setIsEditing(false);
            }
            if (event.key === 'Escape') setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="dial">
      <label>{label}</label>
      <div className="dial__knob" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onWheel={onWheel} onDoubleClick={() => { setManualValue(String(value)); setIsEditing(true); }}>
        <div className="dial__indicator" style={{ transform: `rotate(${rotation}deg)` }} />
      </div>
      <div className="dial__value">{value.toFixed(2)} {unit}</div>
    </div>
  );
};
