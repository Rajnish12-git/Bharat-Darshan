'use server';

import { ai } from '@/ai/genkit';
import { indianStates } from '@/lib/states-data';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import type { StateData, DetailItem } from '@/lib/heritage-data';
import {
  SearchFlowInputSchema,
  SearchFlowOutputSchema,
  type SearchFlowInput,
  type SearchFlowOutput,
} from './search-flow-types';

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
  const allMonuments: any[] = architecturalMarvels;
  return allMonuments
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

const searchFlow = ai.defineFlow(
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

export async function searchHeritage(input: SearchFlowInput): Promise<SearchFlowOutput> {
    return searchFlow(input);
}
