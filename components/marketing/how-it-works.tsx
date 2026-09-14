import { ProductMock } from '@/components/marketing/product-mock'

const steps = [
  {
    step: 'Step 1',
    title: 'Upload your material',
    body: 'Drop in your syllabus, lecture slides, PDFs, handwritten notes, and past papers. NoteForge parses and indexes everything.',
  },
  {
    step: 'Step 2',
    title: 'Let AI organize it',
    body: 'Each subject is structured into summaries and notes — with citations back to the source.',
  },
  {
    step: 'Step 3',
    title: 'Study and ask questions',
    body: 'Review your notes and chat with your documents whenever something is unclear.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">How it works</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From scattered files to a study plan in minutes
          </h2>
        </div>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          <ol className="space-y-8">
            {steps.map((s) => (
              <li key={s.step} className="flex gap-4">
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-medium text-muted-foreground">
                  {s.step.split(' ')[1]}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <ProductMock variant="notes" />
        </div>
      </div>
    </section>
  )
}
