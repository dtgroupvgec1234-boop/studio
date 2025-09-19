'use server';

import { identifyImportantQuestions } from '@/ai/flows/important-questions-identifier';
import { summarizeNotes } from '@/ai/flows/notes-summarizer';
import { addBook, uploadFile, addNote, deleteNote as deleteNoteFromDb, type Note } from '@/lib/firebase';
import type { BookResource } from '@/lib/data';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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


export async function addBookAction(prevState: AddBookState, formData: FormData): Promise<AddBookState> {
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


export type AddNoteState = {
    success: boolean;
    error?: string;
};

const addNoteSchema = z.object({
  noteFile: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: 'Please upload an image.' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Only image files are accepted.',
    }),
});

export async function addNoteAction(prevState: AddNoteState, formData: FormData): Promise<AddNoteState> {
    const validatedFields = addNoteSchema.safeParse({
        noteFile: formData.get('noteFile'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: Object.values(validatedFields.error.flatten().fieldErrors).flat().join(', '),
        };
    }

    try {
        const { noteFile } = validatedFields.data;
        const { downloadUrl, fullPath } = await uploadFile(noteFile, 'notes');
        await addNote(downloadUrl, fullPath);
        revalidatePath('/notes');
        return { success: true };
    } catch(e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error('Error adding note:', errorMessage);
        return { success: false, error: errorMessage };
    }
}

export async function deleteNoteAction(note: Note) {
    try {
        await deleteNoteFromDb(note);
        revalidatePath('/notes');
        return { success: true }
    } catch(e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        console.error('Error deleting note:', errorMessage);
        return { success: false, error: errorMessage };
    }
}