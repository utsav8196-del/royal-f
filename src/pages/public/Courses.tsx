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
      <div className="page-section">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-center text-3xl font-bold sm:text-4xl">All Courses</h1>
          <p className="mx-auto mt-3 max-w-2xl px-2 text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
            Choose the program that fits your goals. Expert guidance at every step.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </>
  )
}
