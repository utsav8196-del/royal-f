import { getApiBase } from '@/lib/apiBase'

/** Inline SVG — works offline and on every browser without extra requests */
export const IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='system-ui,sans-serif' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E"

export const DEFAULT_PROFILE_IMAGE = '/default-profile.jpg'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0'])

/**
 * Prefer relative paths in the database so any client can resolve against the API host.
 */
export function normalizeImageUrlForStorage(url: string): string {
  const trimmed = url?.trim()
  if (!trimmed) return ''

  if (trimmed.includes('res.cloudinary.com')) {
    return cloudinaryDeliveryUrl(trimmed)
  }

  if (trimmed.startsWith('/uploads/') || trimmed.startsWith('/logo')) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed)
    if (parsed.pathname.startsWith('/uploads/')) {
      return `${parsed.pathname}${parsed.search}`
    }
  } catch {
    /* not absolute */
  }

  return trimmed
}

/**
 * Turn stored paths / legacy localhost URLs into a URL the current device can load.
 */
export function resolveImageUrl(url?: string | null, fallback = IMAGE_PLACEHOLDER): string {
  const trimmed = url?.trim()
  if (!trimmed) return fallback

  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  if (trimmed.startsWith('/') && !trimmed.startsWith('/uploads')) {
    return trimmed
  }

  if (trimmed.includes('res.cloudinary.com')) {
    return cloudinaryDeliveryUrl(trimmed)
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return rewriteLocalApiHost(trimmed)
  }

  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return `${getApiBase()}${path}`
}

function rewriteLocalApiHost(absoluteUrl: string): string {
  try {
    const parsed = new URL(absoluteUrl)
    if (!LOCAL_HOSTS.has(parsed.hostname)) {
      return absoluteUrl
    }
    const base = getApiBase()
    return `${base}${parsed.pathname}${parsed.search}`
  } catch {
    return absoluteUrl
  }
}

/** JPEG + auto quality — widely supported (older phones, Safari, embedded WebViews) */
export function cloudinaryDeliveryUrl(url: string): string {
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) {
    return url
  }

  const segment = '/image/upload/'
  const index = url.indexOf(segment)
  const prefix = url.slice(0, index + segment.length)
  const suffix = url.slice(index + segment.length)

  if (/^(f_|q_|c_|w_|h_|g_|e_|b_)/.test(suffix)) {
    return url
  }

  return `${prefix}f_jpg,q_auto/${suffix}`
}
