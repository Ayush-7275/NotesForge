import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'

const columns = [
  {
    title: 'Product',
    links: ['Features', 'How it works', 'AI chat', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Guides', 'Blog', 'Help center', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Privacy', 'Terms'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Start studying smarter today
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload your first subject and see your notes organize themselves.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The AI study platform that turns your material into understanding.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium text-foreground">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} NoteForge. All rights reserved.</span>
          <span>Made for students.</span>
        </div>
      </div>
    </footer>
  )
}
