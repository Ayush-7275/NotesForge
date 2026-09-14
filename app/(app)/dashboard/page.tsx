import Link from 'next/link'
import {
  Upload,
  FileText,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Clock,
  FileType2,
  Presentation,
  FileImage,
  PlayCircle,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  ProgressBar,
  Badge,
} from '@/components/app/primitives'
import {
  subjects,
  exams,
  files,
  recommendations,
} from '@/lib/mock-data'

const quickActions = [
  { label: 'Upload material', icon: Upload, href: '/uploads' },
  { label: 'Generate notes', icon: FileText, href: '/notes' },
  { label: 'Open AI chat', icon: MessageSquare, href: '/chat' },
]

const fileIcons = {
  pdf: FileType2,
  ppt: Presentation,
  doc: FileText,
  image: FileImage,
}

export default function DashboardPage() {
  const recentSubjects = subjects.slice(0, 4)
  const recentFiles = files.slice(0, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Good afternoon, Jordan
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your course materials and notes organized in one place.
        </p>
      </div>

      {/* Quick actions */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickActions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
          >
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background transition-colors group-hover:border-brand/40">
              <a.icon className="size-4 text-foreground" />
            </span>
            <span className="text-[13px] font-medium text-foreground">
              {a.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Continue studying */}
          <Card>
            <CardHeader title="Continue studying" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Operating Systems
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-foreground">
                    Chapter 4 · Deadlocks &amp; Resource Allocation
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You left off at the Banker&apos;s algorithm.
                  </p>
                </div>
                <Link
                  href="/subjects/operating-systems"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-foreground px-3 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
                >
                  <PlayCircle className="size-4" />
                  Resume
                </Link>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={68} className="flex-1" />
                <span className="text-xs font-medium text-muted-foreground">
                  68%
                </span>
              </div>
            </div>
          </Card>

          {/* Recent subjects */}
          <Card>
            <CardHeader
              title="Recent subjects"
              action={
                <Link
                  href="/subjects"
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all <ArrowRight className="size-3" />
                </Link>
              }
            />
            <div className="divide-y divide-border">
              {recentSubjects.map((s) => (
                <Link
                  key={s.id}
                  href={`/subjects/${s.id}`}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/40"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {s.code} · {s.resources} resources
                    </p>
                  </div>
                  <div className="hidden w-32 items-center gap-2 sm:flex">
                    <ProgressBar value={s.progress} color={s.color} />
                    <span className="w-8 text-right text-[11px] text-muted-foreground">
                      {s.progress}%
                    </span>
                  </div>
                  <span className="hidden text-[11px] text-muted-foreground md:block">
                    {s.lastStudied}
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recently uploaded */}
          <Card>
            <CardHeader
              title="Recently uploaded"
              action={
                <Link
                  href="/uploads"
                  className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  View all <ArrowRight className="size-3" />
                </Link>
              }
            />
            <div className="divide-y divide-border">
              {recentFiles.map((f) => {
                const Icon = fileIcons[f.type]
                return (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <span className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40">
                      <Icon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {f.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {f.subject} · {f.size}
                      </p>
                    </div>
                    {f.status === 'completed' ? (
                      <Badge variant="brand">Ready</Badge>
                    ) : f.status === 'processing' ? (
                      <Badge variant="outline">Processing</Badge>
                    ) : (
                      <Badge>Queued</Badge>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming exams */}
          <Card>
            <CardHeader title="Upcoming exams" />
            <div className="divide-y divide-border">
              {exams.map((e) => (
                <div key={e.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-medium text-foreground">
                      {e.subject}
                    </p>
                    <Badge variant={e.daysLeft <= 6 ? 'warn' : 'outline'}>
                      <Clock className="size-3" />
                      {e.daysLeft}d
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {e.date} · {e.readiness}% ready
                  </p>
                  <ProgressBar value={e.readiness} className="mt-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Study progress */}
          <Card>
            <CardHeader title="Study progress" />
            <div className="p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-foreground">
                  4.5
                </span>
                <span className="text-[12px] text-muted-foreground">
                  hours this week
                </span>
              </div>
              <div className="mt-4 flex items-end gap-1.5">
                {[40, 65, 30, 80, 55, 20, 5].map((h, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-20 w-full items-end">
                      <div
                        className="w-full rounded-t bg-brand/80"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* AI recommendations */}
          <Card>
            <CardHeader
              title="AI recommendations"
              action={<Sparkles className="size-3.5 text-brand" />}
            />
            <div className="divide-y divide-border">
              {recommendations.map((r) => (
                <div key={r.id} className="px-4 py-3">
                  <p className="text-[13px] font-medium text-foreground">
                    {r.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                    {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
