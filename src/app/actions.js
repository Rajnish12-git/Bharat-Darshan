"use server";

import { searchHeritage } from "@/ai/flows/search-flow";
import { estimateTrip } from "@/ai/flows/cost-estimator-flow";

export async function search(input) {
  try {
    const response = await searchHeritage(input);
    return response;
  } catch (error) {
    console.error("Error in AI search flow:", error);
    return {
      monuments: [],
      states: [],
    };
  }
}

export async function getCostEstimate(input) {
  return await estimateTrip(input);
}
