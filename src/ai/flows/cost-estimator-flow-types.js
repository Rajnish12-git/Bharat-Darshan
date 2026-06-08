import { z } from "zod";

export const CostEstimatorInputSchema = z.object({
  origin: z.string().describe("The starting city of the user."),
  destination: z.string().describe("The destination monument or city."),
});

export const CostEstimatorOutputSchema = z.object({
  travel: z
    .number()
    .describe(
      "Estimated round-trip travel cost from origin to destination for one person.",
    ),
  lodging: z
    .number()
    .describe(
      "Estimated cost per night for a budget-friendly hotel near the destination.",
    ),
  food: z.number().describe("Estimated cost of food per day for one person."),
  total: z
    .number()
    .describe(
      "The cumulative total estimated cost for a 2-day trip (Travel + 2*Lodging + 2*Food).",
    ),
  currency: z
    .string()
    .describe("The currency of the estimated costs (e.g., INR)."),
});
