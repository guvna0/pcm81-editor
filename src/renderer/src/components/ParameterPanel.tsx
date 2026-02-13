import { Dial } from './Dial';
import { Parameter } from '../state/placeholderPreset';

type Props = {
  parameters: Parameter[];
  onChange: (id: string, value: number) => void;
};

export const ParameterPanel = ({ parameters, onChange }: Props): JSX.Element => (
  <section className="panel">
    <div className="panel__title-row">
      <h2>Control Panel</h2>
      <span>Shift = fine adjust · Double-click = numeric entry</span>
    </div>
    <div className="dial-grid">
      {parameters.map((parameter) => (
        <Dial key={parameter.id} {...parameter} onChange={(value) => onChange(parameter.id, value)} />
      ))}
    </div>
  </section>
);
