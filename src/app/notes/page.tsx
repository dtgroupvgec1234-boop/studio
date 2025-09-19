'use client';

import { useState, useRef, useEffect, ChangeEvent, useActionState } from 'react';
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
import { Upload, Image as ImageIcon, Camera, X, Loader2 } from 'lucide-react';
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
import { getNotes, type Note } from '@/lib/firebase';
import { addNoteAction } from '@/app/actions';
import { useFormStatus } from 'react-dom';

function UploadButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="sm">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                </>
            ) : (
                <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                </>
            )}
        </Button>
    )
}

function CaptureButton({ onCapture }: { onCapture: () => void }) {
    const { pending } = useFormStatus();
     return (
        <Button onClick={onCapture} disabled={pending} type="button">
            <Camera className="mr-2 h-4 w-4" />
            Capture Image
        </Button>
    )
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  
  // Camera state
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const captureFormRef = useRef<HTMLFormElement>(null);
  const [capturedImage, setCapturedImage] = useState<File | null>(null);

  // Form states
  const [uploadFormState, uploadFormAction, isUploadPending] = useActionState(addNoteAction, { success: false });
  const [captureFormState, captureFormAction, isCapturePending] = useActionState(addNoteAction, { success: false });

  useEffect(() => {
    async function fetchNotes() {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    if (uploadFormState.success) {
      toast({ title: 'Note uploaded!' });
    } else if (uploadFormState.error) {
      toast({ variant: 'destructive', title: 'Upload failed', description: uploadFormState.error });
    }
  }, [uploadFormState]);

  useEffect(() => {
    if (captureFormState.success) {
      toast({ title: 'Note captured and uploaded!' });
      setCapturedImage(null);
    } else if (captureFormState.error) {
      toast({ variant: 'destructive', title: 'Capture failed', description: captureFormState.error });
    }
  }, [captureFormState]);

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
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.png`, { type: 'image/png' });
            setCapturedImage(file);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            
            const form = captureFormRef.current;
            if(form) {
                const noteFileInput = form.querySelector('input[name="noteFile"]') as HTMLInputElement;
                if(noteFileInput) {
                    noteFileInput.files = dataTransfer.files;
                    captureFormAction(new FormData(form));
                }
            }
          }
        }, 'image/png');
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
          Upload or capture images of your notes. All notes are saved on the server.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Notes</CardTitle>
            <CardDescription>
              Select image files or use your camera to add new notes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <form action={uploadFormAction}>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Upload from Device</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center space-y-4 rounded-md border-2 border-dashed border-border p-8 text-center">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload className="h-12 w-12" />
                                <Label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                                    Choose files
                                </Label>
                                <p className="text-sm">or drag and drop</p>
                            </div>
                            <Input id="file-upload" name="noteFile" type="file" className="sr-only" accept="image/*" />
                        </div>
                         {uploadFormState.error && (
                            <p className="text-sm font-medium text-destructive mt-2">{uploadFormState.error}</p>
                        )}
                    </CardContent>
                    <CardFooter>
                       <UploadButton />
                    </CardFooter>
                 </Card>
             </form>
            <form action={captureFormAction} ref={captureFormRef}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Camera Capture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                        <video ref={videoRef} className="w-full aspect-video rounded-md bg-secondary" autoPlay muted playsInline />
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
                    <input type="file" name="noteFile" className="hidden" />
                     {captureFormState.error && (
                        <p className="text-sm font-medium text-destructive mt-2">{captureFormState.error}</p>
                    )}
                  </CardContent>
                  <CardFooter>
                      <CaptureButton onCapture={handleCapture} />
                  </CardFooter>
                </Card>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Notes</CardTitle>
            <CardDescription>
              A preview of your saved notes. Click to view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notes.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {notes.map((note, index) => (
                  <div key={note.id} className="relative group">
                    <div className="cursor-pointer" onClick={() => openNote(note.imageUrl)}>
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
                <Button variant="ghost" size="icon" className="absolute right-4 top-4">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
          </DialogHeader>
          {selectedNote && (
            <div className="relative w-full h-full">
              <Image src={selectedNote} alt="Selected note" fill objectFit="contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
