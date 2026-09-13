'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Presentation,
  FileType2,
  Layers,
  ListChecks,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Download,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardHeader, ProgressBar, Badge } from '@/components/app/primitives'
import type { Subject } from '@/lib/mock-data'
import { flashcards, quizzes } from '@/lib/mock-data'

const tabs = [
  'Overview',
  'Notes',
  'PPTs',
  'PDFs',
  'Flashcards',
  'Quizzes',
  'AI Chat',
] as const

type Tab = (typeof tabs)[number]

const noteDocs = [
  { title: 'Processes & Threads', pages: 8, updated: '2 days ago' },
  { title: 'CPU Scheduling Algorithms', pages: 12, updated: '3 days ago' },
  { title: 'Deadlocks & Resource Allocation', pages: 10, updated: '2 hours ago' },
  { title: 'Memory Management & Paging', pages: 14, updated: '5 days ago' },
]

const pptFiles = [
  { name: 'Lecture_07_Scheduling.pptx', size: '6.4 MB', slides: 38 },
  { name: 'Lecture_09_Deadlocks.pptx', size: '8.1 MB', slides: 45 },
]

const pdfFiles = [
  { name: 'OS_Textbook_Ch4.pdf', size: '12.2 MB', pages: 42 },
  { name: 'OS_PastPaper_2024.pdf', size: '2.3 MB', pages: 8 },
  { name: 'Concurrency_Cheatsheet.pdf', size: '640 KB', pages: 2 },
]

export function SubjectWorkspace({ subject }: { subject: Subject }) {
  const [active, setActive] = useState<Tab>('Overview')
  const subjectCards = flashcards.filter((c) => c.subject === subject.name)
  const subjectQuizzes = quizzes.filter((q) => q.subject === subject.name)

  return (
    <div>
      {/* Subject header */}
      <div className="border-b border-border px-4 py-5 sm:px-8 sm:py-6">
        <Link
          href="/subjects"
          className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Subjects
        </Link>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-lg text-sm font-semibold text-background"
              style={{ backgroundColor: subject.color }}
            >
              {subject.name
                .split(' ')
                .slice(0, 2)
                .map((w) => w[0])
                .join('')}
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground">
                {subject.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {subject.code} · {subject.resources} resources · last studied{' '}
                {subject.lastStudied}
              </p>
            </div>
          </div>
          <div className="hidden w-40 flex-col items-end gap-1.5 sm:flex">
            <span className="text-[12px] font-medium text-muted-foreground">
              {subject.progress}% complete
            </span>
            <ProgressBar value={subject.progress} color={subject.color} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-14 z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="flex gap-1 overflow-x-auto px-2 sm:px-6">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={cn(
                'relative shrink-0 px-3 py-3 text-[13px] font-medium transition-colors',
                active === t
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
              {active === t && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-foreground" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8">
        {active === 'Overview' && <OverviewTab subject={subject} />}
        {active === 'Notes' && <NotesTab />}
        {active === 'PPTs' && <FilesTab files={pptFiles} kind="ppt" />}
        {active === 'PDFs' && <FilesTab files={pdfFiles} kind="pdf" />}
        {active === 'Flashcards' && <CardsTab cards={subjectCards} />}
        {active === 'Quizzes' && <QuizzesTab quizzes={subjectQuizzes} />}
        {active === 'AI Chat' && <ChatTab subject={subject.name} />}
      </div>
    </div>
  )
}

function OverviewTab({ subject }: { subject: Subject }) {
  const stats = [
    { label: 'Notes', value: subject.notes, icon: FileText },
    { label: 'Flashcards', value: subject.flashcards, icon: Layers },
    { label: 'Quizzes', value: subject.quizzes, icon: ListChecks },
    { label: 'Resources', value: subject.resources, icon: FileType2 },
  ]
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border p-4">
            <s.icon className="size-4 text-muted-foreground" />
            <p className="mt-3 text-xl font-semibold text-foreground">
              {s.value}
            </p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader
          title="AI summary"
          action={<Sparkles className="size-3.5 text-brand" />}
        />
        <div className="space-y-3 p-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            {subject.description} This course builds from foundational concepts
            toward applied problem-solving, with an emphasis on exam-style
            questions.
          </p>
          <div className="rounded-lg border-l-2 border-brand bg-brand-muted/40 p-3">
            <p className="text-[12px] font-medium text-foreground">
              Focus next
            </p>
            <p className="mt-0.5 text-[13px]">
              Your weakest topic is deadlock avoidance. Review the Banker&apos;s
              algorithm notes and take the practice quiz.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function NotesTab() {
  return (
    <div className="space-y-3">
      {noteDocs.map((n) => (
        <Link
          key={n.title}
          href="/notes"
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-border">
            <FileText className="size-4 text-foreground" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium text-foreground">{n.title}</p>
            <p className="text-[11px] text-muted-foreground">
              {n.pages} pages · updated {n.updated}
            </p>
          </div>
          <Badge variant="brand">
            <Sparkles className="size-3" />
            AI
          </Badge>
          <ArrowRight className="size-4 text-muted-foreground" />
        </Link>
      ))}
    </div>
  )
}

function FilesTab({
  files,
  kind,
}: {
  files: { name: string; size: string; slides?: number; pages?: number }[]
  kind: 'ppt' | 'pdf'
}) {
  const Icon = kind === 'ppt' ? Presentation : FileType2
  return (
    <div className="space-y-3">
      {files.map((f) => (
        <div
          key={f.name}
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-border">
            <Icon className="size-4 text-muted-foreground" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-foreground">
              {f.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {f.size} · {f.slides ? `${f.slides} slides` : `${f.pages} pages`}
            </p>
          </div>
          <button className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Download className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

function CardsTab({ cards }: { cards: typeof flashcards }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {cards.length} cards · {cards.filter((c) => c.due.includes('today')).length}{' '}
          due today
        </p>
        <Link
          href="/flashcards"
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Start review
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((c) => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-4">
            <div className="mb-2 flex items-center justify-between">
              <Badge variant={c.status === 'review' ? 'brand' : 'outline'}>
                {c.status}
              </Badge>
              <span className="text-[11px] text-muted-foreground">{c.due}</span>
            </div>
            <p className="text-[14px] font-medium text-foreground">{c.front}</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              {c.back}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuizzesTab({ quizzes }: { quizzes: typeof quizzes }) {
  return (
    <div className="space-y-3">
      {quizzes.map((q) => (
        <div
          key={q.id}
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
        >
          <span className="flex size-9 items-center justify-center rounded-lg border border-border">
            <ListChecks className="size-4 text-foreground" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-medium text-foreground">{q.title}</p>
            <p className="text-[11px] text-muted-foreground">
              {q.questions} questions ·{' '}
              {q.bestScore !== null ? `best ${q.bestScore}%` : 'not attempted'}
            </p>
          </div>
          <Link
            href="/quizzes"
            className="rounded-lg border border-border px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            {q.bestScore !== null ? 'Retake' : 'Start'}
          </Link>
        </div>
      ))}
    </div>
  )
}

function ChatTab({ subject }: { subject: string }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader title={`Chat · ${subject}`} />
      <div className="space-y-4 p-4">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg rounded-br-sm bg-foreground px-3 py-2 text-[13px] text-background">
            What are the four Coffman conditions?
          </div>
        </div>
        <div className="max-w-[85%] space-y-2">
          <div className="rounded-lg rounded-bl-sm border border-border bg-muted/40 px-3 py-2 text-[13px] leading-relaxed text-foreground">
            The four Coffman conditions for deadlock are mutual exclusion, hold
            and wait, no preemption, and circular wait. All four must hold
            simultaneously for a deadlock to occur.
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="brand">OS_Lecture_09.pdf · p.44</Badge>
          </div>
        </div>
        <Link
          href="/chat"
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted"
        >
          <MessageSquare className="size-4" />
          Continue in full AI Chat
          <ArrowRight className="ml-auto size-4" />
        </Link>
      </div>
    </Card>
  )
}
