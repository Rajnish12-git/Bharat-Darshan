import { z } from 'genkit';

export const SearchFlowInputSchema = z.object({
  query: z.string().describe('The search query for monuments or states.'),
});
export type SearchFlowInput = z.infer<typeof SearchFlowInputSchema>;

export const SearchFlowOutputSchema = z.object({
  states: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
      description: z.string(),
      imageId: z.string(),
    })
  ),
  monuments: z.array(
    z.object({
      name: z.string(),
      imageId: z.string(),
      description: z.string(),
      location: z.string().optional(),
    })
  ),
});
export type SearchFlowOutput = z.infer<typeof SearchFlowOutputSchema>;
