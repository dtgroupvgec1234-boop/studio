import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookText,
  Calendar,
  FileText,
  Lightbulb,
  Link as LinkIcon,
  PencilRuler,
  ChevronRight,
  Notebook,
  ClipboardList,
  BookOpen,
  Code2,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    title: 'Syllabus Overview',
    description: 'Detailed syllabus for all first-year BE courses.',
    href: '/syllabus',
    icon: <BookText className="size-8 text-primary" />,
    imageId: 'syllabus',
  },
  {
    title: 'Practice Quizzes',
    description: 'Test your knowledge with interactive MCQs for each subject.',
    href: '/quizzes',
    icon: <PencilRuler className="size-8 text-primary" />,
    imageId: 'quizzes',
  },
  {
    title: 'VIDEO resources',
    description: 'Links to relevant online study materials and textbooks.',
    href: '/resources',
    icon: <LinkIcon className="size-8 text-primary" />,
    imageId: 'resources',
  },
  {
    title: 'Notes',
    description: 'Upload and manage your notes.',
    href: '/notes',
    icon: <Notebook className="size-8 text-primary" />,
    imageId: 'notes',
  },
  {
    title: 'GTU',
    description: 'Access previous year question papers from GTU.',
    href: '/gtu-papers',
    icon: <ClipboardList className="size-8 text-primary" />,
    imageId: 'gtu-papers',
  },
  {
    title: 'Books',
    description: 'Find recommended textbooks for your courses.',
    href: '/books',
    icon: <BookOpen className="size-8 text-primary" />,
    imageId: 'books',
  },
  {
    title: 'Notes Summarizer',
    description: 'Upload images and pdf',
    href: '/tools/notes-summarizer',
    icon: <FileText className="size-8 text-primary" />,
    imageId: 'summarizer',
  },
  {
    title: 'Important Questions',
    description: 'Identify the most important questions for each course.',
    href: '/tools/important-questions',
    icon: <Lightbulb className="size-8 text-primary" />,
    imageId: 'questions',
  },
  {
    title: 'Timetable Generator',
    description: 'Create a personalized study schedule.',
    href: '/tools/timetable-generator',
    icon: <Calendar className="size-8 text-primary" />,
    imageId: 'timetable',
  },
  {
    title: 'Coding courses',
    description: 'Learn to code with our curated courses.',
    href: '/coding-courses',
    icon: <Code2 className="size-8 text-primary" />,
    imageId: 'coding-courses',
  },
];

export default function Home() {
  const getImage = (id: string) => {
    return PlaceHolderImages.find((img) => img.id === id);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
                  Welcome to StudyFirst
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your all-in-one companion for acing the first year of your
                  engineering degree.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const image = getImage(feature.imageId);
                return (
                  <Card
                    as={Link}
                    href={feature.href}
                    key={feature.title}
                    className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        {feature.icon}
                        <ChevronRight className="size-5 text-muted-foreground" />
                      </div>
                      {image && (
                        <div className="relative aspect-video mt-4 rounded-md overflow-hidden">
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardTitle className="text-xl font-headline">{feature.title}</CardTitle>
                      <CardDescription className="mt-2">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
