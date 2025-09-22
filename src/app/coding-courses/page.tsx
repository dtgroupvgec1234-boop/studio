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
import { Video, NotebookText, ExternalLink } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-md"
                        src="https://www.youtube.com/embed/ERCMXc8x7mc"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bme">
                  <AccordionTrigger className="text-lg font-semibold">
                    BME
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-md"
                        src="https://www.youtube.com/embed/videoseries?list=PLjk-OqI4WmPLGKI0DtkB7BlIUavGziStI"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
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
                    <div className="text-center p-4">
                      <Button asChild>
                        <a href="https://drive.google.com/drive/folders/1bj5Ik5x9emcP7efqMH_x1btIRnUl7SLT" target="_blank" rel="noopener noreferrer">
                          Open Python Notes
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bme-notes">
                  <AccordionTrigger className="text-lg font-semibold">
                    BME Notes
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">
                        BME notes will be available soon.
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
