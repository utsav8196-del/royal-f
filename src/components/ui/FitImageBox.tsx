import { cn } from '@/lib/utils'

type AspectRatio = 'square' | 'video' | '4/3' | 'auto'
type Size = 'sm' | 'md' | 'lg'

interface FitImageBoxProps {
  src: string
  alt?: string
  className?: string
  aspect?: AspectRatio
  size?: Size
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-20',
  md: 'h-44',
  lg: 'h-56',
}

const aspectClasses: Record<Exclude<AspectRatio, 'auto'>, string> = {
  square: 'aspect-square',
  video: 'aspect-video',
  '4/3': 'aspect-[4/3]',
}

/** Full image visible inside box — scales to fit (contain), no cropping. */
export default function FitImageBox({
  src,
  alt = '',
  className,
  aspect = '4/3',
  size = 'md',
}: FitImageBoxProps) {
  if (!src?.trim()) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-100 text-xs text-slate-400',
          aspect === 'auto' ? sizeClasses[size] : aspectClasses[aspect],
          className
        )}
      >
        No image
      </div>
    )
  }

  return (
    <div
      className={cn(
        'fit-image-box relative w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100',
        aspect === 'auto' ? sizeClasses[size] : aspectClasses[aspect],
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center p-2">
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain object-center"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
