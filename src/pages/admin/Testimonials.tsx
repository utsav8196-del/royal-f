import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import ImageField from '@/components/admin/ImageField'

export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { status: 'active', showOnHome: true, rating: 5, homeOrder: 0 },
  })

  const fetchItems = () =>
    api.get('/testimonials/manage/all')
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchItems()
  }, [])

  const openCreate = () => {
    setEditingId(null)
    reset({ status: 'active', showOnHome: true, rating: 5, homeOrder: 0 })
    setShowForm(true)
  }

  const openEdit = (item: any) => {
    setEditingId(item._id)
    reset({
      name: item.name,
      role: item.role,
      message: item.message,
      rating: item.rating,
      image: item.image,
      status: item.status,
      showOnHome: item.showOnHome !== false,
      homeOrder: item.homeOrder ?? 0,
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    reset({ status: 'active', showOnHome: true, rating: 5, homeOrder: 0 })
  }

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      rating: Number(data.rating) || 5,
      homeOrder: Number(data.homeOrder) || 0,
      showOnHome: data.showOnHome === true || data.showOnHome === 'true',
    }
    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload)
        toast.success('Testimonial updated')
      } else {
        await api.post('/testimonials', payload)
        toast.success('Testimonial added')
      }
      closeForm()
      fetchItems()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await api.delete(`/testimonials/${id}`)
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
        <h1 className="text-2xl font-bold">What Our Students Say</h1>
        <p className="text-sm text-slate-600">Manage student reviews shown on the home page and across the site.</p>
      </div>
      <div className="mb-6 flex justify-between">
        <Button variant="outline" asChild>
          <Link to="/admin/home">← Home page controls</Link>
        </Button>
        <Button className="bg-primary text-white" onClick={() => (showForm ? closeForm() : openCreate())}>
          {showForm ? 'Cancel' : '+ Add review'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 grid gap-4 rounded-xl border bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          <div>
            <Label>Student name *</Label>
            <Input {...register('name', { required: true })} className="mt-1" />
          </div>
          <div>
            <Label>Role / course</Label>
            <Input {...register('role')} className="mt-1" placeholder="JEE Student" />
          </div>
          <div className="sm:col-span-2">
            <Label>Review message *</Label>
            <Textarea {...register('message', { required: true })} className="mt-1" rows={3} />
          </div>
          <div className="sm:col-span-2">
            <input type="hidden" {...register('image')} />
            <ImageField
              label="Student photo (optional)"
              value={watch('image') || ''}
              onChange={(url) => setValue('image', url)}
            />
          </div>
          <div>
            <Label>Rating (1–5)</Label>
            <Input type="number" min={1} max={5} {...register('rating')} className="mt-1" />
          </div>
          <div>
            <Label>Display order</Label>
            <Input type="number" {...register('homeOrder')} className="mt-1" />
          </div>
          <div>
            <Label>Status</Label>
            <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Show on home page</Label>
            <Select
              value={watch('showOnHome') ? 'yes' : 'no'}
              onValueChange={(v) => setValue('showOnHome', v === 'yes')}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes — What Our Students Say</SelectItem>
                <SelectItem value="no">No — hide from home</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 sm:col-span-2">
            <Button type="submit" className="bg-primary text-white">
              {editingId ? 'Update review' : 'Save review'}
            </Button>
            <Button type="button" variant="outline" onClick={closeForm}>Cancel</Button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Home</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((t) => (
              <TableRow key={t._id}>
                <TableCell>
                  <p className="font-medium">{t.name}</p>
                  <p className="line-clamp-2 max-w-xs text-xs text-slate-500">{t.message}</p>
                </TableCell>
                <TableCell>{t.rating}/5</TableCell>
                <TableCell>
                  {t.showOnHome !== false ? (
                    <Badge className="bg-primary">On home</Badge>
                  ) : (
                    <Badge variant="secondary">Hidden</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={t.status === 'active' ? 'default' : 'secondary'}>{t.status}</Badge>
                </TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => openEdit(t)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteItem(t._id)}>
                    <Trash2 size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
