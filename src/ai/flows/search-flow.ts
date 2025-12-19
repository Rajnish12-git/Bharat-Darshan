'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { indianStates } from '@/lib/states-data';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import type { StateData, DetailItem } from '@/lib/heritage-data';

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

function searchStates(query: string): Partial<StateData>[] {
  const lowerCaseQuery = query.toLowerCase();
  return indianStates
    .filter(
      (state) =>
        state.name.toLowerCase().includes(lowerCaseQuery) ||
        state.description.toLowerCase().includes(lowerCaseQuery)
    )
    .map(({ slug, name, description, imageId }) => ({
      slug,
      name,
      description,
      imageId,
    }));
}

function searchMonuments(query: string): Partial<DetailItem>[] {
  const lowerCaseQuery = query.toLowerCase();
  return architecturalMarvels
    .filter(
      (marvel) =>
        marvel.name.toLowerCase().includes(lowerCaseQuery) ||
        marvel.description.toLowerCase().includes(lowerCaseQuery) ||
        marvel.location.toLowerCase().includes(lowerCaseQuery)
    )
    .map(({ name, imageId, description, location }) => ({
      name,
      imageId,
      description,
      location,
    }));
}

export const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchFlowInputSchema,
    outputSchema: SearchFlowOutputSchema,
  },
  async ({ query }) => {
    const states = searchStates(query);
    const monuments = searchMonuments(query);

    return {
      states: states as StateData[],
      monuments: monuments as DetailItem[],
    };
  }
);
