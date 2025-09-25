
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
          Upload an image or PDF of your notes to get a concise AI-generated summary. Uploaded images are automatically saved to your notes.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <form action={formAction} ref={formRef}>
          <Card>
            <CardHeader>
              <CardTitle>Upload Notes</CardTitle>
              <CardDescription>
                When you upload a photo, it will be sent to Gemini to generate a summary in the AI Summary section.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4 rounded-md border-2 border-dashed border-border p-8 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-12 w-12" />
                    <Label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                        {fileName || 'Choose file'}
                    </Label>
                    <p className="text-sm">{fileName ? ' ' : 'or drag and drop'}</p>
                </div>
                <Input ref={fileInputRef} id="file-upload" name="notesFile" type="file" className="sr-only" accept="image/*,application/pdf" onChange={handleFileChange} />
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
