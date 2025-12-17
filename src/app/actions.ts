"use server";

import {
  monumentSearchRefinement,
  type MonumentSearchRefinementInput,
  type MonumentSearchRefinementOutput
} from "@/ai/flows/monument-search-refinement";

export async function refineSearch(
  input: MonumentSearchRefinementInput
): Promise<MonumentSearchRefinementOutput> {
  try {
    const response = await monumentSearchRefinement(input);
    return response;
  } catch (error) {
    console.error("Error in AI refinement flow:", error);
    return {
        refinedQuery: "Sorry, I encountered an error.",
        searchResults: "Could not fetch results due to an internal error.",
        searchFilters: input.searchFilters || "",
    };
  }
}
