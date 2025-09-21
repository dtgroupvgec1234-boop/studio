'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { identifyImportantQuestionsAction, type ImportantQuestionsState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const initialState: ImportantQuestionsState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Identifying...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Generate Questions
        </>
      )}
    </Button>
  );
}

const fAQs = [
  {
    subject: 'Engineering Mathematics I & II',
    questions: [
      'State and prove Rolle’s Theorem. Verify it for f(x) = x^2 - 4x + 3 in [1, 3].',
      'Define Gamma and Beta functions and state their properties.',
      'Find the Eigenvalues and Eigenvectors of the matrix A = [[2, 1, 1], [1, 2, 1], [0, 0, 1]].',
      'Solve the differential equation: (D² - 5D + 6)y = e^(3x).',
      'State and prove the Cayley-Hamilton theorem and use it to find the inverse of a given matrix.',
    ],
  },
  {
    subject: 'Engineering Physics',
    questions: [
      'Explain the construction and working of a He-Ne Laser with a neat energy level diagram.',
      'What is polarization of light? Explain any one method to produce polarized light.',
      'Derive Schrodinger’s time-independent wave equation.',
      'Explain the concept of wave-particle duality with de-Broglie’s hypothesis.',
      'What are superconductors? Explain Type-I and Type-II superconductors.',
    ],
  },
  {
    subject: 'Problem Solving and Programming',
    questions: [
      'Write a C program to check whether a given number is prime or not.',
      'Explain the difference between call by value and call by reference with a suitable example.',
      'What are pointers? Write a C program to swap two numbers using pointers.',
      'Explain different types of loops available in C with syntax and examples.',
      'Write a program to find the factorial of a number using recursion.',
    ],
  },
  {
    subject: 'Basic Electrical Engineering',
    questions: [
      'State and explain Kirchhoff’s laws (KCL and KVL) with examples.',
      'Derive the expression for the resonance frequency in a series RLC circuit.',
      'Explain the working principle of a single-phase transformer.',
      'State and prove Thevenin’s theorem and Norton’s theorem.',
      'Explain the principle of operation of a DC motor.',
    ],
  },
];

export default function ImportantQuestionsPage() {
  const [state, formAction] = useActionState(identifyImportantQuestionsAction, initialState);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Important Questions Identifier
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Let AI find the most crucial questions from your course material, or browse frequently asked questions.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form action={formAction}>
          <Card>
            <CardHeader>
              <CardTitle>Course Material</CardTitle>
              <CardDescription>
                Paste a section of your course material to identify key questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="material"
                placeholder="Paste course material here..."
                className="min-h-[300px] text-base"
                defaultValue={state.input}
              />
              {state.error && (
                <p className="text-sm font-medium text-destructive mt-2">{state.error}</p>
              )}
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </Card>
        </form>

        <Card>
          <CardHeader>
            <CardTitle>AI Generated Questions</CardTitle>
            <CardDescription>
              Potential exam questions will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.questions && state.questions.length > 0 ? (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle className="font-headline">Key Questions</AlertTitle>
                <AlertDescription>
                  <ul className="list-decimal list-inside space-y-2 mt-2">
                    {state.questions.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="flex items-center justify-center h-[300px] border-dashed border-2 rounded-md bg-secondary/50">
                <p className="text-muted-foreground">Waiting for material to analyze...</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

       <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions (GTU Sem 1 & 2)</CardTitle>
            <CardDescription>
              A collection of important questions often repeated in GTU exams.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {fAQs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {item.subject}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-decimal space-y-3 pl-6">
                      {item.questions.map((question, qIndex) => (
                        <li key={qIndex} className="text-muted-foreground">
                          {question}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
    </div>
  );
}
