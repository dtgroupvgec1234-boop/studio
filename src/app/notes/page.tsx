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

  // Camera state
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cameraFormRef = useRef<HTMLFormElement>(null);

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
      formRef.current?.reset();
      cameraFormRef.current?.reset();
    } else if (addNoteState.error) {
       toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: addNoteState.error,
        });
    }
  }, [addNoteState]);


  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };
    getCameraPermission();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);


  const handleCaptureAndSave = async (formData: FormData) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "capture.png", { type: "image/png" });
        
        const newFormData = new FormData();
        newFormData.append('noteFile', file);
        addNoteFormAction(newFormData);
      }
    }
  };


  const openNote = (previewUrl: string) => setSelectedNote(previewUrl);
  const closeNote = () => setSelectedNote(null);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Your Notes
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Upload or capture images of your notes. Data is saved to your secure cloud storage.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <form action={addNoteFormAction} ref={formRef}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload from Device</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4 rounded-md border-2 border-dashed border-border p-8 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-12 w-12" />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer font-semibold text-primary hover:underline"
                    >
                      Choose file
                    </Label>
                    <p className="text-sm">or drag and drop</p>
                  </div>
                  <Input
                    ref={uploadInputRef}
                    id="file-upload"
                    name="noteFile"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    disabled={isAddNotePending}
                  />
                </div>
              </CardContent>
              <CardFooter>
                 <SubmitButton />
              </CardFooter>
            </Card>
          </form>

          <form action={handleCaptureAndSave} ref={cameraFormRef}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Camera Capture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full aspect-video rounded-md bg-secondary"
                    autoPlay
                    muted
                    playsInline
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  {hasCameraPermission === false && (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/80 rounded-md">
                      <Alert variant="destructive" className="w-auto">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                          Please allow camera access.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton isCamera />
              </CardFooter>
            </Card>
          </form>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Saved Notes</CardTitle>
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
              <div className="grid grid-cols-2 gap-4">
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
