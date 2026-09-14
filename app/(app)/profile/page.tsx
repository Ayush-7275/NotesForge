'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { PageHeader } from '@/components/app/primitives'
import { defaultProfile, loadProfile, saveProfile } from '@/lib/profile-store'

export default function ProfilePage() {
  const [name, setName] = useState(defaultProfile.name)
  const [email, setEmail] = useState(defaultProfile.email)
  const [institution, setInstitution] = useState(defaultProfile.institution)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const profile = loadProfile()
    setName(profile.name)
    setEmail(profile.email)
    setInstitution(profile.institution)
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    saveProfile({ name: name.trim(), email: email.trim(), institution: institution.trim() })
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader title="Profile" description="Manage your NoteForge profile." />
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-8">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background">
              {name.trim().slice(0, 2).toUpperCase() || '??'}
            </span>
            <div>
              <h2 className="text-[15px] font-semibold text-foreground">{name || 'Your name'}</h2>
              <p className="text-sm text-muted-foreground">{email || 'your@email.com'}</p>
            </div>
          </div>
          <label className="block text-sm font-medium text-foreground">
            Name
            <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
          </label>
          <label className="block text-sm font-medium text-foreground">
            Email
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
          </label>
          <label className="block text-sm font-medium text-foreground">
            Institution
            <input value={institution} onChange={(event) => setInstitution(event.target.value)} placeholder="Your school or university" className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
          </label>
          <div className="flex items-center gap-3">
            <button type="submit" className="rounded-lg bg-foreground px-4 py-2 text-[13px] font-medium text-background hover:opacity-90">Save changes</button>
            {saved && <span className="text-sm text-brand">Profile saved.</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
