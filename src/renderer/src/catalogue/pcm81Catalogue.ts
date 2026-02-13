import { Catalogue } from './schema';

export const requiredAlgorithmNames = [
  'Chamber',
  'Concert Hall',
  'Infinite',
  'Inverse',
  'Plate',
  'Chorus + Reverb',
  'Glide',
  'Hall',
  'Multiband + Reverb',
  'Res 1 > Plate',
  'Res 2 > Plate',
  'Pitch Correct',
  'Stereo Chamber',
  'Dual Chamber',
  'Dual Inverse',
  'Dual Plate',
  'Quad > Hall',
  'VSO-Chamber'
] as const;

const sourceRef = {
  documentName: 'fx_brochure.pdf',
  section: 'PCM81 Algorithms'
};

export const pcm81Catalogue: Catalogue = {
  generatedAt: '2026-01-10',
  algorithms: requiredAlgorithmNames.map((name, index) => ({
    id: `pcm81-${index + 1}`,
    canonicalName: name,
    displayName: name,
    category: index <= 4 ? '4-voice' : index <= 10 ? '6-voice' : 'Pitch',
    provenance: { sourceRef },
    topologyVerified: index === 0,
    blocks:
      index === 0
        ? [
            { id: 'input', label: 'Input' },
            { id: 'pre-delay', label: 'Pre Delay' },
            { id: 'chamber', label: 'Chamber Reverb Engine' },
            { id: 'mix', label: 'Wet / Dry Mix' },
            { id: 'output', label: 'Output' }
          ]
        : []
  }))
};
