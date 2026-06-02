import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/lib/api'

export interface SiteSettings {
  siteName?: string
  tagline?: string
  phone?: string
  email?: string
  address?: string
  heroTitle?: string
  heroSubtitle?: string
  logoUrl?: string
  justDialUrl?: string
  [key: string]: unknown
}

const defaults: SiteSettings = {
  siteName: 'Royal Academy',
  logoUrl: '/logo.png',
  justDialUrl:
    'https://www.justdial.com/Rajkot/Royal-Academy-Near-Shanti-Multispeciality-Hospital-Triveni-Society/0281PX281-X281-220715102554-P1X7_BZDET',
}

const SiteSettingsContext = createContext<SiteSettings>(defaults)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaults)

  useEffect(() => {
    const load = () => {
      api
        .get<SiteSettings>('/settings')
        .then((res) => setSettings({ ...defaults, ...res.data }))
        .catch(() => {})
    }
    load()
    window.addEventListener('site-settings-updated', load)
    return () => window.removeEventListener('site-settings-updated', load)
  }, [])

  return (
    <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
