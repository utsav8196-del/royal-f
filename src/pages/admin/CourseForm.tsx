import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { Loader2 } from 'lucide-react'
import ImageField from '@/components/admin/ImageField'
import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().optional(),
  duration: z.string().optional(),
  fee: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['active', 'inactive']).optional().default('active'),
  featured: z.boolean().optional(),
  homeOrder: z.coerce.number().optional(),
})

export default function CourseForm() {
  const { user, loading: authLoading } = useAuth()
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(isEdit)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, setValue, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'active', featured: false, homeOrder: 0 },
  })

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/courses/manage/${id}`)
        .then((res) => reset(res.data))
        .catch(() => toast.error('Failed to load course'))
        .finally(() => setLoading(false))
    }
  }, [id, isEdit, reset])

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    try {
      if (isEdit && id) {
        await api.put(`/courses/${id}`, data)
        toast.success('Course updated')
      } else {
        await api.post('/courses', data)
        toast.success('Course created')
      }
      navigate('/admin/courses')
    } catch (err) {
      const msg = getErrorMessage(err)
      toast.error(msg)
      if (msg.toLowerCase().includes('admin')) {
        navigate('/admin/login')
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (authLoading || loading) return <LoadingSpinner />

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">{isEdit ? 'Edit Course' : 'Add Course'}</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div>
          <Label>Title</Label>
          <Input {...register('title')} className="mt-1 text-base" />
        </div>
        <div>
          <Label>Slug</Label>
          <Input {...register('slug')} className="mt-1 text-base" placeholder="jee-main-advanced" />
        </div>
        <div>
          <Label>Category</Label>
          <Select value={watch('category') || ''} onValueChange={(val) => setValue('category', val)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <Label>Duration</Label>
            <Input {...register('duration')} className="mt-1 text-base" />
          </div>
          <div>
            <Label>Fee</Label>
            <Input {...register('fee')} className="mt-1 text-base" />
          </div>
        </div>
        <input type="hidden" {...register('image')} />
        <ImageField
          label="Course image"
          value={watch('image') || ''}
          onChange={(url) => setValue('image', url)}
          hint="Paste a URL or upload an image file."
        />
        <div>
          <Label>Description</Label>
          <Textarea {...register('description')} className="mt-1 text-base" rows={4} />
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 sm:items-end">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 w-full">
            <input type="checkbox" id="featured" {...register('featured')} className="h-4 w-4 flex-shrink-0" />
            <Label htmlFor="featured" className="cursor-pointer text-sm sm:text-base">
              Show in <strong>Popular Courses</strong> on home page
            </Label>
          </div>
          <div className="w-full sm:w-40">
            <Label>Home display order</Label>
            <Input type="number" {...register('homeOrder')} className="mt-1 text-base" />
          </div>
        </div>
        <div>
          <Label>Status</Label>
          <Select value={watch('status')} onValueChange={(val) => setValue('status', val as 'active' | 'inactive')}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-primary text-white" disabled={submitting}>
            {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Course'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/courses')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
