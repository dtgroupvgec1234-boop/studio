'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Upload, Image as ImageIcon, Camera, X, Loader2, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { addNoteAction } from '@/app/actions';
import { getNotes, type Note } from '@/lib/firebase';
import { useFormStatus } from 'react-dom';

function SubmitButton({ isCamera }: { isCamera?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isCamera ? 'Saving...' : 'Uploading...'}
        </>
      ) : isCamera ? (
        <>
          <Camera className="mr-2 h-4 w-4" />
          Capture and Save
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Upload and Save
        </>
      )}
    </Button>
  );
}


export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  
  const [addNoteState, addNoteFormAction, isAddNotePending] = useActionState(addNoteAction, { success: false });

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to load notes',
        description: 'There was a problem fetching your notes from the server.',
      });
      console.error('Failed to load notes from Firestore', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  
  useEffect(() => {
    if (addNoteState.success) {
      toast({ title: 'Note uploaded!' });
      fetchNotes();
    } else if (addNoteState.error) {
       toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: addNoteState.error,
        });
    }
  }, [addNoteState]);


  const openNote = (previewUrl: string) => setSelectedNote(previewUrl);
  const closeNote = () => setSelectedNote(null);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Your Notes
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A gallery of your saved notes.
        </p>
      </header>
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>NOTES</CardTitle>
                <CardDescription>
                  A preview of your saved notes. Click to view.
                </CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={fetchNotes} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
               <div className="flex items-center justify-center h-[300px]">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
               </div>
            ) : notes.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {notes.map((note, index) => (
                  <div key={note.id} className="relative group">
                    <div
                      className="cursor-pointer"
                      onClick={() => openNote(note.imageUrl)}
                    >
                      <Image
                        src={note.imageUrl}
                        alt={`Note preview ${index + 1}`}
                        width={300}
                        height={200}
                        className="rounded-md object-cover aspect-video"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] border-dashed border-2 rounded-md bg-secondary/50">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12" />
                  <p>Your saved notes will appear here.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedNote} onOpenChange={(isOpen) => !isOpen && closeNote()}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Note Preview</DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogHeader>
          {selectedNote && (
            <div className="relative w-full h-full">
              <Image
                src={selectedNote}
                alt="Selected note"
                fill
                objectFit="contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
