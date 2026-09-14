export type Profile = {
  name: string
  email: string
  institution: string
}

export const defaultProfile: Profile = {
  name: 'Jordan Silva',
  email: 'jordan@university.edu',
  institution: '',
}

const PROFILE_STORAGE_KEY = 'noteforge-profile'

export function loadProfile(): Profile {
  if (typeof window === 'undefined') return defaultProfile

  const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY)
  if (!stored) return defaultProfile

  try {
    const parsed: unknown = JSON.parse(stored)
    if (!parsed || typeof parsed !== 'object') return defaultProfile
    const profile = parsed as Partial<Profile>
    return {
      name: profile.name || defaultProfile.name,
      email: profile.email || defaultProfile.email,
      institution: profile.institution || '',
    }
  } catch {
    return defaultProfile
  }
}

export function saveProfile(profile: Profile) {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event('noteforge-profile-updated'))
}
