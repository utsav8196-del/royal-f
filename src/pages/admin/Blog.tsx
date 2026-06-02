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
import { Trash2 } from 'lucide-react'

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm({ 
    defaultValues: { 
      status: 'draft',
      title: '',
      slug: '',
      excerpt: '',
      image: '',
      content: ''
    } 
  })

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
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button className="w-full bg-primary text-white sm:w-auto" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Post'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 w-full space-y-4 rounded-xl border bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-3 grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <div>
              <Label>Title *</Label>
              <Input {...register('title', { required: true })} className="mt-1 text-base" />
            </div>
            <div>
              <Label>Slug *</Label>
              <Input {...register('slug', { required: true })} className="mt-1 text-base" />
            </div>
          </div>
          <div>
            <Label>Excerpt</Label>
            <Input {...register('excerpt')} className="mt-1 text-base" />
          </div>
          <input type="hidden" {...register('image')} />
          <ImageField
            label="Cover image"
            value={watch('image') || ''}
            onChange={(url) => setValue('image', url)}
          />
          <div>
            <Label>Content *</Label>
            <Textarea {...register('content', { required: true })} className="mt-1 text-base" rows={6} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <div>
              <Label>Status</Label>
              <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
                <SelectTrigger className="mt-1 sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-primary text-white sm:w-auto">Publish / Save</Button>
          </div>
        </form>
      )}

      {/* Mobile: Card View */}
      <div className="grid gap-3 sm:hidden">
        {posts.map((post) => (
          <div key={post._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900 flex-1">{post.title}</h3>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50 flex-shrink-0"
                onClick={() => deletePost(post._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center gap-2">
                <span className="text-slate-600">Status:</span>
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
              </div>
              {post.excerpt && (
                <p className="text-slate-600 line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
            No posts yet
          </div>
        )}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="sm" variant="destructive" onClick={() => deletePost(post._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500">
                    No posts yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
