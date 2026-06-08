"use server";

import { ai } from "@/ai/genkit";
import { indianStates } from "@/lib/states-data";
import architecturalMarvels from "@/lib/architectural-marvels.json";
import {
  SearchFlowInputSchema,
  SearchFlowOutputSchema,
} from "./search-flow-types";

function searchStates(query) {
  const lowerCaseQuery = query.toLowerCase();
  return indianStates
    .filter(
      (state) =>
        state.name.toLowerCase().includes(lowerCaseQuery) ||
        state.description.toLowerCase().includes(lowerCaseQuery),
    )
    .map(({ slug, name, description, imageId }) => ({
      slug,
      name,
      description,
      imageId,
    }));
}

function searchMonuments(query) {
  const lowerCaseQuery = query.toLowerCase();
  const allMonuments = architecturalMarvels;
  return allMonuments
    .filter(
      (marvel) =>
        marvel.name.toLowerCase().includes(lowerCaseQuery) ||
        marvel.description.toLowerCase().includes(lowerCaseQuery) ||
        marvel.location.toLowerCase().includes(lowerCaseQuery),
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
    name: "searchFlow",
    inputSchema: SearchFlowInputSchema,
    outputSchema: SearchFlowOutputSchema,
  },
  async ({ query }) => {
    const states = searchStates(query);
    const monuments = searchMonuments(query);

    return {
      states: states,
      monuments: monuments,
    };
  },
);

export async function searchHeritage(input) {
  return searchFlow(input);
}
