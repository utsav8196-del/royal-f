import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { BookOpen, Image, MessageSquare, Loader2, Star } from 'lucide-react'

export default function HomePage() {
  const [tab, setTab] = useState<'sections' | 'courses' | 'testimonials'>('sections')
  const [courses, setCourses] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const load = async () => {
    setLoading(true)
    try {
      const [settingsRes, coursesRes, testimonialsRes] = await Promise.all([
        api.get('/settings'),
        api.get('/courses/manage/all'),
        api.get('/testimonials/manage/all'),
      ])
      reset(settingsRes.data)
      setCourses(coursesRes.data)
      setTestimonials(testimonialsRes.data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [reset])

  const saveSections = async (data: Record<string, unknown>) => {
    setSaving(true)
    try {
      await api.put('/settings', data)
      window.dispatchEvent(new Event('site-settings-updated'))
      toast.success('Home page sections updated')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const toggleCourseFeatured = async (course: any) => {
    try {
      await api.put(`/courses/${course._id}`, {
        featured: !course.featured,
        homeOrder: course.homeOrder ?? 0,
      })
      toast.success(course.featured ? 'Removed from Popular Courses' : 'Added to Popular Courses')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const updateCourseOrder = async (id: string, homeOrder: number) => {
    try {
      await api.put(`/courses/${id}`, { homeOrder })
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const toggleTestimonialHome = async (item: any) => {
    try {
      await api.put(`/testimonials/${item._id}`, {
        showOnHome: !item.showOnHome,
        homeOrder: item.homeOrder ?? 0,
      })
      toast.success(item.showOnHome ? 'Hidden from home page' : 'Shown on home page')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const updateTestimonialOrder = async (id: string, homeOrder: number) => {
    try {
      await api.put(`/testimonials/${id}`, { homeOrder })
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  const tabs = [
    { id: 'sections' as const, label: 'Section titles', icon: Star },
    { id: 'courses' as const, label: 'Popular Courses', icon: BookOpen },
    { id: 'testimonials' as const, label: 'Student reviews', icon: MessageSquare },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Home Page Content</h1>
      <p className="mt-1 text-slate-600">
        Control what appears on the homepage: Popular Courses, testimonials, and section headings.
      </p>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((t) => (
          <Button
            key={t.id}
            type="button"
            variant={tab === t.id ? 'default' : 'outline'}
            className={tab === t.id ? 'bg-primary text-white' : ''}
            onClick={() => setTab(t.id)}
          >
            <t.icon size={16} className="mr-2" />
            {t.label}
          </Button>
        ))}
        <Button variant="outline" asChild className="ml-auto">
          <Link to="/admin/gallery">
            <Image size={16} className="mr-2" />
            Manage Gallery
          </Link>
        </Button>
      </div>

      {tab === 'sections' && (
        <form
          onSubmit={handleSubmit(saveSections)}
          className="mt-6 max-w-xl space-y-4 rounded-xl border bg-white p-6 shadow-sm"
        >
          <div>
            <Label>Popular Courses — section title</Label>
            <Input {...register('popularCoursesTitle')} className="mt-1" placeholder="Popular Courses" />
          </div>
          <div>
            <Label>How many courses to show</Label>
            <Input type="number" min={1} max={12} {...register('popularCoursesLimit')} className="mt-1" />
          </div>
          <div>
            <Label>Student reviews — section title</Label>
            <Input {...register('testimonialsTitle')} className="mt-1" placeholder="What Our Students Say" />
          </div>
          <div>
            <Label>How many reviews to show</Label>
            <Input type="number" min={1} max={20} {...register('testimonialsLimit')} className="mt-1" />
          </div>
          <Button type="submit" className="bg-primary text-white" disabled={saving}>
            {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save section settings'}
          </Button>
        </form>
      )}

      {tab === 'courses' && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Toggle <strong>Popular</strong> to show courses in the home &quot;Popular Courses&quot; section. Lower order = shown first.
            </p>
            <Button asChild className="bg-primary text-white">
              <Link to="/admin/courses/new">+ Add new course</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === 'active' ? 'default' : 'secondary'}>{c.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant={c.featured ? 'default' : 'outline'}
                        className={c.featured ? 'bg-amber-500 text-white hover:bg-amber-600' : ''}
                        onClick={() => toggleCourseFeatured(c)}
                      >
                        {c.featured ? '★ Popular' : 'Set popular'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20"
                        defaultValue={c.homeOrder ?? 0}
                        onBlur={(e) => updateCourseOrder(c._id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/admin/courses/${c._id}/edit`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {courses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-500">
                      No courses yet. <Link to="/admin/courses/new" className="text-primary underline">Add one</Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {tab === 'testimonials' && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Control reviews shown in <strong>What Our Students Say</strong> on the home page.
            </p>
            <Button asChild className="bg-primary text-white">
              <Link to="/admin/testimonials">Full testimonial editor</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>On home</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t) => (
                  <TableRow key={t._id}>
                    <TableCell>
                      <p className="font-medium">{t.name}</p>
                      <p className="line-clamp-1 text-xs text-slate-500">{t.message}</p>
                    </TableCell>
                    <TableCell>{t.rating}/5</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        size="sm"
                        variant={t.showOnHome !== false ? 'default' : 'outline'}
                        className={t.showOnHome !== false ? 'bg-primary text-white' : ''}
                        onClick={() => toggleTestimonialHome(t)}
                      >
                        {t.showOnHome !== false ? 'Visible' : 'Hidden'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="w-20"
                        defaultValue={t.homeOrder ?? 0}
                        onBlur={(e) => updateTestimonialOrder(t._id, Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant={t.status === 'active' ? 'default' : 'secondary'}>{t.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {testimonials.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-slate-500">
                      No testimonials. <Link to="/admin/testimonials" className="text-primary underline">Add reviews</Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
