import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resources, type Resource } from "@/lib/data";
import { Book, Globe } from "lucide-react";

const books = resources.filter(r => r.category === 'Textbook');

function getCategoryIcon(category: Resource["category"]) {
  switch (category) {
    case "Textbook":
      return <Book className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Globe className="h-5 w-5 text-muted-foreground" />;
  }
}

export default function BooksPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Recommended Books
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Curated list of textbooks to help you succeed.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((resource) => (
          <Card key={resource.id} className="h-full flex flex-col hover:shadow-lg transition-transform duration-300 hover:-translate-y-1">
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
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <CardDescription>{resource.description}</CardDescription>
              <div className="mt-4">
                  <Badge variant="secondary">{resource.subject}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
