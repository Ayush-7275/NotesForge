'use server'

import { auth } from '@/lib/auth/server'
import { redirect } from 'next/navigation'

export type AuthFormState = { error?: string } | null

export async function signUpWithEmail(_previousState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  if (!name || !email || !password) return { error: 'Name, email, and password are required.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters long.' }
  const { error } = await auth.signUp.email({ name, email, password })
  if (error) return { error: error.message || 'Unable to create your account.' }
  redirect('/dashboard')
}
