'use client';

import { useEffect, useState, useActionState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { File as FileIcon, Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addBookAction } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { toast } from '@/hooks/use-toast';

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

export function AddBookForm() {
  const [formState, formAction, isFormPending] = useActionState(addBookAction, { success: false, error: undefined });
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (formState.success) {
      toast({
        title: 'Book added!',
        description: 'Your new book has been added to the list.',
      });
      formRef.current?.reset();
      setPdfFileName(null);
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
    <Card>
        <CardHeader>
            <CardTitle>Add a New Book</CardTitle>
            <CardDescription>
                Fill out the form to add a book to the list.
            </CardDescription>
        </CardHeader>
        <form ref={formRef} action={(formData) => {
            formAction(formData);
        }}>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Higher Engineering Mathematics" required disabled={isFormPending}/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="e.g., Mathematics" required disabled={isFormPending}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" placeholder="A short summary of the book" required disabled={isFormPending}/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pdf-upload">Upload PDF (optional)</Label>
                    <div className="flex items-center justify-center space-x-2 rounded-md border-2 border-dashed border-border p-4 text-center">
                        <FileIcon className="h-8 w-8 text-muted-foreground" />
                        <Label htmlFor="pdf-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                            {pdfFileName || 'Choose a PDF file'}
                        </Label>
                        <Input ref={fileInputRef} id="pdf-upload" name="pdfFile" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} disabled={isFormPending}/>
                    </div>
                </div>
                 {formState.error && (
                  <p className="text-sm font-medium text-destructive">{formState.error}</p>
                )}
            </CardContent>
            <CardFooter>
               <SubmitButton />
            </CardFooter>
        </form>
    </Card>
  )
}
