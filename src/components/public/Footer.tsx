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
  const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

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
            <Link to="/courses" onClick={scrollToTop} className="block text-slate-400 hover:text-white">
              Courses
            </Link>
            <Link to="/about" onClick={scrollToTop} className="block text-slate-400 hover:text-white">
              About
            </Link>
            <Link to="/admission" onClick={scrollToTop} className="block text-slate-400 hover:text-white">
              Admission
            </Link>
            <Link to="/contact" onClick={scrollToTop} className="block text-slate-400 hover:text-white">
              Contact
            </Link>
            <Link to="/gallery" onClick={scrollToTop} className="block text-slate-400 hover:text-white">
              Gallery
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold">Contact Info</h3>
          <div className="space-y-2 text-slate-400">
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
                  <a href={phoneHref} className="hover:text-white">
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
                  <a href={emailHref} className="hover:text-white">
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
      <p className="mt-10 text-center text-sm text-slate-500">
        © {year} {displayName}. All rights reserved.
      </p>
    </footer>
  )
}
