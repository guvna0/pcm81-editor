import { describe, expect, it } from 'vitest';
import { pcm81Catalogue, requiredAlgorithmNames } from '../src/renderer/src/catalogue/pcm81Catalogue';
import { validateCatalogue } from '../src/renderer/src/catalogue/validateCatalogue';

describe('PCM81 algorithm catalogue', () => {
  it('contains the verified minimum algorithm names', () => {
    const names = pcm81Catalogue.algorithms.map((algorithm) => algorithm.canonicalName);
    expect(new Set(names)).toEqual(new Set(requiredAlgorithmNames));
  });

  it('passes schema + required-entry validation', () => {
    expect(() => validateCatalogue()).not.toThrow();
  });

  it('tracks provenance for each algorithm', () => {
    for (const algorithm of pcm81Catalogue.algorithms) {
      expect(algorithm.provenance.sourceRef?.documentName).toBe('fx_brochure.pdf');
      expect(algorithm.provenance.sourceRef?.section).toBe('PCM81 Algorithms');
    }
  });
});
