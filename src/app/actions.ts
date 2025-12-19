'use server';

import {
  searchHeritage,
} from '@/ai/flows/search-flow';
import type { SearchFlowInput, SearchFlowOutput } from '@/ai/flows/search-flow-types';


export async function search(
  input: SearchFlowInput
): Promise<SearchFlowOutput> {
  try {
    const response = await searchHeritage(input);
    return response;
  } catch (error) {
    console.error('Error in AI search flow:', error);
    return {
      monuments: [],
      states: [],
    };
  }
}
