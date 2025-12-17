'use server';

/**
 * @fileOverview A monument and state search flow that allows users to refine their search conversationally using an LLM-based tool.
 *
 * - monumentSearchRefinement - A function that handles the monument and state search with refinement.
 * - MonumentSearchRefinementInput - The input type for the monumentSearchRefinement function.
 * - MonumentSearchRefinementOutput - The return type for the monumentSearchRefinement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MonumentSearchRefinementInputSchema = z.object({
  initialQuery: z.string().describe('The initial search query for monuments or states.'),
  userMessage: z.string().optional().describe('The user message to refine the search.'),
  searchFilters: z.string().optional().describe('Current search filters based on conversation history'),
});
export type MonumentSearchRefinementInput = z.infer<typeof MonumentSearchRefinementInputSchema>;

const MonumentSearchRefinementOutputSchema = z.object({
  refinedQuery: z.string().describe('The refined search query based on the conversation.'),
  searchResults: z.string().describe('The search results based on the refined query.'),
  searchFilters: z.string().describe('Updated search filters based on the conversation history'),
});
export type MonumentSearchRefinementOutput = z.infer<typeof MonumentSearchRefinementOutputSchema>;

export async function monumentSearchRefinement(input: MonumentSearchRefinementInput): Promise<MonumentSearchRefinementOutput> {
  return monumentSearchRefinementFlow(input);
}

const refineSearchQuery = ai.defineTool({
  name: 'refineSearchQuery',
  description: 'Refines the monument or state search query based on the user message and conversation history.',
  inputSchema: z.object({
    initialQuery: z.string().describe('The initial search query.'),
    userMessage: z.string().describe('The user message to refine the search.'),
    searchFilters: z.string().optional().describe('Current search filters based on conversation history'),
  }),
  outputSchema: z.object({
    refinedQuery: z.string().describe('The refined search query.'),
    updatedSearchFilters: z.string().describe('Updated search filters based on the conversation history'),
  }),
  async (input) => {
    // TODO: Implement the logic to refine the search query based on the user message and conversation history.
    // This is a placeholder implementation.
    return {
      refinedQuery: `Refined: ${input.initialQuery} - ${input.userMessage}`,
      updatedSearchFilters: `Updated Filters: ${input.searchFilters || ''} + ${input.userMessage}`,
    };
  },
});

const monumentSearchRefinementPrompt = ai.definePrompt({
  name: 'monumentSearchRefinementPrompt',
  tools: [refineSearchQuery],
  input: {schema: MonumentSearchRefinementInputSchema},
  output: {schema: MonumentSearchRefinementOutputSchema},
  prompt: `You are a helpful assistant that refines monument and state search queries based on user input.

  The user will provide an initial query and may provide messages to refine the search.
  Use the refineSearchQuery tool to refine the search query based on the user message and conversation history.

  Initial Query: {{{initialQuery}}}
  User Message: {{{userMessage}}}
  Search Filters: {{{searchFilters}}}

  Return the refined query and search results.
  The search results are mocked and do not perform an external search.
`,
});

const monumentSearchRefinementFlow = ai.defineFlow(
  {
    name: 'monumentSearchRefinementFlow',
    inputSchema: MonumentSearchRefinementInputSchema,
    outputSchema: MonumentSearchRefinementOutputSchema,
  },
  async input => {
    const {output} = await monumentSearchRefinementPrompt(input);
    // Mock search results based on refined query.
    const searchResults = `Search results for: ${output?.refinedQuery || input.initialQuery}`;

    return {
      refinedQuery: output?.refinedQuery || input.initialQuery,
      searchResults: searchResults,
      searchFilters: output?.searchFilters || '',
    };
  }
);
