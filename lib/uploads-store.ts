export type StudyFile = {
  id: string
  name: string
  type: 'pdf' | 'ppt' | 'doc' | 'image'
  size: string
  subject: string
  status: 'completed'
  progress: 100
  uploaded: string
}

export const UPLOADS_STORAGE_KEY = 'noteforge-uploads'

export function loadUploads(): StudyFile[] {
  if (typeof window === 'undefined') return []

  const stored = window.localStorage.getItem(UPLOADS_STORAGE_KEY)
  if (!stored) return []

  try {
    const parsed: unknown = JSON.parse(stored)
    return Array.isArray(parsed) ? (parsed as StudyFile[]) : []
  } catch {
    return []
  }
}

export function saveUploads(files: StudyFile[]) {
  window.localStorage.setItem(UPLOADS_STORAGE_KEY, JSON.stringify(files))
}
