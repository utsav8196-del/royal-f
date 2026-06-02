import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import { useSiteSettings } from '@/context/SiteSettingsContext'

export default function Footer() {
  const { tagline, phone, email, address, justDialUrl } = useSiteSettings()

  return (
    <footer className="bg-slate-900 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <div>
          <Logo variant="light" linkToHome />
          <p className="mt-4 text-slate-400">{tagline || 'Empowering students since 2008.'}</p>
          {justDialUrl && (
            <a
              href={justDialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300"
            >
              View on JustDial <ExternalLink size={14} />
            </a>
          )}
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/courses" className="block text-slate-400 hover:text-white">Courses</Link>
            <Link to="/admission" className="block text-slate-400 hover:text-white">Admission</Link>
            <Link to="/contact" className="block text-slate-400 hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Info</h3>
          <div className="space-y-2 text-slate-400">
            <p><MapPin className="mr-1 inline w-4" /> {address || 'Rajkot, Gujarat'}</p>
            <p><Phone className="mr-1 inline w-4" /> {phone || '+91 9876543210'}</p>
            <p><Mail className="mr-1 inline w-4" /> {email || 'info@royalacademy.com'}</p>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Royal Academy. All rights reserved.
      </p>
    </footer>
  )
}
