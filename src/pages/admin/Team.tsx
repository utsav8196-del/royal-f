import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import ImageField from '@/components/admin/ImageField'
import AdminImageBox from '@/components/admin/AdminImageBox'
import { Trash2, GraduationCap } from 'lucide-react'

export default function AdminTeam() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: '',
      role: '',
      bio: '',
      image: '',
    },
  })

  const fetchMembers = () =>
    api
      .get('/team/manage/all')
      .then((res) => setMembers(res.data))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchMembers()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    try {
      await api.post('/team', data)
      toast.success('Faculty member added')
      reset()
      setShowForm(false)
      fetchMembers()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm('Delete this faculty member?')) return
    try {
      await api.delete(`/team/${id}`)
      toast.success('Deleted')
      fetchMembers()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Faculty</h1>
            <p className="text-sm text-slate-600">Shown on the About page — Meet Our Faculty</p>
          </div>
        </div>
        <Button
          className="w-full bg-primary text-white sm:w-auto"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Faculty'}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 w-full space-y-4 rounded-xl border border-primary/20 bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 className="text-lg font-semibold">New faculty member</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <Label>Name *</Label>
              <Input {...register('name', { required: true })} className="mt-1" placeholder="Dr. Example" />
            </div>
            <div>
              <Label>Subject / role *</Label>
              <Input {...register('role', { required: true })} className="mt-1" placeholder="Physics — NEET" />
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea {...register('bio')} className="mt-1" rows={3} placeholder="Short introduction..." />
          </div>
          <div>
            <input type="hidden" {...register('image')} />
            <ImageField
              label="Photo"
              value={watch('image') || ''}
              onChange={(url) => setValue('image', url)}
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-white sm:w-auto">
            Save faculty
          </Button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div key={m._id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
            {m.image && (
              <AdminImageBox
                src={m.image}
                alt={m.name}
                aspect="4/3"
                size="sm"
                className="rounded-none border-0 border-b"
              />
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0 text-red-600 hover:bg-red-50"
                  type="button"
                  onClick={() => deleteMember(m._id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              {m.bio && <p className="mt-2 line-clamp-3 text-sm text-slate-600">{m.bio}</p>}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <p className="mt-8 text-center text-slate-500">
          No faculty yet. Click &quot;Add New Faculty&quot; to add your first teacher.
        </p>
      )}

      <div className="mt-8 hidden overflow-hidden rounded-xl border bg-white shadow-sm sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m._id}>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="destructive" type="button" onClick={() => deleteMember(m._id)}>
                    Delete
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
