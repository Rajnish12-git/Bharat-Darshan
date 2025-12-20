
'use server';
/**
 * @fileOverview A trip cost estimation AI agent.
 *
 * - estimateTrip - A function that handles the trip cost estimation.
 * - CostEstimatorInput - The input type for the estimateTrip function.
 * - CostEstimatorOutput - The return type for the estimateTrip function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const CostEstimatorInputSchema = z.object({
  origin: z.string().describe('The starting city of the user.'),
  destination: z.string().describe('The destination monument or city.'),
});
export type CostEstimatorInput = z.infer<typeof CostEstimatorInputSchema>;

export const CostEstimatorOutputSchema = z.object({
  travel: z
    .number()
    .describe(
      'Estimated round-trip travel cost from origin to destination for one person.'
    ),
  lodging: z
    .number()
    .describe(
      'Estimated cost per night for a budget-friendly hotel near the destination.'
    ),
  food: z
    .number()
    .describe('Estimated cost of food per day for one person.'),
  total: z
    .number()
    .describe(
      'The cumulative total estimated cost for a 2-day trip (Travel + 2*Lodging + 2*Food).'
    ),
  currency: z.string().describe('The currency of the estimated costs (e.g., INR).'),
});
export type CostEstimatorOutput = z.infer<typeof CostEstimatorOutputSchema>;

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
