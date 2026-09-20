'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signInWithEmail } from './actions'
import type { AuthFormState } from '../sign-up/actions'

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(signInWithEmail, null)
  return (
    <section className="rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your workspace.</p>
      <form action={formAction} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="block text-sm font-medium">Password<input name="password" type="password" required autoComplete="current-password" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        {state?.error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>}
        <button type="submit" disabled={isPending} className="h-10 w-full rounded-lg bg-foreground text-sm font-medium text-background disabled:opacity-60">{isPending ? 'Signing in…' : 'Sign in'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Don&apos;t have an account? <Link href="/auth/sign-up" className="font-medium text-foreground underline underline-offset-4">Create one</Link></p>
    </section>
  )
}
