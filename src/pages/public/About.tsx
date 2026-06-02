import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { BookOpen, Target, Trophy, GraduationCap, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/public/AnimatedSection'
import AnimatedCounter from '@/components/public/AnimatedCounter'
import TeamCard from '@/components/public/TeamCard'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } }
}
const item = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6 } } }

export default function About() {
  const [team, setTeam] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/team')
      .then(res => setTeam(res.data))
      .catch(() => {})
  }, [])

  const specializations = [
    { icon: GraduationCap, title: 'NEET', description: 'Complete NEET (UG) Coaching for Medical Aspirants' },
    { icon: BookOpen, title: 'RE-NEET', description: 'Special Batch for RE-NEET / NEET Improvement' },
    { icon: Target, title: 'JEE Main', description: 'Full Preparation for JEE Main & Other Engineering Exams' },
    { icon: Trophy, title: 'JEE Advanced', description: 'Advanced Level Training for IIT Aspirants' }
  ]

  const achievements = [
    { end: 1500, label: 'NEET Selections', suffix: '+' },
    { end: 800, label: 'JEE Advanced Selections', suffix: '+' },
    { end: 95, label: 'Success Rate', suffix: '%' },
    { end: 15, label: 'Years of Excellence', suffix: '+' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative flex items-center min-h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative z-10 w-full text-center text-white py-20">
          <motion.h1 variants={item} className="text-5xl md:text-6xl font-extrabold">
            About Royal Academy
          </motion.h1>
          <motion.p variants={item} className="mt-4 text-xl max-w-3xl mx-auto px-4">
            Rajkot's Premier Coaching Institute for NEET, RE-NEET, JEE Main & JEE Advanced. Transforming aspirations into achievements.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <AnimatedSection direction="left">
            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide high-quality, affordable coaching that empowers students to crack NEET, JEE and other competitive exams
                with confidence. We focus on conceptual clarity, rigorous practice, and personalized mentorship.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="bg-white shadow-lg rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the most trusted coaching destination in Gujarat, producing top rankers every year in 
                medical and engineering entrance exams.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Specializations (NEET, JEE...) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Specializations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <AnimatedSection key={index}>
                <div className="bg-white rounded-xl p-6 text-center shadow hover:shadow-lg transition-shadow">
                  <spec.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{spec.title}</h3>
                  <p className="text-gray-600">{spec.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, i) => (
              <AnimatedSection key={i}>
                <div className="text-4xl md:text-5xl font-extrabold">
                  <AnimatedCounter end={stat.end} duration={2} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-lg opacity-90">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Royal Academy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: CheckCircle, title: 'Expert Faculty', desc: 'Experienced teachers from IITs, NITs & Medical fields.' },
              { icon: CheckCircle, title: 'Comprehensive Study Material', desc: 'Updated notes, DPPs & test series aligned with latest exam patterns.' },
              { icon: CheckCircle, title: 'Regular Mock Tests', desc: 'Full syllabus & topic-wise tests with detailed performance analysis.' },
              { icon: CheckCircle, title: 'Doubt Solving Sessions', desc: 'One-to-one doubt clearing and extra classes for weak students.' },
              { icon: CheckCircle, title: 'Air-Conditioned Classrooms', desc: 'Comfortable learning environment for better concentration.' },
              { icon: CheckCircle, title: 'Result Oriented Approach', desc: 'Proven track record with top selections every year.' }
            ].map((point, i) => (
              <AnimatedSection key={i} direction="up">
                <div className="flex gap-4 items-start">
                  <point.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg">{point.title}</h3>
                    <p className="text-gray-600 text-sm">{point.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Faculty</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.length > 0 ? (
              team.map(member => (
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
  )
}