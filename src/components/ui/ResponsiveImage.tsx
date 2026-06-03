import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { IMAGE_PLACEHOLDER, resolveImageUrl } from '@/lib/images'

interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null
  fallbackSrc?: string
}

/**
 * Resolves API / Cloudinary / legacy localhost URLs and falls back if loading fails.
 */
export default function ResponsiveImage({
  src,
  alt = '',
  className,
  fallbackSrc = IMAGE_PLACEHOLDER,
  onError,
  ...props
}: ResponsiveImageProps) {
  const resolved = resolveImageUrl(src, fallbackSrc)
  const [currentSrc, setCurrentSrc] = useState(resolved)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setCurrentSrc(resolveImageUrl(src, fallbackSrc))
    setFailed(false)
  }, [src, fallbackSrc])

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (!failed && currentSrc !== fallbackSrc) {
      setFailed(true)
      setCurrentSrc(fallbackSrc)
    }
    onError?.(e)
  }

  return (
    <img
      {...props}
      src={failed ? fallbackSrc : currentSrc}
      alt={alt}
      className={cn(className)}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
      onError={handleError}
    />
  )
}
