export type AlgorithmNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  pro?: boolean;
  parameterId: string;
};

export const mBandReverbTemplate = {
  id: 'mband-reverb',
  name: 'M-Band+Reverb',
  nodes: [
    { id: 'input', label: 'Input', x: 80, y: 220, parameterId: 'inputLevel' },
    { id: 'mband', label: 'M-Band', x: 280, y: 220, parameterId: 'mbandDrive', pro: true },
    { id: 'reverb', label: 'Reverb', x: 520, y: 220, parameterId: 'reverbDecay' },
    { id: 'mix', label: 'Mix', x: 760, y: 220, parameterId: 'wetDry' }
  ] as AlgorithmNode[],
  edges: [
    { id: 'e1', from: 'input', to: 'mband' },
    { id: 'e2', from: 'mband', to: 'reverb' },
    { id: 'e3', from: 'reverb', to: 'mix' }
  ]
};
