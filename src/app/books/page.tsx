'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BookResource } from '@/lib/data';
import { Book, Globe, Upload, File, ArrowUpRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addBookAction } from '@/app/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from '@/hooks/use-toast';
import { getBooks } from '@/lib/firebase';

function getCategoryIcon(category: BookResource['category']) {
  switch (category) {
    case 'Textbook':
      return <Book className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Globe className="h-5 w-5 text-muted-foreground" />;
  }
}

const BookCard = ({ resource }: { resource: BookResource }) => {
  const CardContentWrapper = () => (
    <Card
        className="h-full flex flex-col hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl leading-snug hover:underline">
              {resource.title}
            </CardTitle>
            {resource.link && resource.link !== '#' && <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-2">
            {getCategoryIcon(resource.category)}
            <p className="text-sm text-muted-foreground">
              {resource.category}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <CardDescription className="whitespace-pre-wrap">{resource.description}</CardDescription>
          <div className="mt-4">
            <Badge variant="secondary">{resource.subject}</Badge>
          </div>
        </CardContent>
      </Card>
  )

  if (!resource.link || resource.link === '#') {
    return <CardContentWrapper />;
  }
  
  return (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block h-full">
      <CardContentWrapper />
    </a>
  );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                </>
            ) : (
                <>
                    <Upload className="mr-2 h-4 w-4"/>
                    Add Book
                </>
            )}
        </Button>
    );
}


export default function BooksPage() {
  const [books, setBooks] = useState<BookResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);

  const [formState, formAction] = useFormState(addBookAction, { success: false });

  useEffect(() => {
    async function fetchBooks() {
        setIsLoading(true);
        const fetchedBooks = await getBooks();
        setBooks(fetchedBooks);
        setIsLoading(false);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Book added!',
        description: 'Your new book has been added to the list.',
      });
      // Refetch books to show the newly added one
      getBooks().then(setBooks);
      // Reset form state if needed, though useFormState doesn't auto-reset
    } else if (formState.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: formState.error,
      });
    }
  }, [formState]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFileName(e.target.files[0].name);
    } else {
      setPdfFileName(null);
    }
  };


  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Recommended Books
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Curated list of textbooks to help you succeed. You can also add your own.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Add a New Book</CardTitle>
                    <CardDescription>
                        Fill out the form to add a book to the list.
                    </CardDescription>
                </CardHeader>
                <form action={formAction}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Higher Engineering Mathematics" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Mathematics" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="A short summary of the book" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pdf-upload">Upload PDF (optional)</Label>
                            <div className="flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-border p-4 text-center">
                                <File className="h-8 w-8 text-muted-foreground" />
                                <Label htmlFor="pdf-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                                    {pdfFileName || 'Choose a PDF file'}
                                </Label>
                                <Input id="pdf-upload" name="pdfFile" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                       <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading ? (
             <div className="flex items-center justify-center h-full col-span-2">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {books.map((resource) => (
                  <BookCard key={resource.id} resource={resource} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
