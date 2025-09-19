'use server';

/**
 * @fileOverview Identifies important questions for a given course material.
 *
 * - identifyImportantQuestions - A function that takes course material as input and returns a list of important questions.
 * - ImportantQuestionsIdentifierInput - The input type for the identifyImportantQuestions function.
 * - ImportantQuestionsIdentifierOutput - The return type for the identifyImportantQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImportantQuestionsIdentifierInputSchema = z.object({
  courseMaterial: z
    .string()
    .describe('The course material to analyze, such as lecture notes or textbook chapters.'),
});
export type ImportantQuestionsIdentifierInput = z.infer<
  typeof ImportantQuestionsIdentifierInputSchema
>;

const ImportantQuestionsIdentifierOutputSchema = z.object({
  importantQuestions: z
    .array(z.string())
    .describe('A list of the most important questions for the course material.'),
});
export type ImportantQuestionsIdentifierOutput = z.infer<
  typeof ImportantQuestionsIdentifierOutputSchema
>;

export async function identifyImportantQuestions(
  input: ImportantQuestionsIdentifierInput
): Promise<ImportantQuestionsIdentifierOutput> {
  return importantQuestionsIdentifierFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importantQuestionsIdentifierPrompt',
  input: {schema: ImportantQuestionsIdentifierInputSchema},
  output: {schema: ImportantQuestionsIdentifierOutputSchema},
  prompt: `You are an AI assistant helping students identify the most important questions for their courses.

  Based on the provided course material, identify the questions that are most likely to appear on exams or are crucial for understanding the core concepts.
  Return a list of these questions.

  Course Material:
  {{courseMaterial}}`,
});

const importantQuestionsIdentifierFlow = ai.defineFlow(
  {
    name: 'importantQuestionsIdentifierFlow',
    inputSchema: ImportantQuestionsIdentifierInputSchema,
    outputSchema: ImportantQuestionsIdentifierOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
