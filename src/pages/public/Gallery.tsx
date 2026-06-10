import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import AnimatedSection from '@/components/public/AnimatedSection'
import PageMeta from '@/components/layout/PageMeta'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import FitImageBox from '@/components/ui/FitImageBox'

export default function Gallery() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/gallery')
      .then((res) => setImages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <PageMeta title="Gallery" description="Campus life and facilities at Royal Academy." />
      <section
        className="relative flex min-h-[40vh] items-center bg-cover bg-center bg-no-repeat sm:min-h-[50vh] md:min-h-[60vh]"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <AnimatedSection className="relative z-10 w-full px-4 py-12 text-center text-white sm:py-16 md:py-20">
          <h1 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">Gallery</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-blue-50 sm:mt-4 sm:text-lg md:text-xl">
            A glimpse of Royal Academy classrooms, campus moments, and learning environment.
          </p>
        </AnimatedSection>
      </section>

      <div className="py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img) => (
              <AnimatedSection key={img._id}>
                <FitImageBox
                  src={img.url}
                  alt={img.title || 'Gallery'}
                  aspect="square"
                  className="shadow-md"
                />
              </AnimatedSection>
            ))}
            {images.length === 0 && (
              <p className="col-span-full text-center text-slate-500">No images yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
