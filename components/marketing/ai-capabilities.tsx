import { ProductMock } from '@/components/marketing/product-mock'

const points = [
  {
    title: 'Answers grounded in your material',
    body: 'Retrieval-augmented generation keeps every response tied to what you actually uploaded — no hallucinated facts.',
  },
  {
    title: 'Citations you can verify',
    body: 'Each answer links back to the exact PDF page or slide, so you always know where it came from.',
  },
  {
    title: 'Follow-up suggestions',
    body: 'NoteForge proposes the next question to ask, helping you go deeper without losing the thread.',
  },
]

export function AICapabilities() {
  return (
    <section id="ai" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ProductMock variant="chat" />
          </div>
          <div className="order-1 lg:order-2 lg:pl-6">
            <p className="text-sm font-medium text-brand">AI capabilities</p>
            <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A study assistant that actually knows your syllabus
            </h2>
            <div className="mt-8 space-y-6">
              {points.map((p) => (
                <div
                  key={p.title}
                  className="border-l border-border pl-4"
                >
                  <h3 className="text-[15px] font-semibold text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
