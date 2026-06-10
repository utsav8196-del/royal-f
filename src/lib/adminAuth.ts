import type { NavigateFunction } from 'react-router-dom'

/** Leave admin routes before clearing token so ProtectedRoute does not send you to /admin/login */
export function adminLogout(logout: () => void, navigate: NavigateFunction) {
  navigate('/login', { replace: true })
  logout()
}
