import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow sm:p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden" type="button">
          <Menu size={24} />
        </Button>
        <h1 className="text-lg font-semibold sm:text-xl">Admin Panel</h1>
      </div>
      {user?.email && (
        <span className="max-w-[50vw] truncate text-sm text-gray-600 sm:max-w-none">{user.email}</span>
      )}
    </header>
  )
}
