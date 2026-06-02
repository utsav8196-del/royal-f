import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/public/AnimatedSection'
import AnimatedCounter from '@/components/public/AnimatedCounter'
import CourseCard from '@/components/public/CourseCard'
import TestimonialCard from '@/components/public/TestimonialCard'
import { Link } from 'react-router-dom'
import PageMeta from '@/components/layout/PageMeta'
import LoadingSpinner from '@/components/public/LoadingSpinner'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}
const item = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.5 } } }

export default function Home() {
  const [courses, setCourses] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [settings, setSettings] = useState<Record<string, string | number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const settingsRes = await api.get('/settings')
        const s = settingsRes.data
        setSettings(s)
        const [coursesRes, testimonialsRes] = await Promise.all([
          api.get('/courses/popular', { params: { limit: s.popularCoursesLimit || 4 } }),
          api.get('/testimonials/home', { params: { limit: s.testimonialsLimit || 10 } }),
        ])
        setCourses(coursesRes.data)
        setTestimonials(testimonialsRes.data)
      } catch {
        /* keep defaults */
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const heroTitle = String(settings.heroTitle || 'Empower Your Future with Royal Academy')
  const heroSubtitle = String(
    settings.heroSubtitle || 'Expert faculty, modern labs, and proven results in Rajkot.'
  )
  const popularTitle = String(settings.popularCoursesTitle || 'Popular Courses')
  const testimonialsTitle = String(settings.testimonialsTitle || 'What Our Students Say')
  const stats = (settings.stats as { students?: number; courses?: number; years?: number; successRate?: number }) || {}

  if (loading) return <LoadingSpinner />

  return (
    <>
      <PageMeta
        title="Home"
        description="Royal Academy Rajkot — JEE, NEET, and Foundation coaching with expert faculty."
      />

      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-primary via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600')] bg-cover bg-center opacity-20" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center text-white"
        >
          <motion.h1 variants={item} className="text-4xl font-extrabold text leading-tight md:text-6xl">
            {heroTitle}
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg text-blue-100 md:text-xl">
            {heroSubtitle}
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-slate-100">
              <Link to="/courses">Explore Courses</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/admission">Admission Enquiry</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <section className="page-section">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold">{popularTitle}</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <AnimatedSection key={course._id}>
                <CourseCard course={course} />
              </AnimatedSection>
            ))}
            {courses.length === 0 && (
              <p className="col-span-full text-center text-slate-500">No courses available yet.</p>
            )}
          </div>
        </div>
      </section>

      <section className="page-section bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { end: stats.students ?? 5000, label: 'Students', suffix: '+' },
              { end: stats.courses ?? 50, label: 'Courses', suffix: '+' },
              { end: stats.years ?? 15, label: 'Years Exp.', suffix: '+' },
              { end: stats.successRate ?? 98, label: 'Success', suffix: '%' },
            ].map((stat, i) => (
              <AnimatedSection key={i}>
                <div className="text-4xl font-bold text-primary">
                  <AnimatedCounter end={stat.end} duration={2} suffix={stat.suffix} />
                </div>
                <p className="mt-1 text-slate-600">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold">{testimonialsTitle}</h2>
          <div className="mt-12 flex gap-6 overflow-x-auto pb-4 snap-x">
            {testimonials.map((t) => (
              <div key={t._id} className="min-w-[300px] snap-start">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="w-full text-center text-slate-500">No testimonials yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
