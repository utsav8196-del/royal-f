import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/brand/Logo'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/admission', label: 'Admission' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md' : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Logo />

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? 'text-primary' : 'text-slate-700'
              }`}
            >
              {link.label}
              {location.pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-primary"
                />
              )}
            </Link>
          ))}
          {token && user ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                  <User size={16} className="mr-1" />
                  {user.role === 'admin' ? 'Admin' : 'My Account'}
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" className="bg-primary text-white" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
          <Button size="sm" className="bg-primary text-white" asChild>
            <Link to="/admission">Enquire Now</Link>
          </Button>
        </div>

        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-3 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium ${location.pathname === link.href ? 'text-primary' : 'text-slate-700'}`}
                >
                  {link.label}
                </Link>
              ))}
              {token && user ? (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>My Account</Link>
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button className="flex-1 bg-primary text-white" asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
              <Button className="w-full bg-primary text-white" asChild>
                <Link to="/admission">Enquire Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
