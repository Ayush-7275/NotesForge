'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Bell, Menu, X, LogOut, User } from 'lucide-react'
import { AppSidebar } from '@/components/app/app-sidebar'
import { defaultProfile, loadProfile, type Profile } from '@/lib/profile-store'

export function AppTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profile, setProfile] = useState<Profile>(defaultProfile)

  useEffect(() => {
    const updateProfile = () => setProfile(loadProfile())
    updateProfile()
    window.addEventListener('noteforge-profile-updated', updateProfile)
    return () => window.removeEventListener('noteforge-profile-updated', updateProfile)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search subjects, notes, files…"
            className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-16 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:bg-background"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:flex">
            ⌘K
          </kbd>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5 sm:flex-none">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setNotifOpen((v) => !v)
                setProfileOpen(false)
              }}
              className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="size-[18px]" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-40 mt-1.5 w-80 rounded-lg border border-border bg-popover p-1 shadow-md">
                <p className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Notifications
                </p>
                {[
                  {
                    t: 'Normalization.pptx finished processing',
                    s: 'Database Systems · 10 min ago',
                  },
                  {
                    t: 'Your uploaded material is ready',
                    s: 'Database Systems · 1 hour ago',
                  },
                  {
                    t: 'Databases exam in 6 days',
                    s: 'Study plan updated · 3 hours ago',
                  },
                ].map((n) => (
                  <div
                    key={n.t}
                    className="rounded-md px-3 py-2 transition-colors hover:bg-muted"
                  >
                    <p className="text-[13px] text-foreground">{n.t}</p>
                    <p className="text-[11px] text-muted-foreground">{n.s}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((v) => !v)
                setNotifOpen(false)
              }}
              className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-muted"
              aria-label="Account menu"
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
                {profile.name.slice(0, 2).toUpperCase()}
              </span>
              <span className="hidden text-[13px] font-medium text-foreground sm:block">
                {profile.name}
              </span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-40 mt-1.5 w-56 rounded-lg border border-border bg-popover p-1 shadow-md">
                <div className="px-3 py-2">
                  <p className="text-[13px] font-medium text-foreground">
                    {profile.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {profile.email}
                  </p>
                </div>
                <div className="my-1 h-px bg-border" />
                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted"
                >
                  <User className="size-4 text-muted-foreground" />
                  Profile
                </Link>
                <div className="my-1 h-px bg-border" />
                <Link
                  href="/"
                  className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-[13px] text-foreground transition-colors hover:bg-muted"
                >
                  <LogOut className="size-4 text-muted-foreground" />
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 border-r border-border bg-sidebar">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-2 top-3 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="Close navigation"
            >
              <X className="size-4" />
            </button>
            <AppSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {(profileOpen || notifOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setProfileOpen(false)
            setNotifOpen(false)
          }}
        />
      )}
    </>
  )
}
