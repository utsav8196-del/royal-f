import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Menu, LogOut } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow sm:p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={24} />
        </Button>
        <h1 className="text-lg font-semibold sm:text-xl">Admin Panel</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden text-sm text-gray-600 sm:inline">{user?.email}</span>
        <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  )
}