"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import {
  BookText,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  Home,
  Lightbulb,
  Link as LinkIcon,
  Notebook,
  PencilRuler,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "./ui/button";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/syllabus", label: "Syllabus", icon: BookText },
  { href: "/quizzes", label: "Practice Quizzes", icon: PencilRuler },
  { href: "/resources", label: "VIDEO resources", icon: LinkIcon },
  { href: "/notes", label: "Notes", icon: Notebook },
  { href: "/gtu-papers", label: "GTU Old Papers", icon: ClipboardList },
];

const toolsMenuItems = [
  { href: "/tools/notes-summarizer", label: "Notes Summarizer", icon: FileText },
  { href: "/tools/important-questions", label: "Important Questions", icon: Lightbulb },
  { href: "/tools/timetable-generator", label: "Timetable Generator", icon: Calendar },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0" asChild>
              <Link href="/">
                <GraduationCap className="text-primary" />
              </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold font-headline">StudyFirst</h2>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          
          <SidebarGroup>
            <SidebarGroupLabel>Tools</SidebarGroupLabel>
            <SidebarMenu>
              {toolsMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter>
          {/* Footer content can go here */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <div className="flex items-center gap-2 md:hidden">
            <SidebarTrigger />
            <Link href="/" className="flex items-center gap-2 font-bold">
              <GraduationCap className="size-6 text-primary" />
              <span className="font-headline">StudyFirst</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
