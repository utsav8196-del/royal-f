import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function AdminHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={logout}>Logout</Button>
      </div>
    </header>
  )
}