import type { PatchData } from '../../../shared/ipc';

export const mockPatch: PatchData = {
  id: 'mock-1',
  name: 'M-Band Hall',
  bank: 'program',
  program: 12,
  algorithm: 'M-Band+Reverb',
  parameters: {
    inputLevel: 50,
    mbandDrive: 36,
    reverbDecay: 72,
    wetDry: 48
  }
};
