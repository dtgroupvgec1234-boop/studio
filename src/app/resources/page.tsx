import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resources, type Resource } from "@/lib/data";
import { ArrowUpRight, Book, Globe, Video } from "lucide-react";

function getCategoryIcon(category: Resource["category"]) {
  switch (category) {
    case "Textbook":
      return <Book className="h-5 w-5 text-muted-foreground" />;
    case "Website":
      return <Globe className="h-5 w-5 text-muted-foreground" />;
    case "Video Playlist":
      return <Video className="h-5 w-5 text-muted-foreground" />;
    default:
      return null;
  }
}

export default function ResourcesPage() {
  const gtuPaperResource = resources.find(r => r.id === '8');
  const otherResources = resources.filter(r => r.id !== '8');

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          VIDEO resources
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Curated list of video resources to help you succeed.
        </p>
      </header>

      {gtuPaperResource && (
        <div className="mb-8">
            <h2 className="text-2xl font-bold font-headline mb-4">Exam Preparation</h2>
             <a
                href={gtuPaperResource.link}
                target="_blank"
                rel="noopener noreferrer"
                key={gtuPaperResource.id}
                className="block transition-transform duration-300 hover:-translate-y-1"
            >
                <Card className="hover:shadow-lg bg-secondary">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="font-headline text-xl leading-snug">
                            {gtuPaperResource.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                            {getCategoryIcon(gtuPaperResource.category)}
                            <p className="text-sm text-muted-foreground">{gtuPaperResource.category}</p>
                            </div>
                        </div>
                        <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{gtuPaperResource.description}</CardDescription>
                         <div className="mt-4">
                            <Badge variant="default">{gtuPaperResource.subject}</Badge>
                        </div>
                    </CardContent>
                </Card>
            </a>
        </div>
      )}


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {otherResources.map((resource) => (
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            key={resource.id}
            className="block transition-transform duration-300 hover:-translate-y-1"
          >
            <Card className="h-full flex flex-col hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-xl leading-snug">
                      {resource.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getCategoryIcon(resource.category)}
                      <p className="text-sm text-muted-foreground">{resource.category}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <CardDescription>{resource.description}</CardDescription>
                <div className="mt-4">
                    <Badge variant="secondary">{resource.subject}</Badge>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
