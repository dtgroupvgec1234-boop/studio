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
import { Book, Globe, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addBookAction } from '@/app/actions';
import { toast } from '@/hooks/use-toast';
import { getBooks } from '@/lib/firebase';
import { AddBookForm } from './add-book-form';
import Link from 'next/link';

function getCategoryIcon(category: BookResource['category']) {
  switch (category) {
    case 'Textbook':
      return <Book className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Globe className="h-5 w-5 text-muted-foreground" />;
  }
}

const BookCard = ({ resource }: { resource: BookResource }) => {
  const content = (
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
  );

  if (resource.link && resource.link !== '#') {
    return (
      <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export default async function BooksPage() {
  const books = await getBooks();

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
            <AddBookForm />
        </div>

        <div className="lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                {books.map((resource) => (
                  <BookCard key={resource.id} resource={resource} />
                ))}
                 {books.length === 0 && (
                    <div className="col-span-2 flex items-center justify-center h-full text-muted-foreground">
                        No books have been added yet.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
