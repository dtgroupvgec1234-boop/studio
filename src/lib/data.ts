
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
  {
    id: 'electrical-eng',
    name: 'Basic Electrical Engineering',
    code: 'EE101',
    description: 'Fundamental concepts of electrical circuits and machines.',
    modules: [
      {
        title: 'Module 1: DC Circuits',
        topics: [
          'Ohm’s Law, Kirchhoff’s Laws',
          'Series and Parallel Circuits',
          'Star-Delta Transformation',
          'Thevenin\'s and Norton\'s Theorem',
        ],
      },
      {
        title: 'Module 2: AC Circuits',
        topics: [
          'Generation of sinusoidal AC voltage',
          'Phasor representation',
          'RLC series and parallel circuits',
          'Resonance',
        ],
      },
      {
        title: 'Module 3: Electrical Machines',
        topics: [
          'Single phase transformer: principle, construction',
          'DC Machines: principle, construction of DC generator and motor',
          'Three phase induction motor: principle, construction',
        ],
      },
    ],
  },
  {
    id: 'mechanical-eng',
    name: 'Elements of Mechanical Engineering',
    code: 'ME101',
    description:
      'Fundamental concepts of thermodynamics, mechanics, and materials.',
    modules: [
      {
        title: 'Module 1: Thermodynamics',
        topics: [
          'Zeroth, First, and Second Laws of Thermodynamics',
          'Concepts of heat and work',
          'Properties of pure substances',
          'Introduction to heat engines',
        ],
      },
      {
        title: 'Module 2: Engineering Mechanics',
        topics: [
          'Forces and moments',
          'Equilibrium of rigid bodies',
          'Friction',
          'Centroid and Moment of Inertia',
        ],
      },
      {
        title: 'Module 3: Engineering Materials',
        topics: [
          'Properties of materials (mechanical, thermal, electrical)',
          'Classification of materials',
          'Stress-Strain curves for ductile and brittle materials',
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
      {
        question: "The value of the integral of 1/x dx is:",
        options: ["ln(x)", "x^2", "1/x^2", "-1/x^2"],
        correctAnswer: "ln(x)",
      },
      {
        question: "The Beta function B(m,n) is defined as:",
        options: ["∫(0 to 1) x^(m-1) (1-x)^(n-1) dx", "∫(0 to ∞) x^(m-1) e^(-x) dx", "∫(0 to 1) x^m (1-x)^n dx", "∫(0 to ∞) x^(n-1) e^(-x) dx"],
        correctAnswer: "∫(0 to 1) x^(m-1) (1-x)^(n-1) dx",
      },
      {
        question: "If a matrix A has an inverse, it is called a:",
        options: ["Singular matrix", "Non-singular matrix", "Symmetric matrix", "Identity matrix"],
        correctAnswer: "Non-singular matrix",
      },
      {
        question: "What are the eigenvalues of an identity matrix of order n?",
        options: ["All 0s", "All 1s", "All ns", "A mix of 0s and 1s"],
        correctAnswer: "All 1s",
      },
      {
        question: "The Cayley-Hamilton Theorem states that every square matrix satisfies its own:",
        options: ["Characteristic equation", "Inverse equation", "Transpose equation", "Adjoint equation"],
        correctAnswer: "Characteristic equation",
      },
      {
        question: "What is the rank of a null matrix?",
        options: ["1", "0", "-1", "Not defined"],
        correctAnswer: "0",
      },
      {
        question: "The derivative of sin(x) is:",
        options: ["cos(x)", "-sin(x)", "-cos(x)", "tan(x)"],
        correctAnswer: "cos(x)",
      },
      {
        question: "The determinant of a 2x2 matrix [[a, b], [c, d]] is:",
        options: ["ad - bc", "ac - bd", "ab - cd", "ad + bc"],
        correctAnswer: "ad - bc",
      },
      {
        question: "What is the value of ∫(0 to π/2) sin(x) dx?",
        options: ["1", "0", "-1", "2"],
        correctAnswer: "1",
      },
      {
        question: "If A is a 3x3 matrix and det(A) = 2, what is det(2A)?",
        options: ["16", "8", "4", "2"],
        correctAnswer: "16",
      },
      {
        question: "The Maclaurin series is a special case of the Taylor series centered at:",
        options: ["x = 0", "x = 1", "x = a", "x = -1"],
        correctAnswer: "x = 0",
      },
      {
        question: "A matrix A is symmetric if:",
        options: ["A = A^T", "A = -A^T", "A = A^-1", "A is a square matrix"],
        correctAnswer: "A = A^T",
      },
      {
        question: "The Gamma function Γ(n) is defined as:",
        options: ["(n-1)!", "n!", "(n+1)!", "n"],
        correctAnswer: "(n-1)!",
      },
      {
        question: "L'Hospital's Rule is used to evaluate limits that are in:",
        options: ["Indeterminate forms", "Determinate forms", "All forms", "Fractional forms"],
        correctAnswer: "Indeterminate forms",
      },
      {
        question: "The trace of a square matrix is the:",
        options: ["Sum of its diagonal elements", "Product of its diagonal elements", "Sum of all its elements", "Determinant of the matrix"],
        correctAnswer: "Sum of its diagonal elements",
      },
      {
        question: "Which theorem connects differentiation and integration?",
        options: ["Fundamental Theorem of Calculus", "Mean Value Theorem", "Rolle's Theorem", "Cayley-Hamilton Theorem"],
        correctAnswer: "Fundamental Theorem of Calculus",
      },
      {
        question: "A system of linear equations AX = B is consistent if:",
        options: ["It has at least one solution", "It has no solution", "It has a unique solution", "The determinant of A is zero"],
        correctAnswer: "It has at least one solution",
      },
      {
        question: "The partial derivative ∂f/∂x treats which variable as a constant?",
        options: ["y", "x", "z", "all of the above"],
        correctAnswer: "y",
      },
      {
        question: "The order of a differential equation is the:",
        options: ["Highest derivative in the equation", "Highest power of the dependent variable", "Number of terms", "Number of variables"],
        correctAnswer: "Highest derivative in the equation",
      },
      {
        question: "What is the area of a circle with radius r?",
        options: ["πr²", "2πr", "πr", "2πr²"],
        correctAnswer: "πr²",
      },
      {
        question: "A set of vectors is linearly independent if:",
        options: ["No vector can be written as a linear combination of the others", "All vectors are orthogonal", "All vectors are unit vectors", "The set includes the zero vector"],
        correctAnswer: "No vector can be written as a linear combination of the others",
      },
      {
        question: "The rank of a matrix is the number of:",
        options: ["Linearly independent rows or columns", "Rows", "Columns", "Elements"],
        correctAnswer: "Linearly independent rows or columns",
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
      {
        question: "Work done is a:",
        options: ["Scalar quantity", "Vector quantity", "Both scalar and vector", "Neither scalar nor vector"],
        correctAnswer: "Scalar quantity",
      },
      {
        question: "The unit of power is:",
        options: ["Joule", "Watt", "Newton", "Pascal"],
        correctAnswer: "Watt",
      },
      {
        question: "The time period of a simple pendulum depends on its:",
        options: ["Mass", "Length", "Amplitude", "Material of the bob"],
        correctAnswer: "Length",
      },
      {
        question: "Constructive interference occurs when the path difference is:",
        options: ["nλ", "(n+1/2)λ", "n/λ", "λ/n"],
        correctAnswer: "nλ",
      },
      {
        question: "Polarization is a property of:",
        options: ["Transverse waves", "Longitudinal waves", "Both", "Neither"],
        correctAnswer: "Transverse waves",
      },
      {
        question: "LASER is an acronym for:",
        options: ["Light Amplification by Stimulated Emission of Radiation", "Light Absorption by Spontaneous Emission of Radiation", "Light Amplification by Spontaneous Emission of Radiation", "Light Absorption by Stimulated Emission of Radiation"],
        correctAnswer: "Light Amplification by Stimulated Emission of Radiation",
      },
      {
        question: "Heisenberg's Uncertainty Principle relates:",
        options: ["Position and momentum", "Energy and time", "Both A and B", "None of the above"],
        correctAnswer: "Both A and B",
      },
      {
        question: "The specific charge of an electron is:",
        options: ["1.6 x 10^-19 C", "9.1 x 10^-31 kg", "1.76 x 10^11 C/kg", "6.022 x 10^23"],
        correctAnswer: "1.76 x 10^11 C/kg",
      },
      {
        question: "What is the escape velocity of Earth?",
        options: ["11.2 km/s", "9.8 m/s²", "1.67 km/s", "2.38 km/s"],
        correctAnswer: "11.2 km/s",
      },
      {
        question: "A mirage is caused by:",
        options: ["Total internal reflection", "Diffraction", "Interference", "Polarization"],
        correctAnswer: "Total internal reflection",
      },
      {
        question: "Which color of light has the longest wavelength?",
        options: ["Red", "Violet", "Green", "Blue"],
        correctAnswer: "Red",
      },
      {
        question: "The momentum of a photon is given by:",
        options: ["h/λ", "hλ", "hc/λ", "λ/h"],
        correctAnswer: "h/λ",
      },
      {
        question: "In a semiconductor, the forbidden energy gap is:",
        options: ["Small", "Large", "Zero", "Infinite"],
        correctAnswer: "Small",
      },
      {
        question: "The working of an optical fiber is based on:",
        options: ["Total Internal Reflection", "Refraction", "Diffraction", "Scattering"],
        correctAnswer: "Total Internal Reflection",
      },
      {
        question: "A black body is a perfect:",
        options: ["Absorber and emitter", "Reflector", "Transmitter", "Diffractor"],
        correctAnswer: "Absorber and emitter",
      },
      {
        question: "The force acting on a charged particle in a magnetic field is called:",
        options: ["Lorentz force", "Gravitational force", "Nuclear force", "Coulomb force"],
        correctAnswer: "Lorentz force",
      },
      {
        question: "The photoelectric effect demonstrates the:",
        options: ["Particle nature of light", "Wave nature of light", "Dual nature of light", "Electromagnetic nature of light"],
        correctAnswer: "Particle nature of light",
      },
      {
        question: "The unit of magnetic field strength is:",
        options: ["Tesla", "Weber", "Henry", "Farad"],
        correctAnswer: "Tesla",
      },
      {
        question: "What is the principle behind a transformer?",
        options: ["Mutual induction", "Self-induction", "Electromagnetic induction", "Static induction"],
        correctAnswer: "Mutual induction",
      },
      {
        question: "Which of the following is not an electromagnetic wave?",
        options: ["Sound waves", "X-rays", "Gamma rays", "Radio waves"],
        correctAnswer: "Sound waves",
      },
      {
        question: 'The "audible range" of sound frequency for humans is:',
        options: ["20 Hz to 20,000 Hz", "10 Hz to 10,000 Hz", "Below 20 Hz", "Above 20,000 Hz"],
        correctAnswer: "20 Hz to 20,000 Hz",
      },
      {
        question: "What is the function of a rectifier?",
        options: ["Convert AC to DC", "Convert DC to AC", "Amplify the signal", "Store charge"],
        correctAnswer: "Convert AC to DC",
      },
      {
        question: "The resistance of a superconductor is:",
        options: ["Zero", "Infinite", "Very high", "Depends on temperature"],
        correctAnswer: "Zero",
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
      {
        question: "What is the size of a `char` data type in C?",
        options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
        correctAnswer: "1 byte",
      },
      {
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for", "while", "do-while", "if"],
        correctAnswer: "do-while",
      },
      {
        question: "The `&` operator is used to get the:",
        options: ["Value of a variable", "Address of a variable", "Size of a variable", "Type of a variable"],
        correctAnswer: "Address of a variable",
      },
      {
        question: "Which header file is required for using `printf()` and `scanf()`?",
        options: ["<stdlib.h>", "<string.h>", "<math.h>", "<stdio.h>"],
        correctAnswer: "<stdio.h>",
      },
      {
        question: "A string in C is an array of characters ending with:",
        options: ["'\\0'", "'.'", "'\\n'", "':'"],
        correctAnswer: "'\\0'",
      },
      {
        question: "What does `malloc()` function do?",
        options: ["Allocates memory and initializes it to zero", "Allocates memory but doesn't initialize", "Frees allocated memory", "Reallocates memory"],
        correctAnswer: "Allocates memory but doesn't initialize",
      },
      {
        question: "Which keyword is used to create a user-defined data type by grouping items of different types?",
        options: ["struct", "union", "typedef", "enum"],
        correctAnswer: "struct",
      },
      {
        question: "What will be the output of `printf(\"%d\", sizeof(int));` on a 32-bit system?",
        options: ["4", "2", "8", "Depends on the compiler"],
        correctAnswer: "4",
      },
      {
        question: "The `break` statement is used to exit from a:",
        options: ["Loop or switch statement", "Function", "Program", "Header file"],
        correctAnswer: "Loop or switch statement",
      },
      {
        question: "What is the purpose of the `continue` statement in C?",
        options: ["Skip the current iteration and proceed to the next", "Exit the loop", "Go to a specific label", "Stop the program"],
        correctAnswer: "Skip the current iteration and proceed to the next",
      },
      {
        question: "In C, what is the correct syntax for a for loop?",
        options: ["for(initialization; condition; increment/decrement)", "for(condition; initialization; increment/decrement)", "for(initialization; increment/decrement; condition)", "for(increment/decrement; condition; initialization)"],
        correctAnswer: "for(initialization; condition; increment/decrement)",
      },
      {
        question: "Which of the following is a logical operator in C?",
        options: ["&&", "&", "|", "||"],
        correctAnswer: "&&",
      },
      {
        question: "A function that calls itself is known as a:",
        options: ["Recursive function", "System function", "Library function", "User-defined function"],
        correctAnswer: "Recursive function",
      },
      {
        question: "What is the format specifier for a floating-point number in C?",
        options: ["%f", "%d", "%c", "%s"],
        correctAnswer: "%f",
      },
      {
        question: "The `strcmp()` function is used to:",
        options: ["Compare two strings", "Copy one string to another", "Find the length of a string", "Concatenate two strings"],
        correctAnswer: "Compare two strings",
      },
      {
        question: "An array is a collection of:",
        options: ["Elements of the same data type", "Elements of different data types", "Functions", "Pointers"],
        correctAnswer: "Elements of the same data type",
      },
      {
        question: "What does the `->` operator do in C?",
        options: ["Accesses a member of a structure through a pointer", "Dereferences a pointer", "Creates a pointer", "Compares two pointers"],
        correctAnswer: "Accesses a member of a structure through a pointer",
      },
      {
        question: "Which keyword is used to define a block of code with a name?",
        options: ["function", "sub", "void", "It's not directly possible"],
        correctAnswer: "function",
      },
      {
        question: "What is the value of `EOF`?",
        options: ["-1", "0", "1", "A special character"],
        correctAnswer: "-1",
      },
      {
        question: "Which data type would you use to store a single character?",
        options: ["char", "int", "string", "float"],
        correctAnswer: "char",
      },
      {
        question: "The `do-while` loop checks the condition at the:",
        options: ["End of the loop", "Beginning of the loop", "Middle of the loop", "Compiler's discretion"],
        correctAnswer: "End of the loop",
      },
      {
        question: "What is the purpose of `typedef` in C?",
        options: ["To create an alias for a data type", "To define a new variable", "To define a constant", "To include a header file"],
        correctAnswer: "To create an alias for a data type",
      },
    ],
  },
  {
    subjectId: 'electrical-eng',
    subjectName: 'Basic Electrical Engineering',
    questions: [
      {
        question: 'Ohm\'s law states that:',
        options: ['V = IR', 'V = I/R', 'I = VR', 'R = VI'],
        correctAnswer: 'V = IR',
      },
      {
        question: 'What is the unit of electrical resistance?',
        options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
        correctAnswer: 'Ohm',
      },
      {
        question:
          'A device that converts electrical energy into mechanical energy is a:',
        options: ['Generator', 'Motor', 'Transformer', 'Inverter'],
        correctAnswer: 'Motor',
      },
      {
        question: "Kirchhoff's Current Law (KCL) states that the algebraic sum of currents ______ a node is zero.",
        options: ["entering", "leaving", "entering and leaving", "passing through"],
        correctAnswer: "entering and leaving",
      },
      {
        question: "In a purely resistive AC circuit, the phase angle between voltage and current is:",
        options: ["90 degrees", "0 degrees", "180 degrees", "45 degrees"],
        correctAnswer: "0 degrees",
      },
      {
        question: "A transformer works on the principle of:",
        options: ["Self-induction", "Mutual induction", "Ohm's Law", "Lenz's Law"],
        correctAnswer: "Mutual induction",
      },
      {
        question: "The frequency of AC mains in India is:",
        options: ["60 Hz", "50 Hz", "100 Hz", "120 Hz"],
        correctAnswer: "50 Hz",
      },
      {
        question: "Which material is commonly used as a semiconductor?",
        options: ["Copper", "Aluminum", "Silicon", "Silver"],
        correctAnswer: "Silicon",
      },
      {
        question: "The power factor in a purely inductive circuit is:",
        options: ["1", "0", "0.5", "-1"],
        correctAnswer: "0",
      },
      {
        question: "What does a capacitor store?",
        options: ["Current", "Voltage", "Charge", "Resistance"],
        correctAnswer: "Charge",
      },
      {
        question: "What is the unit of capacitance?",
        options: ["Farad", "Henry", "Ohm", "Siemens"],
        correctAnswer: "Farad",
      },
      {
        question: "Thevenin's theorem simplifies a complex circuit into a:",
        options: ["Voltage source and series resistor", "Current source and parallel resistor", "Voltage source and parallel resistor", "Current source and series resistor"],
        correctAnswer: "Voltage source and series resistor",
      },
      {
        question: "In a series RLC circuit, resonance occurs when:",
        options: ["XL = XC", "R = XL", "R = XC", "XL > XC"],
        correctAnswer: "XL = XC",
      },
      {
        question: "The purpose of a fuse in a circuit is to:",
        options: ["Protect against overcurrent", "Increase the voltage", "Decrease the current", "Store energy"],
        correctAnswer: "Protect against overcurrent",
      },
      {
        question: "Which of the following is a passive component?",
        options: ["Resistor", "Transistor", "Diode", "Operational Amplifier"],
        correctAnswer: "Resistor",
      },
      {
        question: "The flow of electrons is called:",
        options: ["Current", "Voltage", "Resistance", "Power"],
        correctAnswer: "Current",
      },
      {
        question: "A step-up transformer increases:",
        options: ["Voltage", "Current", "Power", "Frequency"],
        correctAnswer: "Voltage",
      },
      {
        question: "What is the SI unit of electric charge?",
        options: ["Coulomb", "Ampere", "Volt", "Joule"],
        correctAnswer: "Coulomb",
      },
      {
        question: "What does an ammeter measure?",
        options: ["Current", "Voltage", "Resistance", "Power"],
        correctAnswer: "Current",
      },
      {
        question: "In a parallel circuit, which quantity remains the same across all components?",
        options: ["Voltage", "Current", "Resistance", "Power"],
        correctAnswer: "Voltage",
      },
      {
        question: "A DC motor converts:",
        options: ["Electrical energy to mechanical energy", "Mechanical energy to electrical energy", "AC to DC", "DC to AC"],
        correctAnswer: "Electrical energy to mechanical energy",
      },
      {
        question: "Which law is also known as the law of conservation of energy for electrical circuits?",
        options: ["Kirchhoff's Voltage Law (KVL)", "Kirchhoff's Current Law (KCL)", "Ohm's Law", "Faraday's Law"],
        correctAnswer: "Kirchhoff's Voltage Law (KVL)",
      },
      {
        question: "The slip of a three-phase induction motor is:",
        options: ["(Ns - Nr) / Ns", "(Nr - Ns) / Ns", "Ns / Nr", "Nr / Ns"],
        correctAnswer: "(Ns - Nr) / Ns",
      },
      {
        question: "What is the function of a commutator in a DC machine?",
        options: ["To convert AC to DC or vice-versa", "To provide starting torque", "To reduce losses", "To control speed"],
        correctAnswer: "To convert AC to DC or vice-versa",
      },
      {
        question: "Admittance is the reciprocal of:",
        options: ["Impedance", "Resistance", "Reactance", "Conductance"],
        correctAnswer: "Impedance",
      },
    ],
  },
  {
    subjectId: 'mechanical-eng',
    subjectName: 'Elements of Mechanical Engineering',
    questions: [
      {
        question: 'Which of these is a law of thermodynamics?',
        options: [
          'First Law',
          'Law of Conservation of Mass',
          'Hooke\'s Law',
          'Newton\'s Law of Cooling',
        ],
        correctAnswer: 'First Law',
      },
      {
        question:
          'The ability of a material to deform under tensile stress is called:',
        options: ['Hardness', 'Ductility', 'Brittleness', 'Stiffness'],
        correctAnswer: 'Ductility',
      },
      {
        question: "The Zeroth Law of Thermodynamics deals with:",
        options: ["Thermal equilibrium", "Energy conservation", "Entropy", "Absolute zero temperature"],
        correctAnswer: "Thermal equilibrium",
      },
      {
        question: "Which of the following is an intensive property?",
        options: ["Volume", "Mass", "Energy", "Temperature"],
        correctAnswer: "Temperature",
      },
      {
        question: "The efficiency of a Carnot engine depends on:",
        options: ["The working substance", "The temperatures of the source and sink", "The design of the engine", "The power output"],
        correctAnswer: "The temperatures of the source and sink",
      },
      {
        question: "What is the unit of stress?",
        options: ["N", "N/m", "N·m", "N/m² (Pascal)"],
        correctAnswer: "N/m² (Pascal)",
      },
      {
        question: "Which type of friction acts when a body is in motion?",
        options: ["Static friction", "Kinetic friction", "Rolling friction", "Fluid friction"],
        correctAnswer: "Kinetic friction",
      },
      {
        question: "A moment of force is also known as:",
        options: ["Torque", "Impulse", "Work", "Power"],
        correctAnswer: "Torque",
      },
      {
        question: "The centroid of a triangle is the intersection of its:",
        options: ["Altitudes", "Medians", "Perpendicular bisectors", "Angle bisectors"],
        correctAnswer: "Medians",
      },
      {
        question: "Which material is known for its high carbon content and brittleness?",
        options: ["Mild Steel", "Aluminum", "Cast Iron", "Copper"],
        correctAnswer: "Cast Iron",
      },
      {
        question: "The First Law of Thermodynamics is a statement of:",
        options: ["Conservation of energy", "Conservation of mass", "Conservation of momentum", "Conservation of charge"],
        correctAnswer: "Conservation of energy",
      },
      {
        question: "A property that depends on the amount of matter in a system is called:",
        options: ["Extensive property", "Intensive property", "Specific property", "Physical property"],
        correctAnswer: "Extensive property",
      },
      {
        question: "What is the process called when heat is added at constant volume?",
        options: ["Isochoric process", "Isobaric process", "Isothermal process", "Adiabatic process"],
        correctAnswer: "Isochoric process",
      },
      {
        question: "The working fluid in a steam power plant is:",
        options: ["Water", "Air", "Refrigerant", "Gasoline"],
        correctAnswer: "Water",
      },
      {
        question: "The stress-strain curve for a brittle material typically lacks a:",
        options: ["Yield point", "Ultimate tensile strength", "Fracture point", "Elastic region"],
        correctAnswer: "Yield point",
      },
      {
        question: "Varignon's theorem is related to:",
        options: ["Moments of forces", "Equilibrium of forces", "Friction", "Thermodynamics"],
        correctAnswer: "Moments of forces",
      },
      {
        question: "The efficiency of a 4-stroke engine is generally ____ than a 2-stroke engine.",
        options: ["Higher", "Lower", "The same", "Depends on the fuel"],
        correctAnswer: "Higher",
      },
      {
        question: "The main function of a clutch is to:",
        options: ["Connect and disconnect the engine from the transmission", "Change gears", "Brake the vehicle", "Steer the vehicle"],
        correctAnswer: "Connect and disconnect the engine from the transmission",
      },
      {
        question: "Which of the following is a type of gear?",
        options: ["Spur gear", "V-belt", "Chain", "Pulley"],
        correctAnswer: "Spur gear",
      },
      {
        question: "A refrigeration cycle works by:",
        options: ["Transferring heat from a low-temperature region to a high-temperature region", "Transferring heat from a high-temperature region to a low-temperature region", "Creating heat", "Destroying heat"],
        correctAnswer: "Transferring heat from a low-temperature region to a high-temperature region",
      },
      {
        question: 'The "Triple Point" of a substance is the condition at which:',
        options: ["Solid, liquid, and vapor phases coexist in equilibrium", "Only liquid and vapor coexist", "Only solid and liquid coexist", "The substance becomes a plasma"],
        correctAnswer: "Solid, liquid, and vapor phases coexist in equilibrium",
      },
      {
        question: "What is the purpose of a boiler?",
        options: ["To generate steam", "To cool water", "To compress air", "To expand gas"],
        correctAnswer: "To generate steam",
      },
      {
        question: "Young's Modulus is a measure of a material's:",
        options: ["Stiffness", "Strength", "Ductility", "Hardness"],
        correctAnswer: "Stiffness",
      },
      {
        question: "Which of the following is a renewable energy source?",
        options: ["Solar energy", "Coal", "Natural gas", "Petroleum"],
        correctAnswer: "Solar energy",
      },
      {
        question: "The term \"I.C. Engine\" stands for:",
        options: ["Internal Combustion Engine", "Integrated Circuit Engine", "Ideal Carnot Engine", "International Combustion Engine"],
        correctAnswer: "Internal Combustion Engine",
      },
    ],
  },
];


export type Resource = {
    id: string;
    title: string;
    description: string;
    link?: string;
    chapters?: { title: string; link: string }[];
    category: 'Website' | 'Textbook' | 'Video Playlist';
    subject: string;
}

export type BookResource = {
    id: string;
    title: string;
    description: string;
    link?: string;
    category: 'Textbook';
    subject: string;
}

export const resources: Resource[] = [
    {
        id: '1',
        title: 'NPTEL Mathematics for Engineers',
        description: 'Comprehensive video lectures covering all major topics in engineering mathematics.',
        link: 'https://youtube.com/playlist?list=PLbRMhDVUMngeVrxtbBz-n8HvP8KAWBpI5&si=HrSzozlrqe14XFea',
        category: 'Video Playlist',
        subject: 'Mathematics'
    },
    {
        id: '2',
        title: 'Engineering mathematics 1',
        description: 'A complete playlist covering the syllabus for first-year engineering mathematics.',
        category: 'Video Playlist',
        subject: 'Mathematics',
        chapters: [
            { title: "Matrices", link: "https://www.youtube.com/playlist?list=PLhSp9OSVmeyIVQpCt2kwsC1dNVl1GwlVn" },
            { title: "Fourier Series", link: "https://www.youtube.com/playlist?list=PLHhjkSguZZGSqplksd846t-9NxSRCQ1Fu" },
            { title: "Taylor and Maclaurin", link: "https://www.youtube.com/playlist?list=PLHhjkSguZZGTPcI1ixViDfox1bMmjr2Qy" },
            { title: "Indeterminate Forms", link: "https://www.youtube.com/playlist?list=PLHhjkSguZZGT80K6EA02emVUfXW-vxMJp" },
            { title: "Limits and Continuity", link: "https://www.youtube.com/watch?v=h1Ur6Lw5Fwc" },
            { title: "Partial Derivatives", link: "https://www.youtube.com/watch?v=HiOFurV3h94&list=PLKS7ZMKnbPrQf7IBhKlsnLXwJRZSDMhun" },
            { title: "Implicit Function", link: "https://www.youtube.com/watch?v=ib5Y-_GH8qw" },
            { title: "Euler's Theorem", link: "https://www.youtube.com/watch?v=7NO1Ib8FCgY&list=PLyZkuIOV32m-skr6ZZkSZplo56vfV9Sf1&index=6" }
        ]
    },
    {
        id: '3',
        title: 'Khan Academy Physics',
        description: 'Clear and concise explanations of fundamental physics concepts.',
        link: 'https://youtube.com/playlist?list=PL1O_shUH1zgVfrG2lDsMWuicLdsxm-Dzz&si=3i3zcjpxpY4f4NtI',
        category: 'Video Playlist',
        subject: 'Physics'
    },
     {
        id: '4',
        title: 'Concepts of Physics by H.C. Verma',
        description: 'A popular book for building a strong foundation in physics.',
        link: 'https://www.mbit.edu.in/wp-content/uploads/2020/05/FULLBOOKPHYSICS.pdf',
        category: 'Textbook',
        subject: 'Physics'
    },
    {
        id: '5',
        title: 'C Programming Language by CodeWithHarry',
        description: 'A comprehensive video tutorial on C language, perfect for beginners.',
        link: 'https://youtu.be/aZb0iu4uGwA?si=8-kXajXwLlrKIuBS',
        category: 'Video Playlist',
        subject: 'Programming'
    },
    {
        id: '6',
        title: 'The C Programming Language by K&R',
        description: 'The classic book on C written by its creators.',
        link: 'https://drive.google.com/drive/folders/1bj5Ik5x9emcP7efqMH_x1btIRnUl7SLT',
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
        title: 'BEE VIDEO RESOURCES',
        description: 'A video playlist for Basic Electrical Engineering.',
        link: 'https://youtube.com/playlist?list=PL0s3O6GgLL5cLAfoALo36QVhy1oM5NZsP&si=cx4CbTcrlr1D8zWZ',
        category: 'Video Playlist',
        subject: 'Basic Electrical Engineering'
    },
    {
        id: '9',
        title: 'BME VIDEO RESOURCES',
        description: 'A video playlist for Elements of Mechanical Engineering.',
        category: 'Video Playlist',
        subject: 'Elements of Mechanical Engineering',
        chapters: [
            { title: "Chap 1 – Introduction", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPLGKI0DtkB7BlIUavGziStI" },
            { title: "Chap 2 – Energy", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPIObt2ismt37_H1m9H7W2Tz" },
            { title: "Chap 3 – Properties of Gases", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPJk64JSbLKuZ749L11ieCMx" },
            { title: "Chap 4 – Properties of Steam", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPJiEypQHAO41YdsZLwEON-a" },
            { title: "Chap 5 – Heat Engines", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPI_MzM-hoGLcSBo45WnQtLh" },
            { title: "Chap 6 – Steam Boilers", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPKvHbIDXJ-BnCzghRE7c8bE" },
            { title: "Chap 7 – I.C Engine", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPJUYuOL090cyYiYhyjcUe7X" },
            { title: "Chap 8 – Pumps", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPLEzbzp_eD012xzgMF9QFQ" },
            { title: "Chap 9 – Air Compressor", link: "https://www.youtube.com/watch?v=ISpoXO_PV84&list=PLgwJf8NK-2e7Fe4vAYDaL0bpseGNhc9on&index=67" },
            { title: "Chap 10 – Refrigeration & Air Conditioner", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPLZMucRenH_RXUHH72s6GDP" },
            { title: "Chap 11 – Coupling , Clutches & Brakes", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPIQG1g4dydNdakEInUFcdYL" },
            { title: "Chap 12 – Transmission of Motion & Power", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPLcv4BoQIsJbzMBFni" },
            { title: "Chap 13 – Important Engineering Materials", link: "https://youtube.com/playlist?list=PLjk-OqI4WmPLouP4pNzFV4aOawQbNwNPi" },
        ]
    },
    {
        id: '11',
        title: 'Elements of Mechanical Engineering',
        description: 'A complete guide to the fundamentals of mechanical engineering, covering thermodynamics, mechanics, and materials.',
        link: 'https://drive.google.com/file/d/1kuLkdP1NoCHAS5AhLcfG4NnqSlPBXzmO/view?usp=drivesdk',
        category: 'Textbook',
        subject: 'Elements of Mechanical Engineering'
    },
    {
        id: '12',
        title: 'Engineering Mathematics 1',
        description: 'The quintessential textbook for first-year engineering students, covering calculus, algebra, and more.',
        link: 'https://drive.google.com/file/d/12FY2EKfYdiSJHoi-RBD8itffxOohmzzH/view?usp=drivesdk',
        category: 'Textbook',
        subject: 'Mathematics'
    },
    {
        id: '13',
        title: 'Basic Electrical Engineering',
        description: 'A foundational textbook for understanding electrical circuits, machines, and systems.',
        link: 'https://drive.google.com/file/d/1QbjtPIdu9yqUOZpCs3Zt1hm11nJGDou/view?usp=drivesdk',
        category: 'Textbook',
        subject: 'Basic Electrical Engineering'
    }
]

export const bmeNotes = [
  {
    title: 'Chapter 1',
    content: null,
    link: 'https://drive.google.com/file/d/1B1i9msuryDahPmBgWnnCBtTmu6WvnC4V/view?usp=drivesdk',
  },
  {
    title: 'Chapter 2',
    content: null,
    link: 'https://drive.google.com/file/d/1B1i9msuryDahPmBgWnnCBtTmu6WvnC4V/view?usp=drivesdk',
  },
  {
    title: 'Chapter 3',
    content: null,
    link: 'https://drive.google.com/file/d/1B7RGt5T66co3iWdhAiS2T9PIbebTI-eE/view?usp=drivesdk',
  },
  {
    title: 'Chapter 4',
    content: null,
    link: 'https://drive.google.com/file/d/1EZW2cxOcEma8kdjN64XPzzD2KF5OrShJ/view?usp=drivesdk',
  },
  {
    title: 'Chapter 5',
    content: null,
    link: 'https://drive.google.com/file/d/1C1Mj6kJwp2YBvCsyOnjyjmEbofIzEvYw/view?usp=drivesdk',
  },
  {
    title: 'Chapter 7',
    content: null,
    link: 'https://drive.google.com/file/d/1C1Mj6kJwp2YBvCsyOnjyjmEbofIzEvYw/view?usp=drivesdk',
  },
];
    
export const beeNotes = [
  {
    title: 'AC circuit',
    link: 'https://drive.google.com/file/d/1ThKiTnKJTMxNxZbvNfoWU5xkaMDYQWsQ/view?usp=drivesdk'
  },
  {
    title: 'DC circuit',
    link: 'https://drive.google.com/file/d/1TggF11rb0k0Qe71m4DQrp1AbiqJZzULr/view?usp=drivesdk'
  },
  {
    title: 'Three Phase AC current',
    link: 'https://drive.google.com/file/d/1pKtLyn2dkWfYzKKUwJaZXqXichVyDdcr/view?usp=drivesdk'
  },
  {
    title: 'Single Phase AC circuit',
    link: 'https://drive.google.com/file/d/1TZ6VXT5nhn3Rxuh1fDDS6vZER9bOuFb4/view?usp=drivesdk'
  }
];

export const mathsNotes = [
  {
    title: 'Fourier series',
    link: 'https://drive.google.com/file/d/1oEQsvZGpG34fWmiXSZZPlsLKGHBfK0XD/view?usp=drivesdk',
  },
  {
    title: 'Indeterminate forms',
    link: 'https://drive.google.com/file/d/1ZYd-jxyB5HOq_qBOzVd4As_-JuXd4FFD/view?usp=drivesdk',
  },
  {
    title: 'Matrix',
    link: 'https://drive.google.com/file/d/1A8GNreJchK0MJrIYtEDYIbjmJ74e5JlV/view?usp=drivesdk',
  },
  {
    title: "Taylor's and Maclaurian's series",
    link: 'https://drive.google.com/file/d/1oGF6Iu_uzy2iciFAv2CXbQAtkOzuMJI2/view?usp=drivesdk',
  },
];
    

    










    

    

    

    

    

    










