import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  Image,
  Users,
  FileText,
  Settings,
  Home,
  MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/brand/Logo'

const links = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/home', icon: Home, label: 'Home Page' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery Photos' },
  { to: '/admin/testimonials', icon: MessageSquare, label: 'Student Reviews' },
  { to: '/admin/enquiries', icon: Users, label: 'Enquiries' },
  { to: '/admin/team', icon: Users, label: 'Team' },
  { to: '/admin/blog', icon: FileText, label: 'Blog' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminSidebar() {
  return (
    <aside className="flex w-64 flex-col bg-white p-4 shadow-lg">
      <div className="mb-6 border-b border-slate-100 pb-4">
        <Logo showText={false} imageClassName="mx-auto h-14 w-auto max-w-[120px]" linkToHome={false} />
        <p className="mt-2 text-center text-sm font-semibold text-primary">Admin Panel</p>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-primary/10',
                isActive && 'bg-primary/10 font-semibold text-primary'
              )
            }
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400">
        Manage courses, gallery, reviews & home sections
      </p>
    </aside>
  )
}
