'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
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
import { Upload, Image as ImageIcon, Trash2, Camera, X } from 'lucide-react';
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

export default function NotesPage() {
  const [notes, setNotes] = useState<{ file: File; preview: string }[]>([]);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newNotes = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setNotes((prev) => [...prev, ...newNotes]);
    }
  };

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
            const preview = URL.createObjectURL(file);
            setNotes((prev) => [...prev, { file, preview }]);
          }
        }, 'image/png');
      }
    }
  };

  const removeNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };
  
  const openNote = (previewUrl: string) => {
    setSelectedNote(previewUrl);
  };

  const closeNote = () => {
    setSelectedNote(null);
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Your Notes
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Upload or capture images of your notes.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Notes</CardTitle>
            <CardDescription>
              Select image files or use your camera.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col items-center justify-center space-y-4 rounded-md border-2 border-dashed border-border p-8 text-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-12 w-12" />
                    <Label htmlFor="file-upload" className="cursor-pointer font-semibold text-primary hover:underline">
                        Choose files
                    </Label>
                    <p className="text-sm">or drag and drop</p>
                </div>
                <Input id="file-upload" type="file" className="sr-only" multiple accept="image/*" onChange={handleFileChange} />
             </div>
            <Card>
              <CardHeader>
                <CardTitle>Camera Capture</CardTitle>
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
              </CardContent>
              <CardFooter>
                  <Button onClick={handleCapture} disabled={!hasCameraPermission}>
                    <Camera className="mr-2 h-4 w-4" />
                    Capture Image
                </Button>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Notes</CardTitle>
            <CardDescription>
              A preview of your uploaded notes. Click to view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notes.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {notes.map((note, index) => (
                  <div key={index} className="relative group cursor-pointer" onClick={() => openNote(note.preview)}>
                    <Image
                      src={note.preview}
                      alt={`Note preview ${index + 1}`}
                      width={300}
                      height={200}
                      onLoad={() => URL.revokeObjectURL(note.preview)}
                      className="rounded-md object-cover aspect-video"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button variant="destructive" size="icon" onClick={(e) => { e.stopPropagation(); removeNote(index); }}>
                           <Trash2 className="h-4 w-4" />
                           <span className="sr-only">Remove Note</span>
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] border-dashed border-2 rounded-md bg-secondary/50">
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="mx-auto h-12 w-12" />
                  <p>Your uploaded notes will appear here.</p>
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
              <Image src={selectedNote} alt="Selected note" layout="fill" objectFit="contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
