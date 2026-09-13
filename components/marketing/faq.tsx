'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: 'What file types can I upload?',
    a: 'PDFs, PowerPoint slides, Word documents, images of handwritten notes, and plain text. NoteForge parses and indexes each one automatically.',
  },
  {
    q: 'How does the AI avoid making things up?',
    a: 'The assistant uses retrieval-augmented generation, so it only answers from the documents you upload and cites the exact source page or slide for every claim.',
  },
  {
    q: 'Is my material private?',
    a: 'Your uploads belong to you. They are used only to power your own study workspace and are never shared with other users.',
  },
  {
    q: 'Can I use it for any subject?',
    a: 'Yes. NoteForge works across engineering, sciences, humanities, and professional courses — anything you have study material for.',
  },
  {
    q: 'Do I need to organize my files first?',
    a: 'No. Just upload everything for a subject and NoteForge structures it into notes, summaries, flashcards, and quizzes for you.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-medium text-brand">FAQ</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-foreground">
                    {f.q}
                  </span>
                  {isOpen ? (
                    <Minus className="size-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                <div
                  className={cn(
                    'grid overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all',
                    isOpen
                      ? 'grid-rows-[1fr] pb-5 opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <p className="min-h-0">{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
