'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Upload,
  FileText,
  MessageSquare,
  ArrowRight,
  FileType2,
  Presentation,
  FileImage,
} from 'lucide-react'
import { Card, CardHeader, ProgressBar, Badge } from '@/components/app/primitives'
import type { Subject } from '@/lib/mock-data'
import { loadSubjects } from '@/lib/subjects-store'
import { loadUploads, type StudyFile } from '@/lib/uploads-store'

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

export default function DashboardContent({ userName }: { userName: string }) {
  const [recentSubjects, setRecentSubjects] = useState<Subject[]>([])
  const [recentFiles, setRecentFiles] = useState<StudyFile[]>([])

  useEffect(() => {
    setRecentSubjects(loadSubjects().slice(0, 4))
    setRecentFiles(loadUploads().slice(0, 4))
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Good afternoon, {userName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your course materials and notes organized in one place.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/20 hover:bg-muted/40"
          >
            <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-background group-hover:border-brand/40">
              <action.icon className="size-4 text-foreground" />
            </span>
            <span className="text-[13px] font-medium text-foreground">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Recent subjects"
            action={
              <Link
                href="/subjects"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            }
          />
          {recentSubjects.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              No subjects yet. Add one from the Subjects page.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentSubjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.id}`}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-muted/40"
                >
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: subject.color }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-foreground">
                      {subject.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {subject.code} · {subject.resources} resources
                    </p>
                  </div>
                  <div className="hidden w-32 items-center gap-2 sm:flex">
                    <ProgressBar value={subject.progress} color={subject.color} />
                    <span className="w-8 text-right text-[11px] text-muted-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader
            title="Recently uploaded"
            action={
              <Link
                href="/uploads"
                className="inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground hover:text-foreground"
              >
                View all <ArrowRight className="size-3" />
              </Link>
            }
          />
          {recentFiles.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted-foreground">
              No files uploaded yet. Upload course material to see it here.
            </p>
          ) : (
            <div className="divide-y divide-border">
              {recentFiles.map((file) => {
                const Icon = fileIcons[file.type]
                return (
                  <div key={file.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40">
                      <Icon className="size-4 text-muted-foreground" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-medium text-foreground">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {file.subject} · {file.size}
                      </p>
                    </div>
                    <Badge variant="brand">Ready</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
