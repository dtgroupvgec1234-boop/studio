import { quizzes } from "@/lib/data";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PencilRuler, ChevronRight } from "lucide-react";

export default function QuizzesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Practice Quizzes
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Test your knowledge and prepare for exams.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Link href={`/quizzes/${quiz.subjectId}`} key={quiz.subjectId}>
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-xl">
                    {quiz.subjectName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {quiz.questions.length} questions
                  </CardDescription>
                </div>
                <PencilRuler className="h-8 w-8 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm font-medium text-primary">
                  Start Quiz
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
