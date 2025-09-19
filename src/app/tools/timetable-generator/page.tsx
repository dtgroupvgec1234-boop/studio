"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { syllabus } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["9am - 11am", "11am - 1pm", "2pm - 4pm", "4pm - 6pm"];

type Timetable = Record<string, Record<string, string>>;

export default function TimetableGeneratorPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<Record<string, string[]>>({});
  const [timetable, setTimetable] = useState<Timetable | null>(null);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSlotToggle = (day: string, slot: string) => {
    setAvailableSlots((prev) => {
      const daySlots = prev[day] || [];
      return {
        ...prev,
        [day]: daySlots.includes(slot)
          ? daySlots.filter((s) => s !== slot)
          : [...daySlots, slot],
      };
    });
  };

  const generateTimetable = () => {
    if (selectedSubjects.length === 0) {
      alert("Please select at least one subject.");
      return;
    }

    const allSlots: { day: string; slot: string }[] = [];
    daysOfWeek.forEach((day) => {
      if (availableSlots[day]) {
        availableSlots[day].forEach((slot) => {
          allSlots.push({ day, slot });
        });
      }
    });

    if (allSlots.length === 0) {
      alert("Please select at least one study slot.");
      return;
    }

    const newTimetable: Timetable = {};
    let subjectIndex = 0;

    allSlots.forEach(({ day, slot }) => {
      if (!newTimetable[day]) {
        newTimetable[day] = {};
      }
      const subjectId = selectedSubjects[subjectIndex % selectedSubjects.length];
      const subjectName = syllabus.find(s => s.id === subjectId)?.name || 'Study';
      newTimetable[day][slot] = subjectName;
      subjectIndex++;
    });

    setTimetable(newTimetable);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Study Timetable Generator
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Create a personalized study schedule based on your courses and time.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Select Your Subjects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {syllabus.map((subject) => (
                <div key={subject.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject.id}
                    checked={selectedSubjects.includes(subject.id)}
                    onCheckedChange={() => handleSubjectToggle(subject.id)}
                  />
                  <Label htmlFor={subject.id}>{subject.name}</Label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Select Available Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <h4 className="font-semibold mb-2">{day}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`${day}-${slot}`}
                          checked={availableSlots[day]?.includes(slot)}
                          onCheckedChange={() => handleSlotToggle(day, slot)}
                        />
                        <Label htmlFor={`${day}-${slot}`}>{slot}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={generateTimetable} className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Generate Timetable
          </Button>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Timetable</CardTitle>
              <CardDescription>
                Here is your generated study schedule.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {timetable ? (
                <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      {daysOfWeek.map((day) => (
                        <TableHead key={day}>{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((slot) => (
                      <TableRow key={slot}>
                        <TableCell className="font-medium">{slot}</TableCell>
                        {daysOfWeek.map((day) => (
                          <TableCell key={day}>
                            {timetable[day]?.[slot] || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] border-dashed border-2 rounded-md bg-secondary/50">
                  <p className="text-muted-foreground">
                    Your timetable will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
