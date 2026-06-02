import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '@/lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AnimatedCounter from '@/components/public/AnimatedCounter'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookOpen, Image, Mail, Star, Users } from 'lucide-react'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { format } from 'date-fns'

interface Stats {
  courses: number
  enquiries: number
  testimonials: number
  gallery: number
  contacts: number
  students: number
  recentEnquiries: Array<{ _id: string; name: string; email: string; course?: string; createdAt: string }>
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<Stats>('/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  const cards = [
    { label: 'Courses', value: stats?.courses ?? 0, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Enquiries', value: stats?.enquiries ?? 0, icon: Mail, color: 'text-amber-600' },
    { label: 'Students', value: stats?.students ?? 0, icon: Users, color: 'text-emerald-600' },
    { label: 'Testimonials', value: stats?.testimonials ?? 0, icon: Star, color: 'text-violet-600' },
    { label: 'Gallery', value: stats?.gallery ?? 0, icon: Image, color: 'text-rose-600' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Overview of your academy content and activity</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { to: '/admin/home', label: 'Home Page', desc: 'Popular courses & reviews' },
          { to: '/admin/courses', label: 'Courses', desc: 'Add / edit all courses' },
          { to: '/admin/gallery', label: 'Gallery', desc: 'Manage photos' },
          { to: '/admin/testimonials', label: 'Student Reviews', desc: 'What students say' },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="font-semibold text-primary">{item.label}</p>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((item) => (
          <Card key={item.label} className="border-slate-200 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{item.label}</CardTitle>
              <item.icon className={item.color} size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                <AnimatedCounter end={item.value} duration={1} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Enquiries</CardTitle>
          <Link to="/admin/enquiries" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(stats?.recentEnquiries ?? []).map((e) => (
                <TableRow key={e._id}>
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{e.course || '—'}</TableCell>
                  <TableCell>{format(new Date(e.createdAt), 'dd MMM yyyy')}</TableCell>
                </TableRow>
              ))}
              {!stats?.recentEnquiries?.length && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-500">
                    No enquiries yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
