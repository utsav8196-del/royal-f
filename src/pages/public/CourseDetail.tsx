import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BookOpen, CheckCircle2, Clock, GraduationCap, IndianRupee, Layers3 } from 'lucide-react'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import PageMeta from '@/components/layout/PageMeta'
import AnimatedSection from '@/components/public/AnimatedSection'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_PLACEHOLDER } from '@/lib/images'

interface CurriculumSection {
  title?: string
  topics?: string[]
}

interface Course {
  _id: string
  title: string
  slug: string
  category?: string
  description?: string
  image?: string
  duration?: string
  fee?: string
  curriculum?: CurriculumSection[]
  instructor?: string
}

export default function CourseDetail() {
  const { slug } = useParams()
  const [course, setCourse] = useState<Course | null>(null)
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
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="text-lg font-semibold text-red-600">Course not found</p>
        <p className="mt-2 text-slate-600">The course you are looking for may have been moved or removed.</p>
        <Button asChild className="mt-6 bg-primary text-white">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    )
  }

  const hasCurriculum = Array.isArray(course.curriculum) && course.curriculum.some((section) => (
    section.title || section.topics?.length
  ))
  const categoryLabel = course.category ? course.category.toUpperCase() : 'Course'

  return (
    <>
      <PageMeta title={course.title} description={course.description} />
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-25">
          <ResponsiveImage
            src={course.image}
            alt=""
            fallbackSrc={IMAGE_PLACEHOLDER}
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-primary/80" />
        <AnimatedSection className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1fr_420px] md:items-center md:py-24">
          <div>
            <Link to="/courses" className="inline-flex text-sm font-medium text-blue-100 transition-colors hover:text-white">
              Back to Courses
            </Link>
            <div className="mt-6 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100">
              {categoryLabel}
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              {course.title}
            </h1>
            {course.description && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
                {course.description}
              </p>
            )}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
                <Link to="/admission">Enroll Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
                <Link to="/contact">Talk to Counselor</Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl backdrop-blur">
            <ResponsiveImage
              src={course.image}
              alt={course.title}
              fallbackSrc={IMAGE_PLACEHOLDER}
              sizes="(min-width: 768px) 420px, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </AnimatedSection>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1fr_340px]">
          <AnimatedSection>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Course Overview</h2>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                {course.description || 'This program is designed to help students build strong fundamentals, improve exam readiness, and learn with structured academic guidance.'}
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Layers3 className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">What You Will Get</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  'Structured classroom learning',
                  'Regular practice and revision',
                  'Doubt-solving support',
                  'Exam-focused preparation',
                ].map((point) => (
                  <div key={point} className="flex gap-3 rounded-lg bg-white p-4 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {hasCurriculum && (
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-slate-900">Curriculum</h2>
                <div className="mt-6 space-y-5">
                  {course.curriculum?.map((section, index) => (
                    <div key={`${section.title || 'section'}-${index}`} className="rounded-lg border border-slate-200 p-4">
                      {section.title && <h3 className="font-semibold text-slate-900">{section.title}</h3>}
                      {section.topics && section.topics.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {section.topics.map((topic) => (
                            <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </AnimatedSection>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-lg">
              <h2 className="text-lg font-bold text-slate-900">Course Details</h2>
              <div className="mt-5 space-y-4">
                {[
                  { icon: Clock, label: 'Duration', value: course.duration || 'Contact academy' },
                  { icon: IndianRupee, label: 'Fee', value: course.fee || 'Contact academy' },
                  { icon: GraduationCap, label: 'Instructor', value: course.instructor || 'Expert faculty' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">{item.label}</p>
                      <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-6 w-full bg-primary text-white">
                <Link to="/admission">Submit Admission Enquiry</Link>
              </Button>
              <Button asChild variant="outline" className="mt-3 w-full">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
