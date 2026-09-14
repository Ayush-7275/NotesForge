'use client'

import Link from 'next/link'
import { useEffect, useState, type FormEvent } from 'react'
import { Plus, FileText, Clock, ArrowRight, X, Trash2 } from 'lucide-react'
import { PageHeader, ProgressBar } from '@/components/app/primitives'
import type { Subject } from '@/lib/mock-data'
import { loadSubjects, saveSubjects } from '@/lib/subjects-store'

const colors = [
  'oklch(0.62 0.14 162)',
  'oklch(0.62 0.13 250)',
  'oklch(0.65 0.15 40)',
  'oklch(0.6 0.13 300)',
]

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => setSubjects(loadSubjects()), [])

  function addSubject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedCode = code.trim()
    if (!trimmedName || !trimmedCode) return

    const subject: Subject = {
      id: `${trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name: trimmedName,
      code: trimmedCode,
      color: colors[subjects.length % colors.length],
      progress: 0,
      resources: 0,
      notes: 0,
      lastStudied: 'Not studied yet',
      description: description.trim() || 'No description added yet.',
    }

    const nextSubjects = [...subjects, subject]
    setSubjects(nextSubjects)
    saveSubjects(nextSubjects)
    setName('')
    setCode('')
    setDescription('')
    setIsFormOpen(false)
  }

  function deleteSubject(id: string) {
    const nextSubjects = subjects.filter((subject) => subject.id !== id)
    setSubjects(nextSubjects)
    saveSubjects(nextSubjects)
  }

  return (
    <div>
      <PageHeader
        title="Subjects"
        description="All your courses in one place."
        actions={
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            <Plus className="size-4" />
            New subject
          </button>
        }
      />

      {isFormOpen && (
        <div className="border-b border-border bg-muted/30 px-4 py-5 sm:px-8">
          <form onSubmit={addSubject} className="mx-auto max-w-6xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Add subject</h2>
              <button type="button" onClick={() => setIsFormOpen(false)} aria-label="Close form">
                <X className="size-4 text-muted-foreground" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Subject name" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
              <input required value={code} onChange={(event) => setCode(event.target.value)} placeholder="Course code" className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
            </div>
            <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description (optional)" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
            <button type="submit" className="rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background">Add subject</button>
          </form>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        {subjects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-14 text-center">
            <h2 className="text-sm font-medium text-foreground">No subjects yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Add your first subject to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <div key={subject.id} className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
                <div className="flex items-start justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg text-[13px] font-semibold text-background" style={{ backgroundColor: subject.color }}>
                    {subject.name.split(' ').slice(0, 2).map((word) => word[0]).join('')}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{subject.code}</span>
                    <button
                      type="button"
                      onClick={() => deleteSubject(subject.id)}
                      className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${subject.name}`}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
                <h2 className="mt-4 text-[15px] font-semibold text-foreground">{subject.name}</h2>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{subject.description}</p>
                <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><FileText className="size-3.5" />{subject.notes} notes</span>
                  <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />{subject.lastStudied}</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <ProgressBar value={subject.progress} color={subject.color} />
                  <span className="w-8 text-right text-[11px] font-medium text-muted-foreground">{subject.progress}%</span>
                </div>
                <Link href={`/subjects/${subject.id}`} className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted">
                  Open subject <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
