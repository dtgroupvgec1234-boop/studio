'use server';

import { addBook, uploadFile } from '@/lib/firebase';
import type { BookResource } from '@/lib/data';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';


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
