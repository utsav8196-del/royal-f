import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { motion } from 'framer-motion'
import { BookOpen, Target, Trophy, GraduationCap, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/public/AnimatedSection'
import AnimatedCounter from '@/components/public/AnimatedCounter'
import TeamCard from '@/components/public/TeamCard'
import PageMeta from '@/components/layout/PageMeta'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
}
const item = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6 } } }

export default function About() {
  const [team, setTeam] = useState<any[]>([])

  useEffect(() => {
    api.get('/team')
      .then((res) => setTeam(res.data))
      .catch(() => {})
  }, [])

  const specializations = [
    { icon: GraduationCap, title: 'NEET', description: 'Complete NEET (UG) Coaching for Medical Aspirants' },
    { icon: BookOpen, title: 'RE-NEET', description: 'Special Batch for RE-NEET / NEET Improvement' },
    { icon: Target, title: 'JEE Main', description: 'Full Preparation for JEE Main & Other Engineering Exams' },
    { icon: Trophy, title: 'JEE Advanced', description: 'Advanced Level Training for IIT Aspirants' },
  ]

  const achievements = [
    { end: 1500, label: 'NEET Selections', suffix: '+' },
    { end: 800, label: 'JEE Advanced Selections', suffix: '+' },
    { end: 95, label: 'Success Rate', suffix: '%' },
    { end: 15, label: 'Years of Excellence', suffix: '+' },
  ]

  return (
    <>
      <PageMeta
        title="About"
        description="Learn about Royal Academy Rajkot — NEET, RE-NEET, JEE Main and JEE Advanced coaching."
      />
      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <section
          className="relative flex min-h-[40vh] items-center bg-cover bg-center bg-no-repeat sm:min-h-[50vh] md:min-h-[60vh]"
          style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-primary/80" />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 w-full px-4 py-12 text-center text-white sm:py-16 md:py-20"
          >
            <motion.h1
              variants={item}
              className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              About Royal Academy
            </motion.h1>
            <motion.p
              variants={item}
              className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-blue-50 sm:mt-4 sm:text-lg md:text-xl"
            >
              Rajkot&apos;s Premier Coaching Institute for NEET, RE-NEET, JEE Main & JEE Advanced. Transforming
              aspirations into achievements.
            </motion.p>
          </motion.div>
        </section>

        {/* Our Mission & Vision */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-8 md:grid-cols-2">
            <AnimatedSection direction="left">
              <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <h2 className="mb-3 text-xl font-bold text-primary sm:mb-4 sm:text-2xl">Our Mission</h2>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  To provide high-quality, affordable coaching that empowers students to crack NEET, JEE and other
                  competitive exams with confidence. We focus on conceptual clarity, rigorous practice, and personalized
                  mentorship.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <h2 className="mb-3 text-xl font-bold text-primary sm:mb-4 sm:text-2xl">Our Vision</h2>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  To become the most trusted coaching destination in Gujarat, producing top rankers every year in
                  medical and engineering entrance exams.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Specializations */}
        <section className="bg-gray-50 py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
              Our Specializations
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
              {specializations.map((spec, index) => (
                <AnimatedSection key={index}>
                  <div className="rounded-xl bg-white p-5 text-center shadow transition-shadow hover:shadow-lg sm:p-6">
                    <spec.icon className="mx-auto mb-3 h-10 w-10 text-primary sm:mb-4 sm:h-12 sm:w-12" />
                    <h3 className="mb-2 text-lg font-bold sm:text-xl">{spec.title}</h3>
                    <p className="text-sm text-gray-600 sm:text-base">{spec.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-primary py-10 text-white sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="mb-8 text-2xl font-bold sm:mb-12 sm:text-3xl">Our Achievements</h2>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
              {achievements.map((stat, i) => (
                <AnimatedSection key={i}>
                  <div className="px-1">
                    <div className="text-2xl font-extrabold sm:text-4xl md:text-5xl">
                      <AnimatedCounter end={stat.end} duration={2} suffix={stat.suffix} />
                    </div>
                    <p className="mt-1 text-xs leading-snug opacity-90 sm:mt-2 sm:text-base">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
              Why Choose Royal Academy?
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {[
                { icon: CheckCircle, title: 'Expert Faculty', desc: 'Experienced teachers from IITs, NITs & Medical fields.' },
                { icon: CheckCircle, title: 'Comprehensive Study Material', desc: 'Updated notes, DPPs & test series aligned with latest exam patterns.' },
                { icon: CheckCircle, title: 'Regular Mock Tests', desc: 'Full syllabus & topic-wise tests with detailed performance analysis.' },
                { icon: CheckCircle, title: 'Doubt Solving Sessions', desc: 'One-to-one doubt clearing and extra classes for weak students.' },
                { icon: CheckCircle, title: 'Air-Conditioned Classrooms', desc: 'Comfortable learning environment for better concentration.' },
                { icon: CheckCircle, title: 'Result Oriented Approach', desc: 'Proven track record with top selections every year.' },
              ].map((point, i) => (
                <AnimatedSection key={i} direction="up">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <point.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-1 sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold sm:text-lg">{point.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{point.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-gray-50 py-10 sm:py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 sm:mb-12 sm:text-3xl">
              Meet Our Faculty
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {team.length > 0 ? (
                team.map((member) => (
                  <AnimatedSection key={member._id}>
                    <TeamCard member={member} />
                  </AnimatedSection>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">Team members will be updated soon.</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
