const testimonials = [
  {
    quote:
      'I uploaded a semester of lecture slides and had organized notes the same evening. It changed how I revise.',
    name: 'Ananya R.',
    role: 'Computer Science, 3rd year',
  },
  {
    quote:
      'The chat cites the exact slide, so I trust the answers. It feels like a TA that read all my material.',
    name: 'Marcus L.',
    role: 'Electrical Engineering',
  },
  {
    quote:
      'The weekly study plan kept me on track through finals. I stopped guessing what to study next.',
    name: 'Priya S.',
    role: 'Biotechnology',
  },
  {
    quote:
      'Notes generated from my own material helped me catch gaps I did not know I had. Grades went up a full letter.',
    name: 'Daniel K.',
    role: 'Mechanical Engineering',
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand">Loved by students</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for the way students actually study
          </h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between bg-background p-6"
            >
              <blockquote className="text-[15px] leading-relaxed text-foreground">
                {'“'}
                {t.quote}
                {'”'}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
