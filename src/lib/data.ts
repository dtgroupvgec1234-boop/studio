export type SyllabusSubject = {
  id: string;
  name: string;
  code: string;
  description: string;
  modules: {
    title: string;
    topics: string[];
  }[];
};

export const syllabus: SyllabusSubject[] = [
  {
    id: "mathematics-1",
    name: "Engineering Mathematics I",
    code: "MA101",
    description: "Fundamental concepts of calculus and linear algebra.",
    modules: [
      {
        title: "Module 1: Differential Calculus",
        topics: [
          "Limits, Continuity and Differentiability",
          "Rolle's Theorem, Mean Value Theorems",
          "Taylor's and Maclaurin's theorems",
          "Indeterminate forms and L'Hospital's rule",
        ],
      },
      {
        title: "Module 2: Integral Calculus",
        topics: [
          "Definite and Indefinite Integrals",
          "Beta and Gamma functions and their properties",
          "Applications of definite integrals to evaluate surface areas and volumes",
        ],
      },
      {
        title: "Module 3: Matrices",
        topics: [
          "Matrices, determinants, system of linear equations",
          "Eigenvalues and eigenvectors",
          "Cayley-Hamilton Theorem",
        ],
      },
    ],
  },
  {
    id: "physics-1",
    name: "Engineering Physics",
    code: "PH101",
    description: "Introduction to mechanics, optics, and quantum mechanics.",
    modules: [
      {
        title: "Module 1: Mechanics",
        topics: [
          "Newton's Laws of Motion",
          "Work, Energy, and Power",
          "Rotational Motion",
          "Simple Harmonic Motion",
        ],
      },
      {
        title: "Module 2: Optics",
        topics: [
          "Interference and Diffraction",
          "Polarization",
          "Lasers and their applications",
        ],
      },
      {
        title: "Module 3: Quantum Mechanics",
        topics: [
          "Wave-particle duality",
          "Schrodinger's wave equation",
          "Uncertainty principle",
          "Introduction to quantum computing",
        ],
      },
    ],
  },
  {
    id: "programming",
    name: "Problem Solving and Programming",
    code: "CS101",
    description: "Basics of computer programming using C language.",
    modules: [
      {
        title: "Module 1: Introduction to C",
        topics: [
          "History of C, basic structure of C programs",
          "Constants, Variables, and Data Types",
          "Operators and Expressions",
        ],
      },
      {
        title: "Module 2: Control Flow",
        topics: [
          "Decision making and branching (if, switch)",
          "Looping (while, for, do-while)",
          "Arrays and Strings",
        ],
      },
      {
        title: "Module 3: Functions and Pointers",
        topics: [
          "User-defined functions",
          "Recursion",
          "Pointers and their usage",
          "Structures and Unions",
        ],
      },
    ],
  },
];

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  subjectId: string;
  subjectName: string;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  {
    subjectId: "mathematics-1",
    subjectName: "Engineering Mathematics I",
    questions: [
      {
        question: "What is the derivative of x^2?",
        options: ["2x", "x", "x^3", "2"],
        correctAnswer: "2x",
      },
      {
        question: "Rolle's Theorem requires the function to be continuous on [a,b] and differentiable on (a,b), and what other condition?",
        options: ["f(a) > f(b)", "f(a) < f(b)", "f(a) = f(b)", "f(a) != f(b)"],
        correctAnswer: "f(a) = f(b)",
      },
      {
        question: "Which of the following is an indeterminate form?",
        options: ["0/1", "1/0", "0/0", "1/1"],
        correctAnswer: "0/0",
      },
    ],
  },
  {
    subjectId: "physics-1",
    subjectName: "Engineering Physics",
    questions: [
      {
        question: "Which of Newton's laws is also known as the law of inertia?",
        options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
        correctAnswer: "First Law",
      },
      {
        question: "The phenomenon of light bending around corners is called:",
        options: ["Reflection", "Refraction", "Diffraction", "Interference"],
        correctAnswer: "Diffraction",
      },
    ],
  },
  {
    subjectId: "programming",
    subjectName: "Problem Solving and Programming",
    questions: [
      {
        question: "Which keyword is used to define a constant in C?",
        options: ["const", "let", "var", "final"],
        correctAnswer: "const",
      },
      {
        question: "What is the correct way to declare a pointer in C?",
        options: ["int &p;", "int p;", "ptr p;", "int *p;"],
        correctAnswer: "int *p;",
      },
      {
        question: "Which function is the entry point of every C program?",
        options: ["start()", "main()", "program()", "entry()"],
        correctAnswer: "main()",
      },
    ],
  },
];


export type Resource = {
    id: string;
    title: string;
    description: string;
    link: string;
    category: 'Website' | 'Textbook' | 'Video Playlist';
    subject: string;
}

export const resources: Resource[] = [
    {
        id: '1',
        title: 'NPTEL Mathematics for Engineers',
        description: 'Comprehensive video lectures covering all major topics in engineering mathematics.',
        link: 'https://nptel.ac.in/courses/111105121',
        category: 'Video Playlist',
        subject: 'Mathematics'
    },
    {
        id: '2',
        title: 'Higher Engineering Mathematics by B.S. Grewal',
        description: 'The quintessential textbook for first-year engineering students.',
        link: '#',
        category: 'Textbook',
        subject: 'Mathematics'
    },
    {
        id: '3',
        title: 'Khan Academy Physics',
        description: 'Clear and concise explanations of fundamental physics concepts.',
        link: 'https://www.khanacademy.org/science/physics',
        category: 'Website',
        subject: 'Physics'
    },
     {
        id: '4',
        title: 'Concepts of Physics by H.C. Verma',
        description: 'A popular book for building a strong foundation in physics.',
        link: '#',
        category: 'Textbook',
        subject: 'Physics'
    },
    {
        id: '5',
        title: 'GeeksforGeeks C Programming',
        description: 'A vast collection of tutorials, examples, and practice problems for C.',
        link: 'https://www.geeksforgeeks.org/c-programming-language/',
        category: 'Website',
        subject: 'Programming'
    },
    {
        id: '6',
        title: 'The C Programming Language by K&R',
        description: 'The classic book on C written by its creators.',
        link: '#',
        category: 'Textbook',
        subject: 'Programming'
    },
    {
        id: '7',
        title: 'First Year Engineering Physics by Gautam Varad',
        description: 'A comprehensive video series covering key topics in first-year engineering physics.',
        link: 'https://youtube.com/playlist?list=PL3qvHcrYGy1v2kJX4SSsurE3_GdVe0ZD5&si=-5B4Y0wPuV1ov9lP',
        category: 'Video Playlist',
        subject: 'Physics'
    },
    {
        id: '8',
        title: 'GTU Old Question Papers',
        description: 'Access old question papers for all first-year subjects to prepare for your exams.',
        link: 'https://www.gtu.ac.in/old_question_paper.aspx',
        category: 'Website',
        subject: 'All Subjects'
    }
]
