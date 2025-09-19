'use client';

import { useFormState, useFormStatus } from 'react-dom';
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

export default function ImportantQuestionsPage() {
  const [state, formAction] = useFormState(identifyImportantQuestionsAction, initialState);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Important Questions Identifier
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Let AI find the most crucial questions from your course material.
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
            <CardTitle>Important Questions</CardTitle>
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
    </div>
  );
}
