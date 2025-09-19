'use server';

import { identifyImportantQuestions } from '@/ai/flows/important-questions-identifier';
import { summarizeNotes } from '@/ai/flows/notes-summarizer';
import { z } from 'zod';

export type NotesSummarizerState = {
  summary?: string;
  error?: string;
  input?: string;
};

const notesSchema = z.object({
  notes: z.string().min(10, 'Please enter at least 10 characters of notes to summarize.'),
});

export async function summarizeNotesAction(
  prevState: NotesSummarizerState,
  formData: FormData
): Promise<NotesSummarizerState> {
  const validatedFields = notesSchema.safeParse({
    notes: formData.get('notes'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.notes?.join(', '),
      input: formData.get('notes') as string,
    };
  }

  try {
    const result = await summarizeNotes({ notes: validatedFields.data.notes });
    return { summary: result.summary, input: validatedFields.data.notes };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : 'An unknown error occurred.',
      input: validatedFields.data.notes,
    };
  }
}

export type ImportantQuestionsState = {
  questions?: string[];
  error?: string;
  input?: string;
};

const materialSchema = z.object({
  material: z.string().min(10, 'Please enter at least 10 characters of course material.'),
});


export async function identifyImportantQuestionsAction(
  prevState: ImportantQuestionsState,
  formData: FormData
): Promise<ImportantQuestionsState> {
  const validatedFields = materialSchema.safeParse({
    material: formData.get('material'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.material?.join(', '),
      input: formData.get('material') as string,
    };
  }
  
  try {
    const result = await identifyImportantQuestions({ courseMaterial: validatedFields.data.material });
    return { questions: result.importantQuestions, input: validatedFields.data.material };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : 'An unknown error occurred.',
      input: validatedFields.data.material,
    };
  }
}
