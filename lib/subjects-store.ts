import type { Subject } from '@/lib/mock-data'

export const SUBJECTS_STORAGE_KEY = 'noteforge-subjects'

export function loadSubjects(): Subject[] {
  if (typeof window === 'undefined') return []

  const stored = window.localStorage.getItem(SUBJECTS_STORAGE_KEY)
  if (!stored) return []

  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? (parsed as Subject[]) : []
  } catch {
    return []
  }
}

export function saveSubjects(subjects: Subject[]) {
  window.localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects))
}
