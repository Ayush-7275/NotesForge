'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { signUpWithEmail, type AuthFormState } from './actions'

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState<AuthFormState, FormData>(signUpWithEmail, null)
  return (
    <section className="rounded-xl border border-border bg-background p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Start organizing your courses with NoteForge.</p>
      <form action={formAction} className="mt-6 space-y-4">
        <label className="block text-sm font-medium">Name<input name="name" type="text" required autoComplete="name" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="block text-sm font-medium">Email<input name="email" type="email" required autoComplete="email" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        <label className="block text-sm font-medium">Password<input name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-ring" /></label>
        {state?.error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>}
        <button type="submit" disabled={isPending} className="h-10 w-full rounded-lg bg-foreground text-sm font-medium text-background disabled:opacity-60">{isPending ? 'Creating account…' : 'Create account'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link href="/auth/sign-in" className="font-medium text-foreground underline underline-offset-4">Sign in</Link></p>
    </section>
  )
}
