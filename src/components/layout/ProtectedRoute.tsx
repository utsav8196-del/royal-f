import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import LoadingSpinner from '@/components/public/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  role?: 'admin' | 'student'
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, loading, token } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!token || !user) {
    const loginPath = role === 'admin' ? '/admin/login' : '/login'
    return <Navigate to={loginPath} state={{ from: location.pathname }} replace />
  }

  if (role === 'admin' && user.role !== 'admin') {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ message: 'Please use Admin Login with an administrator account.' }}
      />
    )
  }

  if (role === 'student' && user.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
