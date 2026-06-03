import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { Button } from '@/components/ui/button'
import { BookOpen, LayoutDashboard, LogOut, User, Menu, X } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'

export default function UserLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview', delay: 0.2 },
    { href: '/courses', icon: BookOpen, label: 'Browse Courses', delay: 0.3 },
  ]

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex flex-1 pt-16">
          {/* Mobile Menu Button - In a fixed header */}
          <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 py-3">
            <motion.button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
              >
                <motion.div
                  animate={{ rotate: isSidebarOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </Button>
            </motion.button>
          </div>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-32 z-30 bg-black/50 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: isSidebarOpen ? 0 : -256 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed left-0 top-32 z-40 flex h-[calc(100vh-8rem)] w-64 shrink-0 flex-col border-r border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100 p-6 overflow-y-auto shadow-xl lg:relative lg:top-0 lg:h-auto lg:translate-x-0 lg:bg-slate-50 lg:shadow-none"
          >
            {/* User Profile Section */}
            <motion.div
              className="mb-8 flex items-center gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <motion.div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg"
                whileHover={{ 
                  scale: 1.15, 
                  boxShadow: '0 0 25px rgba(59, 130, 246, 0.8)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div 
                  whileHover={{ rotate: 360 }} 
                  transition={{ duration: 0.6 }}
                >
                  <User size={20} />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-semibold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </motion.div>
            </motion.div>

            {/* Navigation Links */}
            <nav className="mb-4 flex-1 space-y-2">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay, duration: 0.4 }}
                >
                  <Link to={item.href} onClick={() => setIsSidebarOpen(false)}>
                    <motion.div
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 relative group overflow-hidden cursor-pointer"
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Background slide effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 -z-10 rounded-lg"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon with animation */}
                      <motion.div
                        whileHover={{ scale: 1.25, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <item.icon size={20} className="text-primary group-hover:text-primary" />
                      </motion.div>

                      {/* Label with color change */}
                      <motion.span
                        whileHover={{ color: 'rgb(59, 130, 246)' }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>

                      {/* Right accent line */}
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary/0 via-primary to-primary/0 rounded-full"
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileHover={{ scaleY: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Logout Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-auto border-t border-slate-200 pt-4"
            >
              <motion.button
                onClick={handleLogout}
                className="w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full relative overflow-hidden group"
                >
                  {/* Background slide effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-500/10 -z-10 rounded-md"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div className="flex items-center justify-center gap-2">
                    <motion.div
                      whileHover={{ rotate: -25, scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <LogOut size={16} />
                    </motion.div>
                    <span>Logout</span>
                  </motion.div>
                </Button>
              </motion.button>
            </motion.div>
          </motion.aside>

          {/* Main Content */}
          <main className="mt-16 w-full flex-1 overflow-x-hidden bg-slate-50/50 p-4 sm:p-6 md:p-10 lg:mt-0">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
