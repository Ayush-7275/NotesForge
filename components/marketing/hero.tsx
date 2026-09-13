import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { ProductMock } from '@/components/marketing/product-mock'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          Now with RAG-powered chat over your own documents
        </div>
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Study smarter. Not harder.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Upload your syllabus, lecture slides, PDFs, and notes. NoteForge
          organizes everything into summaries, quizzes, flashcards, and a
          personal AI study assistant.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Play className="size-3.5" />
            View demo
          </a>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Free while you study · No credit card required
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-20">
        <ProductMock variant="dashboard" />
      </div>
    </section>
  )
}
