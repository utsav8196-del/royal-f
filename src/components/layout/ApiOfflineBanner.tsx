import { useEffect, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { getApiUrl } from '@/lib/apiBase'

type ApiStatus = 'ok' | 'server_down' | 'db_down'

export default function ApiOfflineBanner() {
  const [status, setStatus] = useState<ApiStatus | null>(null)

  useEffect(() => {
    let cancelled = false

    const check = async () => {
      try {
        const res = await fetch(`${getApiUrl()}/health`, { signal: AbortSignal.timeout(4000) })
        const data = await res.json().catch(() => ({}))
        if (cancelled) return
        if (res.ok && data.database === 'connected') {
          setStatus('ok')
        } else if (res.status === 503 || data.database === 'disconnected') {
          setStatus('db_down')
        } else {
          setStatus('server_down')
        }
      } catch {
        if (!cancelled) setStatus('server_down')
      }
    }

    check()
    const id = setInterval(check, 15000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  if (!status || status === 'ok') return null

  const isDb = status === 'db_down'

  return (
    <div
      role="alert"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto flex max-w-lg items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950 shadow-lg md:left-auto md:right-4"
    >
      <AlertCircle className="mt-0.5 shrink-0" size={18} />
      <div>
        <p className="font-semibold">
          {isDb ? 'Database not connected' : 'API server is not running'}
        </p>
        <p className="mt-1 text-amber-900/90">
          {isDb ? (
            <>
              MongoDB Atlas blocked the connection. In{' '}
              <a
                href="https://cloud.mongodb.com/v2#/security/network/whitelist"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline"
              >
                Atlas → Network Access
              </a>
              , add <strong>Allow Access from Anywhere</strong> (0.0.0.0/0), wait 2 minutes, then restart{' '}
              <code className="rounded bg-amber-100 px-1">npm run dev</code> in <code className="rounded bg-amber-100 px-1">server</code>.
            </>
          ) : (
            <>
              Start the backend:{' '}
              <code className="rounded bg-amber-100 px-1">cd server &amp;&amp; npm run dev</code>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
