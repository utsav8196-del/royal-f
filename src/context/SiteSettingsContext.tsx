import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { api } from '@/lib/api'

export interface SiteSettings {
  siteName?: string
  tagline?: string
  phone?: string
  email?: string
  address?: string
  workingHours?: string
  heroTitle?: string
  heroSubtitle?: string
  logoUrl?: string
  justDialUrl?: string
  [key: string]: unknown
}

const defaults: SiteSettings = {
  siteName: 'Royal Academy',
  tagline: 'Empowering students since 2008.',
  phone: '+91 9876543210',
  email: 'info@royalacademy.com',
  address: 'Near Shanti Multispeciality Hospital, Triveni Society, Rajkot, Gujarat',
  workingHours: 'Mon – Sat : 8 AM – 8 PM',
  logoUrl: '/logo.png',
  justDialUrl:
    'https://www.justdial.com/Rajkot/Royal-Academy-Near-Shanti-Multispeciality-Hospital-Triveni-Society/0281PX281-X281-220715102554-P1X7_BZDET',
}

const SiteSettingsContext = createContext<SiteSettings>(defaults)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults)

  const load = useCallback(() => {
    api
      .get<SiteSettings>('/settings')
      .then((res) => setSettings({ ...defaults, ...res.data }))
      .catch(() => {})
  }, [])

  useEffect(() => {
    load()
    window.addEventListener('site-settings-updated', load)
    return () => window.removeEventListener('site-settings-updated', load)
  }, [load])

  return (
    <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
