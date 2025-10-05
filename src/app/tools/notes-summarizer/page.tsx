
'use client';

import { useEffect, useActionState, useRef, useState } from 'react';
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
import { FileText, Loader2, Sparkles, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const initialState: NotesSummarizerState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Summarize
        </>
      )}
    </Button>
  );
}

export default function NotesSummarizerPage() {
  const [state, formAction] = useActionState(summarizeNotesAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.summary) {
        formRef.current?.reset();
        setFileName(null);
    }
    if (state.noteSaved) {
      toast({
        title: 'Note Saved!',
        description: 'Your note image has been saved to the "Your Notes" page.',
      });
    }
  }, [state.summary, state.noteSaved]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };
  

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Notes Summarizer
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Paste your notes text below or upload a file to get a concise AI-generated summary.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form action={formAction} ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Notes or Upload a File</CardTitle>
              <CardDescription>
                When you enter text or upload a file, it will be sent to Gemini to generate a topic summary.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                name="notesText"
                placeholder="Paste your notes here..."
                className="h-48"
              />
              <div className="text-center my-2 text-muted-foreground">OR</div>
              <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload a File</Label>
                  <div className="flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-border p-4 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <Label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                          {fileName || 'Choose a file'}
                      </Label>
                      <Input ref={fileInputRef} id="file-upload" name="noteFile" type="file" className="sr-only" onChange={handleFileChange} />
                  </div>
              </div>
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
            <CardTitle>AI Topic Summary</CardTitle>
            <CardDescription>
              The key topics from your notes will appear here.
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
