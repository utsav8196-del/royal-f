import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import ProtectedRoute from '@/components/layout/ProtectedRoute'

export default function AdminLayout() {
  return (
    <ProtectedRoute role="admin">
      <div className="flex h-screen bg-slate-50">
        <AdminSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
