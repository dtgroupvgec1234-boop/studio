
'use server';

import { addBook, uploadFile, addNote as addNoteToDb } from '@/lib/firebase';
import type { BookResource } from '@/lib/data';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import {
  summarizeNotes,
  type SummarizeNotesInput,
} from '@/ai/flows/notes-summarizer';
import {
  identifyImportantQuestions,
  type ImportantQuestionsIdentifierInput,
} from '@/ai/flows/important-questions-identifier';


export type AddBookState = {
    success: boolean;
    error?: string;
};

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  subject: z.string().min(1, 'Subject is required.'),
  description: z.string().min(1, 'Description is required.'),
  pdfFile: z.instanceof(File).optional(),
});


export async function addBookAction(prevState: AddBookState | undefined, formData: FormData): Promise<AddBookState> {
    const validatedFields = bookSchema.safeParse({
        title: formData.get('title'),
        subject: formData.get('subject'),
        description: formData.get('description'),
        pdfFile: formData.get('pdfFile'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: Object.values(validatedFields.error.flatten().fieldErrors).flat().join(', '),
        };
    }

    const { title, subject, description, pdfFile } = validatedFields.data;
    
    try {
        let pdfUrl: string | undefined = undefined;
        if (pdfFile && pdfFile.size > 0) {
            const { downloadUrl } = await uploadFile(pdfFile, 'books');
            pdfUrl = downloadUrl;
        }

        const newBook: Omit<BookResource, 'id'> = {
            title,
            subject,
            description,
            category: 'Textbook',
            link: pdfUrl || '#',
        };

        await addBook(newBook);
        revalidatePath('/books');
        return { success: true };

    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error('Error adding book:', errorMessage);
        return { success: false, error: errorMessage };
    }
}

export type NotesSummarizerState = {
  summary?: string;
  error?: string;
  noteSaved?: boolean;
};

const summarizeNotesSchema = z.object({
  notesText: z.string().optional(),
});
export async function summarizeNotesAction(prevState: NotesSummarizerState, formData: FormData): Promise<NotesSummarizerState> {
  const validatedFields = summarizeNotesSchema.safeParse({
    notesText: formData.get('notesText'),
  });

  if (!validatedFields.success) {
    return {
      error: Object.values(validatedFields.error.flatten().fieldErrors)
        .flat()
        .join(', '),
    };
  }

  try {
    const { notesText } = validatedFields.data;
    
    if (!notesText) {
        return { error: 'Please enter some notes to summarize.' };
    }

    const input: SummarizeNotesInput = { notes: notesText };
    const { summary } = await summarizeNotes(input);
    
    return { summary };
  } catch (e) {
    console.error('Error in summarizeNotesAction:', e);
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred during summarization.';
    return { error: errorMessage };
  }
}

export type ImportantQuestionsState = {
  input?: string;
  questions?: string[];
  error?: string;
};
const identifyImportantQuestionsSchema = z.object({
  material: z.string().min(1, 'Course material cannot be empty.'),
});
export async function identifyImportantQuestionsAction(
  prevState: ImportantQuestionsState,
  formData: FormData
): Promise<ImportantQuestionsState> {
  const validatedFields = identifyImportantQuestionsSchema.safeParse({
    material: formData.get('material'),
  });

  if (!validatedFields.success) {
    return {
      error: Object.values(validatedFields.error.flatten().fieldErrors)
        .flat()
        .join(', '),
      input: formData.get('material') as string,
    };
  }

  try {
    const { material } = validatedFields.data;
    const input: ImportantQuestionsIdentifierInput = { courseMaterial: material };
    const { importantQuestions } = await identifyImportantQuestions(input);
    return { questions: importantQuestions, input: material };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: errorMessage, input: formData.get('material') as string };
  }
}

export type AddNoteState = {
  success: boolean;
  error?: string;
};

const noteSchema = z.object({
  noteFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Image is required.' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Only image files are allowed.',
    }),
});

export async function addNoteAction(
  prevState: AddNoteState,
  formData: FormData
): Promise<AddNoteState> {
  const validatedFields = noteSchema.safeParse({
    noteFile: formData.get('noteFile'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: Object.values(validatedFields.error.flatten().fieldErrors)
        .flat()
        .join(', '),
    };
  }

  try {
    const { noteFile } = validatedFields.data;
    const { downloadUrl } = await uploadFile(noteFile, 'notes');
    await addNoteToDb({ imageUrl: downloadUrl, createdAt: new Date() });
    revalidatePath('/notes');
    return { success: true };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
