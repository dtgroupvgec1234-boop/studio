import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

const gtuPapers = {
  title: 'GTU Old Question Papers',
  description: 'A collection of previous year question papers for all first-year subjects.',
  link: 'https://www.gtu.ac.in/result/Paper_Display.aspx',
  category: 'Website',
  subject: 'All Subjects',
};

export default function GtuPapersPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          GTU Old Papers
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Access a comprehensive archive of past question papers.
        </p>
      </header>

      <div className="max-w-2xl mx-auto">
        <a
          href={gtuPapers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform duration-300 hover:-translate-y-1"
        >
          <Card className="h-full flex flex-col hover:shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-headline text-2xl leading-snug">
                    {gtuPapers.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-sm text-muted-foreground">{gtuPapers.category}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-6 w-6 text-muted-foreground shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <CardDescription className="text-base">{gtuPapers.description}</CardDescription>
              <div className="mt-4">
                  <Badge variant="secondary">{gtuPapers.subject}</Badge>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>
    </div>
  );
}
