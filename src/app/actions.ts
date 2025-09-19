'use server';

import { identifyImportantQuestions } from '@/ai/flows/important-questions-identifier';
import { summarizeNotes } from '@/ai/flows/notes-summarizer';
import { z } from 'zod';

export type NotesSummarizerState = {
  summary?: string;
  error?: string;
  input?: string | File;
};

const notesSchema = z.object({
  notesImage: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Please upload an image.' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Only image files are accepted.',
    }),
});

function toDataURI(buffer: ArrayBuffer, type: string) {
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  let binary = '';
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${type};base64,${btoa(binary)}`;
}


export async function summarizeNotesAction(
  prevState: NotesSummarizerState,
  formData: FormData
): Promise<NotesSummarizerState> {
  const validatedFields = notesSchema.safeParse({
    notesImage: formData.get('notesImage'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.notesImage?.join(', '),
      input: formData.get('notesImage') as File,
    };
  }
  
  const imageFile = validatedFields.data.notesImage;

  try {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageDataUri = toDataURI(imageBuffer, imageFile.type);

    const result = await summarizeNotes({ notes: imageDataUri });
    return { summary: result.summary, input: validatedFields.data.notesImage };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : 'An unknown error occurred.',
      input: validatedFields.data.notesImage,
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
