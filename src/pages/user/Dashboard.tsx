import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import PageMeta from '@/components/layout/PageMeta'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, GraduationCap, MessageSquare } from 'lucide-react'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

export default function UserDashboard() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/courses')
      .then((res) => setCourses(res.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <>
      <PageMeta title="Dashboard" description="Your Royal Academy student dashboard" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}!</h1>
        <p className="mt-2 text-slate-600">Manage your learning journey from your personal dashboard.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { icon: GraduationCap, label: 'Account Status', value: 'Active Student' },
            { icon: BookOpen, label: 'Available Courses', value: String(courses.length || '—') },
            { icon: MessageSquare, label: 'Support', value: '24/7 Available' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center gap-3 pb-2">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <item.icon size={22} />
                  </div>
                  <CardTitle className="text-sm font-medium text-slate-600">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-slate-900">{item.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recommended Courses</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/courses">View all</Link>
            </Button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course._id} className="overflow-hidden border-slate-200">
                <ResponsiveImage
                  src={course.image}
                  alt={course.title}
                  className="h-36 w-full object-cover bg-slate-100"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{course.description}</p>
                  <Button size="sm" className="mt-3 bg-primary text-white" asChild>
                    <Link to={`/courses/${course.slug}`}>View details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
            {courses.length === 0 && (
              <p className="col-span-full text-slate-500">No courses available yet.</p>
            )}
          </div>
        </section>
      </motion.div>
    </>
  )
}
