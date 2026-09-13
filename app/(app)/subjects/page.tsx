import Link from 'next/link'
import { Plus, FileText, Layers, Clock, ArrowRight } from 'lucide-react'
import { PageHeader, ProgressBar } from '@/components/app/primitives'
import { subjects } from '@/lib/mock-data'

export default function SubjectsPage() {
  return (
    <div>
      <PageHeader
        title="Subjects"
        description="All your courses in one place."
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90">
            <Plus className="size-4" />
            New subject
          </button>
        }
      />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <div
              key={s.id}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex size-9 items-center justify-center rounded-lg text-[13px] font-semibold text-background"
                  style={{ backgroundColor: s.color }}
                >
                  {s.name
                    .split(' ')
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('')}
                </span>
                <span className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {s.code}
                </span>
              </div>
              <h2 className="mt-4 text-[15px] font-semibold text-foreground">
                {s.name}
              </h2>
              <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <FileText className="size-3.5" />
                  {s.notes} notes
                </span>
                <span className="inline-flex items-center gap-1">
                  <Layers className="size-3.5" />
                  {s.flashcards} cards
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {s.lastStudied}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={s.progress} color={s.color} />
                <span className="w-8 text-right text-[11px] font-medium text-muted-foreground">
                  {s.progress}%
                </span>
              </div>

              <Link
                href={`/subjects/${s.id}`}
                className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
              >
                Open subject
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
