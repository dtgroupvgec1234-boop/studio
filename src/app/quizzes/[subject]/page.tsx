"use client";

import { useState } from "react";
import { quizzes, type QuizQuestion } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, RotateCw } from "lucide-react";
import Link from 'next/link';

export default function SubjectQuizPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject as string;
  const quiz = quizzes.find((q) => q.subjectId === subjectId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Quiz not found.</p>
        <Button onClick={() => router.push('/quizzes')} className="ml-4">Back to Quizzes</Button>
      </div>
    );
  }

  const { questions, subjectName } = quiz;
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: value,
    });
  };

  const score = Object.keys(selectedAnswers).reduce((acc, indexStr) => {
    const index = parseInt(indexStr, 10);
    if (selectedAnswers[index] === questions[index].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  }

  if (showResults) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Quiz Results</CardTitle>
            <CardDescription>{subjectName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-lg text-muted-foreground">Your Score</p>
              <p className="text-5xl font-bold text-primary">
                {score} / {questions.length}
              </p>
              <p className="text-2xl font-semibold">
                {((score / questions.length) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Review Your Answers:</h3>
              {questions.map((q, index) => (
                <Alert key={index} variant={selectedAnswers[index] === q.correctAnswer ? "default" : "destructive"}>
                  {selectedAnswers[index] === q.correctAnswer ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  <AlertTitle className="font-bold">{`Q${index+1}: ${q.question}`}</AlertTitle>
                  <AlertDescription>
                    Your answer: {selectedAnswers[index] || "Not answered"} <br />
                    Correct answer: {q.correctAnswer}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/quizzes">All Quizzes</Link>
              </Button>
              <Button onClick={handleRestart}>
                <RotateCw className="mr-2 h-4 w-4" />
                Restart Quiz
              </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4" />
          <CardTitle className="font-headline text-3xl">{subjectName}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl font-semibold">{currentQuestion.question}</p>
          <RadioGroup 
            onValueChange={handleAnswerSelect} 
            value={selectedAnswers[currentQuestionIndex]}
            className="space-y-2"
          >
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2 p-3 rounded-md border has-[:checked]:bg-secondary">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="text-base flex-1 cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex]} className="ml-auto">
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
