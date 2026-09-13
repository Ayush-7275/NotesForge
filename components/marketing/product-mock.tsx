import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  Layers,
  ListChecks,
  CalendarDays,
  Search,
  Sparkles,
  Send,
  Quote,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

function WindowChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_24px_48px_-24px_rgba(0,0,0,0.18)]">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full border border-border" />
          <span className="size-2.5 rounded-full border border-border" />
          <span className="size-2.5 rounded-full border border-border" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          app.noteforge.com
        </div>
      </div>
      {children}
    </div>
  )
}

const miniNav = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BookOpen, label: 'Subjects' },
  { icon: FileText, label: 'Notes' },
  { icon: MessageSquare, label: 'AI Chat' },
  { icon: Layers, label: 'Flashcards' },
  { icon: ListChecks, label: 'Quizzes' },
  { icon: CalendarDays, label: 'Planner' },
]

function MiniSidebar({ activeLabel = 'Dashboard' }: { activeLabel?: string }) {
  return (
    <aside className="hidden w-44 shrink-0 flex-col border-r border-border bg-sidebar p-3 sm:flex">
      <div className="px-1 pb-3">
        <Logo />
      </div>
      <nav className="flex flex-col gap-0.5">
        {miniNav.map((item) => {
          const active = item.label === activeLabel
          return (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px]',
                active
                  ? 'bg-background font-medium text-foreground shadow-sm'
                  : 'text-muted-foreground',
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

function MiniTopbar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <span className="text-[13px] font-semibold text-foreground">{title}</span>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1.5 rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground md:flex">
          <Search className="size-3" />
          Search
        </div>
        <span className="size-6 rounded-full bg-brand-muted" />
      </div>
    </div>
  )
}

function DashboardBody() {
  return (
    <div className="flex-1 space-y-4 p-5">
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-[11px] font-medium text-muted-foreground">
          Continue studying
        </p>
        <p className="mt-1 text-[13px] font-semibold text-foreground">
          Operating Systems · Chapter 4: Deadlocks
        </p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full w-[68%] rounded-full bg-brand" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Subjects', value: '6' },
          { label: 'Notes', value: '48' },
          { label: 'Cards due', value: '23' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border p-3">
            <p className="text-[18px] font-semibold text-foreground">
              {s.value}
            </p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2 rounded-lg border border-border p-3">
          <p className="text-[11px] font-medium text-foreground">
            Upcoming exams
          </p>
          {['Databases', 'Computer Networks'].map((e) => (
            <div
              key={e}
              className="flex items-center justify-between text-[11px] text-muted-foreground"
            >
              <span>{e}</span>
              <span className="rounded border border-border px-1.5 py-0.5 text-[9px]">
                in 6d
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2 rounded-lg border border-brand/30 bg-brand-muted/40 p-3">
          <p className="flex items-center gap-1 text-[11px] font-medium text-foreground">
            <Sparkles className="size-3 text-brand" />
            AI recommends
          </p>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Review 12 weak flashcards in Databases before Thursday.
          </p>
        </div>
      </div>
    </div>
  )
}

function ChatBody() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4 p-5">
        <div className="flex justify-end">
          <div className="max-w-[75%] rounded-lg rounded-br-sm bg-foreground px-3 py-2 text-[12px] text-background">
            Explain the difference between mutex and semaphore.
          </div>
        </div>
        <div className="max-w-[85%] space-y-2">
          <div className="rounded-lg rounded-bl-sm border border-border bg-muted/30 px-3 py-2 text-[12px] leading-relaxed text-foreground">
            A mutex enforces mutual exclusion for a single resource, while a
            semaphore is a counter that controls access to a pool of resources.
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['OS_Notes.pdf · p.42', 'Lecture_09.pptx'].map((c) => (
              <span
                key={c}
                className="rounded-md border border-brand/30 bg-brand-muted/50 px-1.5 py-0.5 text-[9px] font-medium text-brand"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
          <span className="flex-1 text-[11px] text-muted-foreground">
            Ask anything about Operating Systems…
          </span>
          <Send className="size-3.5 text-brand" />
        </div>
      </div>
    </div>
  )
}

function NotesBody() {
  return (
    <div className="flex-1 space-y-3 p-5">
      <div className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[10px] text-muted-foreground">
        Auto-generated · Operating Systems
      </div>
      <p className="text-[15px] font-semibold text-foreground">
        Deadlocks &amp; Resource Allocation
      </p>
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded bg-border" />
        <div className="h-2 w-[92%] rounded bg-border" />
        <div className="h-2 w-[78%] rounded bg-border" />
      </div>
      <div className="rounded-lg border-l-2 border-brand bg-brand-muted/40 p-3">
        <p className="text-[11px] font-medium text-foreground">
          Coffman conditions
        </p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Mutual exclusion, hold and wait, no preemption, circular wait.
        </p>
      </div>
      <div className="overflow-hidden rounded-md border border-border font-mono text-[10px]">
        <div className="border-b border-border bg-muted/40 px-3 py-1 text-muted-foreground">
          banker.py
        </div>
        <div className="space-y-1 p-3">
          <div className="h-1.5 w-[60%] rounded bg-border" />
          <div className="h-1.5 w-[80%] rounded bg-border" />
          <div className="h-1.5 w-[45%] rounded bg-border" />
        </div>
      </div>
    </div>
  )
}

export function ProductMock({
  variant = 'dashboard',
  className,
}: {
  variant?: 'dashboard' | 'chat' | 'notes'
  className?: string
}) {
  const titleMap = {
    dashboard: 'Dashboard',
    chat: 'AI Chat',
    notes: 'Notes',
  }
  const navMap = {
    dashboard: 'Dashboard',
    chat: 'AI Chat',
    notes: 'Notes',
  }
  return (
    <div className={cn('w-full', className)}>
      <WindowChrome>
        <div className="flex min-h-[380px]">
          <MiniSidebar activeLabel={navMap[variant]} />
          <div className="flex min-w-0 flex-1 flex-col">
            <MiniTopbar title={titleMap[variant]} />
            {variant === 'dashboard' && <DashboardBody />}
            {variant === 'chat' && <ChatBody />}
            {variant === 'notes' && <NotesBody />}
          </div>
        </div>
      </WindowChrome>
    </div>
  )
}
