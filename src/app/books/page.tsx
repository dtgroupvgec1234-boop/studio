
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { resources, type Resource } from '@/lib/data';
import { Book, Globe, Upload, File, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const initialBooks = resources.filter((r) => r.category === 'Textbook');

function getCategoryIcon(category: Resource['category']) {
  switch (category) {
    case 'Textbook':
      return <Book className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Globe className="h-5 w-5 text-muted-foreground" />;
  }
}

export default function BooksPage() {
  const [books, setBooks] = useState<Resource[]>(initialBooks);
  const [newBook, setNewBook] = useState({ title: '', description: '', subject: '' });
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBook(prev => ({...prev, [name]: value}));
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBook.title && newBook.description && newBook.subject) {
      const bookToAdd: Resource = {
        id: `new-${books.length + 1}`,
        title: newBook.title,
        description: newBook.description,
        subject: newBook.subject,
        category: 'Textbook',
        link: pdfFile ? URL.createObjectURL(pdfFile) : '#',
      };
      setBooks(prev => [bookToAdd, ...prev]);
      setNewBook({ title: '', description: '', subject: '' }); // Reset form
      setPdfFile(null);
    }
  }

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
                <form onSubmit={handleAddBook}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Higher Engineering Mathematics" value={newBook.title} onChange={handleInputChange} required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" placeholder="e.g., Mathematics" value={newBook.subject} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" placeholder="A short summary of the book" value={newBook.description} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pdf-upload">Upload PDF (optional)</Label>
                            <div className="flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-border p-4 text-center">
                                <File className="h-8 w-8 text-muted-foreground" />
                                <Label htmlFor="pdf-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                                    {pdfFile ? pdfFile.name : 'Choose a PDF file'}
                                </Label>
                                <Input id="pdf-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <Upload className="mr-2 h-4 w-4"/>
                            Add Book
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>

        <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {books.map((resource) => (
                <Card
                    key={resource.id}
                    className="h-full flex flex-col hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                >
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
                            <CardTitle className="font-headline text-xl leading-snug hover:underline">
                                {resource.title}
                            </CardTitle>
                        </a>
                         {resource.link !== '#' && <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />}
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
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
