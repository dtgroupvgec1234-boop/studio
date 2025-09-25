
'use client';

import { useEffect, useActionState, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { summarizeNotesAction, type NotesSummarizerState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Loader2, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const initialState: NotesSummarizerState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Summarize Notes
        </>
      )}
    </Button>
  );
}

export default function NotesSummarizerPage() {
  const [state, formAction] = useActionState(summarizeNotesAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.summary) {
        formRef.current?.reset();
    }
    if (state.noteSaved) {
      toast({
        title: 'Note Saved!',
        description: 'Your note image has been saved to the "Your Notes" page.',
      });
    }
  }, [state.summary, state.noteSaved]);
  

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Notes Summarizer
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Enter your notes text below to get a concise AI-generated summary.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form action={formAction} ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Notes</CardTitle>
              <CardDescription>
                When you enter your notes, they will be sent to Gemini to generate a summary in the AI Summary section.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                name="notesText"
                placeholder="Paste your notes here..."
                className="h-48"
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
            <CardTitle>AI Summary</CardTitle>
            <CardDescription>
              The key points from your notes will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state.summary ? (
              <Alert>
                 <FileText className="h-4 w-4" />
                <AlertTitle className="font-headline">Summary</AlertTitle>
                <AlertDescription className="whitespace-pre-wrap text-base leading-relaxed">
                  {state.summary}
                </AlertDescription>
              </Alert>
            ) : (
              <div className="flex items-center justify-center h-[300px] border-dashed border-2 rounded-md bg-secondary/50">
                <p className="text-muted-foreground">Waiting for notes to summarize...</p>
              </div>
            )}
            {state.error && !state.summary && (
              <Alert variant="destructive" className="mt-4">
                <FileText className="h-4 w-4" />
                <AlertTitle>Summarization Failed</AlertTitle>
                <AlertDescription>
                  {state.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
