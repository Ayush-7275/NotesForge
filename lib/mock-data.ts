export type Subject = {
  id: string
  name: string
  code: string
  color: string
  progress: number
  resources: number
  notes: number
  flashcards: number
  quizzes: number
  lastStudied: string
  description: string
}

export const subjects: Subject[] = [
  {
    id: 'operating-systems',
    name: 'Operating Systems',
    code: 'CS-3004',
    color: 'oklch(0.62 0.14 162)',
    progress: 68,
    resources: 14,
    notes: 12,
    flashcards: 86,
    quizzes: 5,
    lastStudied: '2 hours ago',
    description:
      'Processes, scheduling, memory management, deadlocks, and file systems.',
  },
  {
    id: 'databases',
    name: 'Database Systems',
    code: 'CS-3021',
    color: 'oklch(0.62 0.13 250)',
    progress: 42,
    resources: 11,
    notes: 9,
    flashcards: 64,
    quizzes: 4,
    lastStudied: 'Yesterday',
    description:
      'Relational modeling, SQL, normalization, transactions, and indexing.',
  },
  {
    id: 'computer-networks',
    name: 'Computer Networks',
    code: 'CS-3015',
    color: 'oklch(0.65 0.15 40)',
    progress: 55,
    resources: 9,
    notes: 8,
    flashcards: 52,
    quizzes: 3,
    lastStudied: '3 days ago',
    description:
      'OSI model, TCP/IP, routing, congestion control, and network security.',
  },
  {
    id: 'linear-algebra',
    name: 'Linear Algebra',
    code: 'MA-2012',
    color: 'oklch(0.6 0.13 300)',
    progress: 81,
    resources: 8,
    notes: 10,
    flashcards: 48,
    quizzes: 6,
    lastStudied: '5 days ago',
    description:
      'Vector spaces, matrices, eigenvalues, and linear transformations.',
  },
  {
    id: 'thermodynamics',
    name: 'Thermodynamics',
    code: 'ME-2201',
    color: 'oklch(0.68 0.12 90)',
    progress: 30,
    resources: 7,
    notes: 5,
    flashcards: 40,
    quizzes: 2,
    lastStudied: '1 week ago',
    description:
      'Laws of thermodynamics, entropy, cycles, and heat engines.',
  },
  {
    id: 'discrete-math',
    name: 'Discrete Mathematics',
    code: 'CS-2011',
    color: 'oklch(0.6 0.1 200)',
    progress: 74,
    resources: 10,
    notes: 11,
    flashcards: 70,
    quizzes: 5,
    lastStudied: '4 days ago',
    description:
      'Logic, set theory, combinatorics, graph theory, and proofs.',
  },
]

export type StudyFile = {
  id: string
  name: string
  type: 'pdf' | 'ppt' | 'doc' | 'image'
  size: string
  subject: string
  status: 'processing' | 'completed' | 'queued'
  progress: number
  uploaded: string
}

export const files: StudyFile[] = [
  {
    id: 'f1',
    name: 'OS_Lecture_09_Deadlocks.pdf',
    type: 'pdf',
    size: '4.2 MB',
    subject: 'Operating Systems',
    status: 'completed',
    progress: 100,
    uploaded: '2 hours ago',
  },
  {
    id: 'f2',
    name: 'Databases_Normalization.pptx',
    type: 'ppt',
    size: '8.1 MB',
    subject: 'Database Systems',
    status: 'processing',
    progress: 62,
    uploaded: '10 minutes ago',
  },
  {
    id: 'f3',
    name: 'Networks_Syllabus_2026.pdf',
    type: 'pdf',
    size: '640 KB',
    subject: 'Computer Networks',
    status: 'completed',
    progress: 100,
    uploaded: 'Yesterday',
  },
  {
    id: 'f4',
    name: 'LinearAlgebra_Notes_Ch4.docx',
    type: 'doc',
    size: '1.1 MB',
    subject: 'Linear Algebra',
    status: 'completed',
    progress: 100,
    uploaded: '2 days ago',
  },
  {
    id: 'f5',
    name: 'Thermo_PastPaper_2024.pdf',
    type: 'pdf',
    size: '2.3 MB',
    subject: 'Thermodynamics',
    status: 'queued',
    progress: 0,
    uploaded: 'Just now',
  },
  {
    id: 'f6',
    name: 'Discrete_Handwritten_Graphs.jpg',
    type: 'image',
    size: '3.4 MB',
    subject: 'Discrete Mathematics',
    status: 'completed',
    progress: 100,
    uploaded: '3 days ago',
  },
]

export type Exam = {
  id: string
  subject: string
  date: string
  daysLeft: number
  readiness: number
}

export const exams: Exam[] = [
  {
    id: 'e1',
    subject: 'Database Systems',
    date: 'Thu, Aug 13',
    daysLeft: 6,
    readiness: 42,
  },
  {
    id: 'e2',
    subject: 'Computer Networks',
    date: 'Mon, Aug 17',
    daysLeft: 10,
    readiness: 55,
  },
  {
    id: 'e3',
    subject: 'Operating Systems',
    date: 'Fri, Aug 21',
    daysLeft: 15,
    readiness: 68,
  },
]

export const recommendations = [
  {
    id: 'r1',
    title: 'Review 12 weak flashcards in Database Systems',
    reason: 'Your exam is in 6 days and readiness is at 42%.',
  },
  {
    id: 'r2',
    title: 'Take the Deadlocks practice quiz',
    reason: 'You just finished the Deadlocks notes in Operating Systems.',
  },
  {
    id: 'r3',
    title: 'Summarize the Normalization slides',
    reason: 'A new file finished processing in Database Systems.',
  },
]

export type Flashcard = {
  id: string
  subject: string
  front: string
  back: string
  due: string
  status: 'new' | 'learning' | 'review'
}

export const flashcards: Flashcard[] = [
  {
    id: 'c1',
    subject: 'Operating Systems',
    front: 'What are the four Coffman conditions for deadlock?',
    back: 'Mutual exclusion, hold and wait, no preemption, and circular wait.',
    due: 'Due today',
    status: 'review',
  },
  {
    id: 'c2',
    subject: 'Database Systems',
    front: 'What does the third normal form (3NF) eliminate?',
    back: 'Transitive dependencies of non-key attributes on the primary key.',
    due: 'Due today',
    status: 'learning',
  },
  {
    id: 'c3',
    subject: 'Computer Networks',
    front: 'Which layer of the OSI model handles routing?',
    back: 'The network layer (Layer 3).',
    due: 'Due tomorrow',
    status: 'review',
  },
  {
    id: 'c4',
    subject: 'Linear Algebra',
    front: 'When is a square matrix invertible?',
    back: 'When its determinant is non-zero, equivalently when its columns are linearly independent.',
    due: 'New',
    status: 'new',
  },
  {
    id: 'c5',
    subject: 'Operating Systems',
    front: 'Difference between a mutex and a semaphore?',
    back: 'A mutex allows one thread at a time; a semaphore is a counter controlling access to a pool of resources.',
    due: 'Due today',
    status: 'review',
  },
]

export type Quiz = {
  id: string
  title: string
  subject: string
  questions: number
  bestScore: number | null
  lastAttempt: string
}

export const quizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Deadlocks & Synchronization',
    subject: 'Operating Systems',
    questions: 12,
    bestScore: 83,
    lastAttempt: '2 days ago',
  },
  {
    id: 'q2',
    title: 'Normalization Forms',
    subject: 'Database Systems',
    questions: 10,
    bestScore: 60,
    lastAttempt: '4 days ago',
  },
  {
    id: 'q3',
    title: 'TCP/IP & Routing',
    subject: 'Computer Networks',
    questions: 15,
    bestScore: null,
    lastAttempt: 'Not attempted',
  },
  {
    id: 'q4',
    title: 'Eigenvalues & Eigenvectors',
    subject: 'Linear Algebra',
    questions: 8,
    bestScore: 91,
    lastAttempt: '1 week ago',
  },
]

export type SampleQuestion = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export const sampleQuiz: SampleQuestion[] = [
  {
    id: 'sq1',
    question:
      'Which of the following is NOT one of the necessary conditions for a deadlock?',
    options: [
      'Mutual exclusion',
      'Preemption',
      'Hold and wait',
      'Circular wait',
    ],
    answer: 1,
    explanation:
      'Deadlock requires NO preemption. If resources could be preempted, the circular wait could be broken.',
  },
  {
    id: 'sq2',
    question: 'What does the Banker\u2019s algorithm guarantee?',
    options: [
      'Maximum CPU utilization',
      'That the system stays in a safe state',
      'Fair scheduling of threads',
      'Minimum memory fragmentation',
    ],
    answer: 1,
    explanation:
      'The Banker\u2019s algorithm only grants a request if the resulting state is still safe, avoiding deadlock.',
  },
  {
    id: 'sq3',
    question: 'A semaphore initialized to 1 behaves like a:',
    options: ['Counting semaphore', 'Binary semaphore / mutex', 'Spinlock only', 'Monitor'],
    answer: 1,
    explanation:
      'A semaphore initialized to 1 allows a single thread at a time, effectively acting as a binary semaphore (mutex).',
  },
]

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: { source: string; location: string }[]
}

export const chatHistory: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content:
      'Explain the difference between a mutex and a semaphore with an example.',
  },
  {
    id: 'm2',
    role: 'assistant',
    content:
      'A mutex (mutual exclusion lock) allows exactly one thread to hold it at a time and is meant for protecting a single shared resource. A semaphore is a counter that permits up to N concurrent accesses, making it suitable for managing a pool of identical resources.\n\nFor example, use a mutex to guard a shared linked list so only one thread mutates it at once. Use a counting semaphore initialized to 5 to limit access to a pool of 5 database connections.',
    citations: [
      { source: 'OS_Lecture_09_Deadlocks.pdf', location: 'Page 42' },
      { source: 'OS_Concurrency_Notes.pdf', location: 'Page 8' },
    ],
  },
]

export const suggestedQuestions = [
  'When would a counting semaphore cause a deadlock?',
  'Show me a code example of the Banker\u2019s algorithm.',
  'Summarize the Coffman conditions in one line each.',
]

export type PlannerTask = {
  id: string
  title: string
  subject: string
  time: string
  done: boolean
  type: 'read' | 'quiz' | 'flashcards' | 'review'
}

export const todayTasks: PlannerTask[] = [
  {
    id: 't1',
    title: 'Read: Deadlock avoidance & the Banker\u2019s algorithm',
    subject: 'Operating Systems',
    time: '9:00 AM',
    done: true,
    type: 'read',
  },
  {
    id: 't2',
    title: 'Review 12 weak flashcards',
    subject: 'Database Systems',
    time: '11:30 AM',
    done: false,
    type: 'flashcards',
  },
  {
    id: 't3',
    title: 'Practice quiz: Normalization Forms',
    subject: 'Database Systems',
    time: '2:00 PM',
    done: false,
    type: 'quiz',
  },
  {
    id: 't4',
    title: 'Summarize routing algorithms',
    subject: 'Computer Networks',
    time: '4:30 PM',
    done: false,
    type: 'review',
  },
]

export const weekSchedule = [
  { day: 'Mon', date: 4, load: 3, active: false },
  { day: 'Tue', date: 5, load: 2, active: false },
  { day: 'Wed', date: 6, load: 4, active: true },
  { day: 'Thu', date: 7, load: 1, active: false },
  { day: 'Fri', date: 8, load: 3, active: false },
  { day: 'Sat', date: 9, load: 2, active: false },
  { day: 'Sun', date: 10, load: 0, active: false },
]

export type Note = {
  id: string
  title: string
  subject: string
  excerpt: string
  tags: string[]
  updated: string
  aiGenerated: boolean
  starred: boolean
}

export const notes: Note[] = [
  {
    id: 'n1',
    title: 'Deadlock Avoidance & the Banker\u2019s Algorithm',
    subject: 'Operating Systems',
    excerpt:
      'The Banker\u2019s algorithm tests for a safe state by simulating allocation of maximum possible resources, then checks if the system can avoid deadlock by finding a safe sequence.',
    tags: ['Deadlocks', 'Scheduling'],
    updated: '2 hours ago',
    aiGenerated: true,
    starred: true,
  },
  {
    id: 'n2',
    title: 'Normalization: 1NF through BCNF',
    subject: 'Database Systems',
    excerpt:
      'Normalization reduces redundancy and dependency by organizing fields and tables. BCNF is a stricter version of 3NF where every determinant is a candidate key.',
    tags: ['Normalization', 'Design'],
    updated: 'Yesterday',
    aiGenerated: true,
    starred: false,
  },
  {
    id: 'n3',
    title: 'TCP Three-Way Handshake',
    subject: 'Computer Networks',
    excerpt:
      'A connection is established via SYN, SYN-ACK, and ACK. Sequence numbers synchronize both endpoints before reliable data transfer begins.',
    tags: ['TCP/IP', 'Transport'],
    updated: '2 days ago',
    aiGenerated: false,
    starred: false,
  },
  {
    id: 'n4',
    title: 'Eigenvalues, Eigenvectors & Diagonalization',
    subject: 'Linear Algebra',
    excerpt:
      'An eigenvector of a matrix A is a non-zero vector v such that Av = \u03bbv. Diagonalization expresses A as PDP\u207b\u00b9 when it has a full set of independent eigenvectors.',
    tags: ['Eigenvalues', 'Matrices'],
    updated: '3 days ago',
    aiGenerated: true,
    starred: true,
  },
  {
    id: 'n5',
    title: 'Carnot Cycle & Thermal Efficiency',
    subject: 'Thermodynamics',
    excerpt:
      'The Carnot cycle is a theoretical, reversible cycle providing the maximum possible efficiency between two heat reservoirs, given by 1 minus the ratio of cold to hot temperatures.',
    tags: ['Cycles', 'Entropy'],
    updated: '5 days ago',
    aiGenerated: false,
    starred: false,
  },
  {
    id: 'n6',
    title: 'Graph Traversal: BFS vs DFS',
    subject: 'Discrete Mathematics',
    excerpt:
      'BFS explores level by level using a queue and finds shortest paths in unweighted graphs. DFS explores as far as possible along each branch using a stack or recursion.',
    tags: ['Graphs', 'Algorithms'],
    updated: '1 week ago',
    aiGenerated: true,
    starred: false,
  },
]

export function getSubject(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id)
}
