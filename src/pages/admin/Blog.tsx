import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import ImageField from '@/components/admin/ImageField'

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm({ defaultValues: { status: 'draft' } })

  const fetch = () =>
    api.get('/blog/manage/all')
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false))

  useEffect(() => { fetch() }, [])

  const onSubmit = async (data: any) => {
    try {
      await api.post('/blog', data)
      toast.success('Post created')
      reset()
      setShowForm(false)
      fetch()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/blog/${id}`)
      toast.success('Deleted')
      fetch()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button className="bg-primary text-white" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Post'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Title *</Label>
              <Input {...register('title', { required: true })} className="mt-1" />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input {...register('slug', { required: true })} className="mt-1" />
            </div>
          </div>
          <div>
            <Label>Excerpt</Label>
            <Input {...register('excerpt')} className="mt-1" />
          </div>
          <input type="hidden" {...register('image')} />
          <ImageField
            label="Cover image"
            value={watch('image') || ''}
            onChange={(url) => setValue('image', url)}
          />
          <div>
            <Label>Content *</Label>
            <Textarea {...register('content', { required: true })} className="mt-1" rows={6} />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
              <SelectTrigger className="mt-1 w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="bg-primary text-white">Publish / Save</Button>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((p) => (
              <TableRow key={p._id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>
                  <Badge variant={p.status === 'published' ? 'default' : 'secondary'}>{p.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="destructive" onClick={() => deletePost(p._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
