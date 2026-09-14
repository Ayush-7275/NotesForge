export type Subject = {
  id: string
  name: string
  code: string
  color: string
  progress: number
  resources: number
  notes: number
  lastStudied: string
  description: string
}

export const subjects: Subject[] = []

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
    title: 'Summarize the Normalization slides',
    reason: 'A new file finished processing in Database Systems.',
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
