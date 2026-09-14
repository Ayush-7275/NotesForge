import {
  FileText,
  MessageSquare,
  Upload,
} from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Organized notes & summaries',
    body: 'Turn dense lecture slides and PDFs into clean, readable notes with headings, tables, callouts, and code blocks.',
  },
  {
    icon: MessageSquare,
    title: 'Chat with your documents',
    body: 'Ask questions and get answers grounded in your uploads, with citations back to the exact page and slide.',
  },
  {
    icon: Upload,
    title: 'Any material, one place',
    body: 'Syllabi, slides, PDFs, notes, and past papers — uploaded, processed, and searchable in one workspace.',
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">Features</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything you need to actually learn the material
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            NoteForge handles the busywork of studying so you can spend your
            time understanding, not organizing.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="bg-background p-6">
              <div className="flex size-9 items-center justify-center rounded-lg border border-border">
                <f.icon className="size-4 text-foreground" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
