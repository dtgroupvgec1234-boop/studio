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
            Click on a topic to view the explanation.
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
                  <div className="prose prose-blue max-w-none text-muted-foreground">
                    <p>{note.content}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
