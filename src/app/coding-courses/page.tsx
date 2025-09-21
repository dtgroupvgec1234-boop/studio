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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="python">
                  <AccordionTrigger className="text-lg font-semibold">
                    Python
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-center text-muted-foreground p-4">
                      <p>
                        Python video courses are coming soon. Stay tuned!
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="python-notes">
                  <AccordionTrigger className="text-lg font-semibold">
                    Python
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-center text-muted-foreground p-4">
                      <p>
                        Python notes are coming soon. Stay tuned!
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
