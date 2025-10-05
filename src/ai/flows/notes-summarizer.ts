
'use server';

/**
 * @fileOverview A notes summarization AI agent.
 *
 * - summarizeNotes - A function that handles the notes summarization process.
 * - SummarizeNotesInput - The input type for the summarizeNotes function.
 * - SummarizeNotesOutput - The return type for the summarizeNotes function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const SummarizeNotesInputSchema = z.object({
  notes: z
    .string()
    .describe(
      "The text of the notes to be summarized."
    ).optional(),
  photoDataUri: z
    .string()
    .describe(
        "A photo of the notes, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ).optional(),
});
export type SummarizeNotesInput = z.infer<typeof SummarizeNotesInputSchema>;

export const SummarizeNotesOutputSchema = z.string().describe('The concise topic summary of the notes.');
export type SummarizeNotesOutput = z.infer<typeof SummarizeNotesOutputSchema>;


export async function summarizeNotes(input: SummarizeNotesInput): Promise<SummarizeNotesOutput> {
  return summarizeNotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNotesPrompt',
  input: {schema: SummarizeNotesInputSchema},
  output: {
    format: 'text',
  },
  model: googleAI('gemini-1.5-flash-latest'),
  prompt: `You are an expert summarizer, able to create concise topic summaries of provided text or text from an image.

  Please provide a concise topic summary of the notes provided. Return only the summary text, and nothing else.
  {{#if notes}}
  The notes are provided as text.
  Notes:
  {{notes}}
  {{/if}}

  {{#if photoDataUri}}
  The notes are provided as an image. Extract the text from the image and summarize it.
  Photo: {{media url=photoDataUri}}
  {{/if}}
  `,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
       {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
       {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const summarizeNotesFlow = ai.defineFlow(
  {
    name: 'summarizeNotesFlow',
    inputSchema: SummarizeNotesInputSchema,
    outputSchema: SummarizeNotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('No output from AI model');
    }
    return output;
  }
);
