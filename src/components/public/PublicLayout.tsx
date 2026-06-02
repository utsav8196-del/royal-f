import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from '@/components/layout/PageTransition'

export default function PublicLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
