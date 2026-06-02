import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { Edit2, Trash2 } from 'lucide-react'

export default function AdminCourses() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = () =>
    api.get('/courses/manage/all')
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false))

  useEffect(() => { fetchCourses() }, [])

  const deleteCourse = async (id: string) => {
    if (!confirm('Delete this course?')) return
    try {
      await api.delete(`/courses/${id}`)
      toast.success('Course deleted')
      fetchCourses()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-slate-600">Full course list — mark as Popular for the home page.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="/admin/home">Home page controls</Link>
          </Button>
          <Button asChild className="w-full bg-primary text-white sm:w-auto">
            <Link to="/admin/courses/new">+ Add Course</Link>
          </Button>
        </div>
      </div>

      {/* Mobile: Card View */}
      <div className="grid gap-4 sm:hidden">
        {courses.map((course) => (
          <div key={course._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <h3 className="font-semibold text-slate-900">{course.title}</h3>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" asChild>
                  <Link to={`/admin/courses/${course._id}/edit`}>
                    <Edit2 size={16} />
                  </Link>
                </Button>
                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50" onClick={() => deleteCourse(course._id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Category:</span>
                <span className="font-medium">{course.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fee:</span>
                <span className="font-medium">{course.fee || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status:</span>
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Popular:</span>
                {course.featured ? (
                  <Badge className="bg-amber-500">★ Yes</Badge>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
            No courses yet
          </div>
        )}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>
                    {course.featured ? (
                      <Badge className="bg-amber-500">★ Popular</Badge>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.fee}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/admin/courses/${course._id}/edit`}>Edit</Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteCourse(course._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-slate-500">No courses yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
