'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  MessageSquare,
  Upload,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Subjects', href: '/subjects', icon: BookOpen },
  { label: 'Notes', href: '/notes', icon: FileText },
  { label: 'AI Chat', href: '/chat', icon: MessageSquare },
  { label: 'Uploads', href: '/uploads', icon: Upload },
]

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
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
