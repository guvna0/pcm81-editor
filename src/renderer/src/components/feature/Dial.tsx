type Props = {
  label: string;
  value: number;
  isPro?: boolean;
  onChange: (value: number) => void;
};

export const Dial = ({ label, value, isPro, onChange }: Props): JSX.Element => (
  <div className={`dial ${isPro ? 'dial--pro' : ''}`}>
    <div className="dial__knob">
      {isPro ? <span className="dial__pro-tag">PRO</span> : null}
      <input type="range" min={0} max={100} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
    <div className="dial__label">{label}</div>
    <div className="dial__value">{value}%</div>
  </div>
);
