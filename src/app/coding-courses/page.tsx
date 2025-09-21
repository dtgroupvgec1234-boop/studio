import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Video, NotebookText } from 'lucide-react';

export default function CodingCoursesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Coding Courses
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your journey to becoming a coding expert starts here.
        </p>
      </header>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">
            <Video className="mr-2 h-4 w-4" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="notes">
            <NotebookText className="mr-2 h-4 w-4" />
            Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video Courses</CardTitle>
              <CardDescription>
                Curated video playlists to master coding concepts.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center text-muted-foreground">
                <Video className="mx-auto h-12 w-12" />
                <p className="mt-4">
                  We are working hard to bring you the best video resources.
                  Stay tuned!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Coding Notes</CardTitle>
              <CardDescription>
                Concise notes and cheat sheets for quick reference.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-8">
              <div className="text-center text-muted-foreground">
                <NotebookText className="mx-auto h-12 w-12" />
                <p className="mt-4">
                  Well-organized coding notes are coming soon to help you study.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
