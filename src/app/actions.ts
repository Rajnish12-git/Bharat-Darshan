'use server';

import {
  searchFlow,
  type SearchFlowInput,
  type SearchFlowOutput,
} from '@/ai/flows/search-flow';

export async function search(
  input: SearchFlowInput
): Promise<SearchFlowOutput> {
  try {
    const response = await searchFlow(input);
    return response;
  } catch (error) {
    console.error('Error in AI search flow:', error);
    return {
      monuments: [],
      states: [],
    };
  }
}
