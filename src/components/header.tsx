"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Home" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/quizzes", label: "Practice Quizzes" },
  { href: "/resources", label: "VIDEO resources" },
  { href: "/books", label: "Books" },
  { href: "/notes", label: "Notes" },
  { href: "/gtu-papers", label: "GTU" },
];

const toolsMenuItems = [
  { href: "/tools/notes-summarizer", label: "Notes Summarizer" },
  { href: "/tools/important-questions", label: "Important Questions" },
  { href: "/tools/timetable-generator", label: "Timetable Generator" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <GraduationCap className="size-6 text-primary" />
            <span className="font-headline">StudyFirst</span>
          </Link>
        </div>
        <nav className="hidden items-center gap-4 text-sm md:flex">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                isActive(item.href) ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-foreground/60 flex items-center gap-1">
                Tools
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {toolsMenuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href}>{item.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="container flex flex-col gap-4 pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/60 hover:bg-accent/50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <h3 className="px-3 text-xs font-semibold uppercase text-foreground/60">
              Tools
            </h3>
            {toolsMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/60 hover:bg-accent/50"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
