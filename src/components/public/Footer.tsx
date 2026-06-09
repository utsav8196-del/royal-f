import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ExternalLink, Clock } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import { useSiteSettings } from '@/context/SiteSettingsContext'

export default function Footer() {
  const { siteName, tagline, phone, email, address, justDialUrl, workingHours } = useSiteSettings()
  const year = new Date().getFullYear()
  const displayName = siteName || 'Royal Academy'

  const phoneHref = phone ? `tel:${String(phone).replace(/\s/g, '')}` : undefined
  const emailHref = email ? `mailto:${email}` : undefined

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950 py-12 text-slate-900 dark:text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
        <div>
          <Logo variant="light" linkToHome />
          <p className="mt-4 text-slate-600 dark:text-slate-400">{tagline || 'Empowering students since 2008.'}</p>
          {justDialUrl && (
            <a
              href={justDialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
            >
              View on JustDial <ExternalLink size={14} />
            </a>
          )}
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
          <div className="space-y-2">
            <Link to="/courses" className="block text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400">
              Courses
            </Link>
            <Link to="/about" className="block text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400">
              About
            </Link>
            <Link to="/admission" className="block text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400">
              Admission
            </Link>
            <Link to="/contact" className="block text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Info</h3>
          <div className="space-y-2 text-slate-600 dark:text-slate-400">
            {address && (
              <p>
                <MapPin className="mr-1 inline h-4 w-4 shrink-0" />
                {address}
              </p>
            )}
            {phone && (
              <p>
                <Phone className="mr-1 inline h-4 w-4 shrink-0" />
                {phoneHref ? (
                  <a href={phoneHref} className="hover:text-primary dark:hover:text-blue-400">
                    {phone}
                  </a>
                ) : (
                  phone
                )}
              </p>
            )}
            {email && (
              <p>
                <Mail className="mr-1 inline h-4 w-4 shrink-0" />
                {emailHref ? (
                  <a href={emailHref} className="hover:text-primary dark:hover:text-blue-400">
                    {email}
                  </a>
                ) : (
                  email
                )}
              </p>
            )}
            {workingHours && (
              <p>
                <Clock className="mr-1 inline h-4 w-4 shrink-0" />
                {workingHours}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-500">
        © {year} {displayName}. All rights reserved.
      </p>
    </footer>
  )
}
