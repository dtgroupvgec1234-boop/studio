import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { syllabus, type SyllabusSubject } from "@/lib/data";

export default function SyllabusPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Syllabus Overview
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          A detailed breakdown of subjects for the first year of BE.
        </p>
      </header>
      <div className="space-y-6">
        {syllabus.map((subject: SyllabusSubject) => (
          <Card key={subject.id}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                {subject.name}
              </CardTitle>
              <CardDescription>
                Subject Code: {subject.code} - {subject.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {subject.modules.map((module, index) => (
                  <AccordionItem value={`item-${index}`} key={module.title}>
                    <AccordionTrigger className="font-semibold hover:no-underline">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc space-y-2 pl-6">
                        {module.topics.map((topic) => (
                          <li key={topic} className="text-muted-foreground">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
