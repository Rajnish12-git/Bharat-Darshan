
'use server';
/**
 * @fileOverview A trip cost estimation AI agent.
 *
 * - estimateTrip - A function that handles the trip cost estimation.
 * - CostEstimatorInput - The input type for the estimateTrip function.
 * - CostEstimatorOutput - The return type for the estimateTrip function.
 */

import { ai } from '@/ai/genkit';
import {
  CostEstimatorInputSchema,
  CostEstimatorOutputSchema,
  type CostEstimatorInput,
  type CostEstimatorOutput,
} from './cost-estimator-flow-types';

const costEstimatorPrompt = ai.definePrompt({
  name: 'costEstimatorPrompt',
  input: { schema: CostEstimatorInputSchema },
  output: { schema: CostEstimatorOutputSchema },
  prompt: `You are an expert travel agent in India. Your task is to provide a budget-friendly cost estimation for a solo traveler.

Calculate the estimated costs for a trip from the origin city of {{{origin}}} to the destination of {{{destination}}}.

Provide the costs in Indian Rupees (INR).

Your estimation should be for a 2-day trip and include:
1.  **Travel**: The estimated round-trip cost for the most economical mode of transport (train or bus).
2.  **Lodging**: The estimated cost for a one-night stay in a clean, budget-friendly hotel or guesthouse near the destination.
3.  **Food**: The estimated cost for daily meals (breakfast, lunch, dinner) from local, affordable restaurants.
4.  **Total**: Calculate the total estimated cost using the formula: Travel + (2 * Lodging) + (2 * Food).

Return the final estimations in the specified JSON format.
`,
});

const costEstimatorFlow = ai.defineFlow(
  {
    name: 'costEstimatorFlow',
    inputSchema: CostEstimatorInputSchema,
    outputSchema: CostEstimatorOutputSchema,
  },
  async (input) => {
    const { output } = await costEstimatorPrompt(input);
    if (!output) {
        throw new Error('AI failed to generate a cost estimate.');
    }
    return output;
  }
);

export async function estimateTrip(
  input: CostEstimatorInput
): Promise<CostEstimatorOutput> {
  return await costEstimatorFlow(input);
}
