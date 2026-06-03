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
      <div className="page-section">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">Gallery</h1>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
