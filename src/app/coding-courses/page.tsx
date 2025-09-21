import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code2 } from 'lucide-react';

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

      <div className="flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader className="items-center text-center">
            <Code2 className="size-16 text-primary" />
            <CardTitle className="mt-4 text-2xl">Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription>
              We are working hard to bring you a curated list of the best coding
              courses. Stay tuned!
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
