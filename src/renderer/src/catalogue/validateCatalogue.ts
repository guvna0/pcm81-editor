import { pcm81Catalogue, requiredAlgorithmNames } from './pcm81Catalogue';
import { catalogueSchema } from './schema';

export const validateCatalogue = (): void => {
  catalogueSchema.parse(pcm81Catalogue);

  const algorithmNameSet = new Set(pcm81Catalogue.algorithms.map((algorithm) => algorithm.canonicalName));
  const missing = requiredAlgorithmNames.filter((name) => !algorithmNameSet.has(name));

  if (missing.length > 0) {
    throw new Error(`PCM81 algorithm catalogue is missing required entries: ${missing.join(', ')}`);
  }
};
