'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  Layers,
  ListChecks,
  CalendarDays,
  Upload,
  Settings,
  ChevronsUpDown,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Subjects', href: '/subjects', icon: BookOpen },
  { label: 'Notes', href: '/notes', icon: FileText },
  { label: 'AI Chat', href: '/chat', icon: MessageSquare },
  { label: 'Flashcards', href: '/flashcards', icon: Layers },
  { label: 'Quizzes', href: '/quizzes', icon: ListChecks },
  { label: 'Study Planner', href: '/planner', icon: CalendarDays },
  { label: 'Uploads', href: '/uploads', icon: Upload },
]

const workspaces = ['Fall Semester 2026', 'Spring Semester 2026', 'Personal']

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const [wsOpen, setWsOpen] = useState(false)
  const [workspace, setWorkspace] = useState(workspaces[0])

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="p-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setWsOpen((v) => !v)}
            className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-background px-2.5 py-2 text-left transition-colors hover:bg-muted"
            aria-expanded={wsOpen}
          >
            <Logo showWordmark={false} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-foreground">
                {workspace}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                NoteForge
              </span>
            </span>
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </button>
          {wsOpen && (
            <div className="absolute inset-x-0 top-full z-20 mt-1 rounded-lg border border-border bg-popover p-1 shadow-md">
              {workspaces.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setWorkspace(w)
                    setWsOpen(false)
                  }}
                  className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted"
                >
                  {w}
                  {w === workspace && <Check className="size-3.5 text-brand" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-3">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors',
                active
                  ? 'bg-background font-medium text-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <item.icon
                className={cn('size-4', active && 'text-brand')}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/settings"
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition-colors',
            pathname === '/settings'
              ? 'bg-background font-medium text-foreground shadow-sm'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          <Settings className="size-4" />
          Settings
        </Link>
      </div>
    </div>
  )
}
