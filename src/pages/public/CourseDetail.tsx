import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import PageMeta from '@/components/layout/PageMeta'
import AnimatedSection from '@/components/public/AnimatedSection'

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
      <AnimatedSection className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <img
            src={course.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'}
            alt={course.title}
            className="my-6 h-64 w-full rounded-xl object-cover shadow-lg"
            loading="lazy"
          />
          <p className="text-lg text-slate-700">{course.description}</p>
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
