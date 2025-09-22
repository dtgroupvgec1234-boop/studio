'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { bmeNotes } from '@/lib/data';

export default function NotesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          BME Chapter Wise Notes
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A quick reference for key topics in Elements of Mechanical
          Engineering.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Elements of Mechanical Engineering</CardTitle>
          <CardDescription>
            Click on a chapter to open the notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {bmeNotes.map((note, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {note.title}
                </AccordionTrigger>
                <AccordionContent>
                  {note.link ? (
                    <div className="text-center p-4">
                      <Button asChild>
                        <a href={note.link} target="_blank" rel="noopener noreferrer">
                          Open Notes for {note.title}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  ) : (
                    note.content && (
                        <div className="prose prose-blue max-w-none text-muted-foreground">
                            <p>{note.content}</p>
                        </div>
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
