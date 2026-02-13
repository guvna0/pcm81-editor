export type Parameter = {
  id: string;
  label: string;
  min: number;
  max: number;
  unit: string;
  value: number;
};

export const placeholderParameters: Parameter[] = [
  { id: 'mix', label: 'Mix', min: 0, max: 100, unit: '%', value: 42 },
  { id: 'preDelay', label: 'Pre Delay', min: 0, max: 500, unit: 'ms', value: 120 },
  { id: 'reverbTime', label: 'Reverb Time', min: 0.2, max: 30, unit: 's', value: 7.4 },
  { id: 'diffusion', label: 'Diffusion', min: 0, max: 100, unit: '%', value: 66 },
  { id: 'hfDamping', label: 'HF Damping', min: 0, max: 100, unit: '%', value: 40 }
];
