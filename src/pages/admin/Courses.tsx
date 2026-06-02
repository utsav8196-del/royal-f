import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'

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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Courses</h1>
          <p className="text-sm text-slate-600">Full course list — mark as Popular for the home page.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/home">Home page controls</Link>
          </Button>
          <Button asChild className="bg-primary text-white">
            <Link to="/admin/courses/new">Add Course</Link>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
  )
}
