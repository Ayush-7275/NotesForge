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

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: { source: string; location: string }[]
}

export function getSubject(id: string): Subject | undefined {
  return subjects.find((subject) => subject.id === id)
}
