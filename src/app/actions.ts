
'use server';

import {
  searchHeritage,
} from '@/ai/flows/search-flow';
import type { SearchFlowInput, SearchFlowOutput } from '@/ai/flows/search-flow-types';
import {
  estimateTrip,
} from '@/ai/flows/cost-estimator-flow';
import type { CostEstimatorInput, CostEstimatorOutput } from '@/ai/flows/cost-estimator-flow-types';


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

export async function getCostEstimate(
  input: CostEstimatorInput
): Promise<CostEstimatorOutput> {
  return await estimateTrip(input);
}


