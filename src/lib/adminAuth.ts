import type { NavigateFunction } from 'react-router-dom'

export function adminLogout(logout: () => void, navigate: NavigateFunction) {
  logout()
  navigate('/login', { replace: true })
}
