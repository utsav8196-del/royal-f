import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import PageTransition from '@/components/layout/PageTransition'

/** Student dashboard — no sidebar; uses public navbar only */
export default function UserLayout() {
  return (
    <ProtectedRoute role="student">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 overflow-x-hidden bg-slate-50/50 pt-16">
          <div className="mx-auto max-w-7xl p-4 sm:p-6 md:p-10">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
