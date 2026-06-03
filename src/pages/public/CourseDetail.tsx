import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import PageMeta from '@/components/layout/PageMeta'
import AnimatedSection from '@/components/public/AnimatedSection'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_PLACEHOLDER } from '@/lib/images'

export default function CourseDetail() {
  const { slug } = useParams()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    api.get(`/courses/slug/${slug}`)
      .then((res) => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <LoadingSpinner />
  if (!course) {
    return (
      <div className="py-20 text-center text-red-600">
        <p>Course not found</p>
        <Button asChild className="mt-4"><Link to="/courses">Back to courses</Link></Button>
      </div>
    )
  }

  return (
    <>
      <PageMeta title={course.title} description={course.description} />
      <AnimatedSection className="py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl overflow-x-hidden px-4">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">{course.title}</h1>
          <ResponsiveImage
            src={course.image}
            alt={course.title}
            fallbackSrc={IMAGE_PLACEHOLDER}
            className="my-4 h-48 w-full rounded-xl object-cover shadow-lg sm:my-6 sm:h-64 md:h-72"
          />
          <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <span className="rounded-full bg-slate-100 px-4 py-1 text-sm">{course.duration}</span>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">{course.fee}</span>
          </div>
          <Button asChild className="mt-8 bg-primary text-white">
            <Link to="/admission">Enroll Now</Link>
          </Button>
        </div>
      </AnimatedSection>
    </>
  )
}
