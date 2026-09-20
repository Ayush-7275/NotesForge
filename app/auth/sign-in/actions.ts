'use server'

import { auth } from '@/lib/auth/server'
import { redirect } from 'next/navigation'
import type { AuthFormState } from '../sign-up/actions'

export async function signInWithEmail(_previousState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email and password are required.' }
  const { error } = await auth.signIn.email({ email, password })
  if (error) return { error: error.message || 'Unable to sign in with those credentials.' }
  redirect('/dashboard')
}
