import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import CourseCard from '@/components/public/CourseCard'
import AnimatedSection from '@/components/public/AnimatedSection'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import PageMeta from '@/components/layout/PageMeta'

export default function Courses() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <PageMeta title="Courses" description="Browse JEE, NEET, and Foundation courses at Royal Academy." />
      <section
        className="relative flex min-h-[40vh] items-center bg-cover bg-center bg-no-repeat sm:min-h-[50vh] md:min-h-[60vh]"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <AnimatedSection className="relative z-10 w-full px-4 py-12 text-center text-white sm:py-16 md:py-20">
          <h1 className="text-3xl font-extrabold leading-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">All Courses</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-blue-50 sm:mt-4 sm:text-lg md:text-xl">
            Choose the program that fits your goals. Expert guidance at every step.
          </p>
        </AnimatedSection>
      </section>

      <section className="py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <AnimatedSection key={course._id}>
                <CourseCard course={course} />
              </AnimatedSection>
            ))}
          </div>
          {courses.length === 0 && (
            <p className="mt-8 text-center text-slate-500">No courses found.</p>
          )}
        </div>
      </section>
    </>
  )
}
