import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { Pencil, Trash2 } from 'lucide-react'
import ImageField from '@/components/admin/ImageField'
import AdminImageBox from '@/components/admin/AdminImageBox'

export default function AdminGallery() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { 
      status: 'active', 
      category: 'general', 
      order: 0,
      title: '',
      url: '',
    },
  })

  const fetchItems = () =>
    api.get('/gallery/manage/all')
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchItems()
  }, [])

  const openCreate = () => {
    setEditingId(null)
    reset({ status: 'active', category: 'general', order: items.length })
    setShowForm(true)
  }

  const openEdit = (item: any) => {
    setEditingId(item._id)
    reset({
      title: item.title,
      url: item.url,
      category: item.category || 'general',
      order: item.order ?? 0,
      status: item.status,
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
  }

  const onSubmit = async (data: any) => {
    if (!data.url?.trim()) {
      toast.error('Add an image using URL or file upload')
      return
    }
    const payload = { ...data, order: Number(data.order) || 0 }
    try {
      if (editingId) {
        await api.put(`/gallery/${editingId}`, payload)
        toast.success('Photo updated')
      } else {
        await api.post('/gallery', payload)
        toast.success('Photo added')
      }
      closeForm()
      fetchItems()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this photo?')) return
    try {
      await api.delete(`/gallery/${id}`)
      toast.success('Deleted')
      fetchItems()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-2xl font-bold">Gallery Photos</h1>
        <p className="text-sm text-slate-600">Add, edit, and remove photos on the public Gallery page.</p>
      </div>
      <div className="mb-6 flex justify-end">
        <Button className="bg-primary text-white" onClick={() => (showForm ? closeForm() : openCreate())}>
          {showForm ? 'Cancel' : '+ Add photo'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input {...register('title')} className="mt-1" placeholder="Classroom" />
            </div>
            <div>
              <Label>Category</Label>
              <Input {...register('category')} className="mt-1" placeholder="campus, events" />
            </div>
          </div>
          <input type="hidden" {...register('url')} />
          <ImageField
            label="Photo"
            value={watch('url') || ''}
            onChange={(url) => setValue('url', url, { shouldValidate: true })}
            required
            hint="Use image URL or upload a file from your computer — either one works."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Sort order</Label>
              <Input type="number" {...register('order')} className="mt-1" />
            </div>
            <div>
              <Label>Status</Label>
              <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active — visible on site</SelectItem>
                  <SelectItem value="inactive">Inactive — hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="bg-primary text-white">
              {editingId ? 'Update photo' : 'Add photo'}
            </Button>
            <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <AdminImageBox src={item.url} alt={item.title || 'Gallery photo'} aspect="4/3" size="md" className="rounded-none border-0 border-b border-slate-200" />
            <div className="p-3">
              <p className="font-medium">{item.title || 'Untitled'}</p>
              <p className="text-xs text-slate-500">{item.category} · Order {item.order}</p>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>{item.status}</Badge>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" onClick={() => openEdit(item)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteItem(item._id)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && (
        <p className="mt-8 text-center text-slate-500">No gallery photos yet. Click &quot;Add photo&quot; to upload.</p>
      )}
    </div>
  )
}
