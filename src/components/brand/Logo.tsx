import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useSiteSettings } from '@/context/SiteSettingsContext'

interface LogoProps {
  className?: string
  imageClassName?: string
  showText?: boolean
  textClassName?: string
  linkToHome?: boolean
  variant?: 'light' | 'dark'
  /** Remove white JPEG/PNG background via blend mode (default true for raster logos) */
  knockoutWhite?: boolean
}

const DEFAULT_LOGO = '/logo.png'
const PLACEHOLDER_SVG = '/logo.svg'

function useKnockoutClass(src: string, variant: 'light' | 'dark', enabled: boolean) {
  if (!enabled || src.endsWith('.svg')) return ''
  return variant === 'light' ? 'logo-knockout-on-dark' : 'logo-knockout'
}

export default function Logo({
  className,
  imageClassName,
  showText = false,
  textClassName,
  linkToHome = true,
  variant = 'dark',
  knockoutWhite = true,
}: LogoProps) {
  const { siteName, logoUrl } = useSiteSettings()
  const [src, setSrc] = useState(logoUrl || DEFAULT_LOGO)
  const name = siteName || 'Royal Academy'
  const knockoutClass = useKnockoutClass(src, variant, knockoutWhite)

  useEffect(() => {
    setSrc(logoUrl || DEFAULT_LOGO)
  }, [logoUrl])

  const handleError = () => {
    if (src === logoUrl && logoUrl) {
      setSrc(DEFAULT_LOGO)
    } else if (src !== PLACEHOLDER_SVG) {
      setSrc(PLACEHOLDER_SVG)
    }
  }

  const content = (
    <span className={cn('inline-flex items-center gap-2.5 bg-transparent', className)}>
      <img
        src={src}
        alt={`${name} logo`}
        className={cn(
          'h-11 w-auto max-w-[140px] shrink-0 bg-transparent object-contain object-left md:h-12 md:max-w-[160px]',
          knockoutClass,
          imageClassName
        )}
        onError={handleError}
      />
      {showText && (
        <span
          className={cn(
            'text-lg font-bold leading-tight md:text-xl',
            variant === 'light' ? 'text-white' : 'text-primary',
            textClassName
          )}
        >
          {name}
        </span>
      )}
    </span>
  )

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="shrink-0 bg-transparent transition-opacity hover:opacity-90"
        aria-label={`${name} home`}
      >
        {content}
      </Link>
    )
  }

  return content
}
