import { z } from 'zod';

export const algorithmCategorySchema = z.enum(['4-voice', '6-voice', 'Pitch', 'Dual FX']);

export const algorithmSchema = z.object({
  id: z.string().min(1),
  canonicalName: z.string().min(1),
  displayName: z.string().min(1),
  category: algorithmCategorySchema,
  provenance: z.object({
    sourceRef: z
      .object({
        documentName: z.string().min(1),
        section: z.string().min(1)
      })
      .optional(),
    deviceProbed: z
      .object({
        method: z.string().min(1),
        capturedSysexFiles: z.array(z.string().min(1)).min(1),
        diffEvidence: z.string().min(1)
      })
      .optional()
  }),
  topologyVerified: z.boolean(),
  blocks: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1)
    })
  )
});

export const catalogueSchema = z.object({
  generatedAt: z.string().min(1),
  algorithms: z.array(algorithmSchema).min(1)
});

export type AlgorithmDefinition = z.infer<typeof algorithmSchema>;
export type Catalogue = z.infer<typeof catalogueSchema>;
