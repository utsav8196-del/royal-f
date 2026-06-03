const ENV_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const ENV_API_BASE = ENV_API_URL.replace(/\/api\/?$/, '') || 'http://localhost:5000'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

/**
 * API origin for the current device. When the site is opened via LAN IP on a phone
 * but VITE_API_URL still points at localhost, use the same host as the page.
 */
export function getApiBase(): string {
  if (typeof window === 'undefined') return ENV_API_BASE

  try {
    const env = new URL(ENV_API_BASE)
    const pageHost = window.location.hostname
    const envIsLocal = LOCAL_HOSTS.has(env.hostname)
    const pageIsRemote = !LOCAL_HOSTS.has(pageHost)

    if (envIsLocal && pageIsRemote) {
      const port = env.port || '5000'
      return `${window.location.protocol}//${pageHost}:${port}`
    }
  } catch {
    /* use env default */
  }

  return ENV_API_BASE
}

export function getApiUrl(): string {
  return `${getApiBase()}/api`
}

/** Static env value (may not match phone/LAN); prefer getApiBase() for images */
export const ENV_API_BASE_EXPORT = ENV_API_BASE
