

'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resources, type Resource } from "@/lib/data";
import { ArrowUpRight, Book, Globe, Video, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const cardContent = (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-105">
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
          {resource.link && <ArrowUpRight className="h-5 w-5 text-muted-foreground shrink-0" />}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <CardDescription>{resource.description}</CardDescription>
        <div className="mt-4 flex justify-between items-end">
          <Badge variant="secondary">{resource.subject}</Badge>
          {resource.chapters && (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Chapters <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {resource.chapters.map((chapter) => (
                  <DropdownMenuItem key={chapter.title} asChild>
                    <a href={chapter.link} target="_blank" rel="noopener noreferrer">{chapter.title}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (resource.link) {
    return (
      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  return <div className="h-full">{cardContent}</div>;
}


export default function ResourcesPage() {
  const videoResources = resources.filter(resource => resource.category !== 'Textbook');
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videoResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

    
