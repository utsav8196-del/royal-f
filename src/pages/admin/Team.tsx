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
import { Trash2 } from 'lucide-react'

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
    }
  })

  const fetch = () =>
    api.get('/team/manage/all')
      .then((res) => setMembers(res.data))
      .finally(() => setLoading(false))

  useEffect(() => { fetch() }, [])

  const onSubmit = async (data: any) => {
    try {
      await api.post('/team', data)
      toast.success('Team member added')
      reset()
      setShowForm(false)
      fetch()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm('Delete?')) return
    try {
      await api.delete(`/team/${id}`)
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
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button className="w-full bg-primary text-white sm:w-auto" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Member'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 w-full space-y-4 rounded-xl border bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-3 grid-cols-1 sm:gap-4 sm:grid-cols-2">
            <div>
              <Label>Name *</Label>
              <Input {...register('name', { required: true })} className="mt-1 text-base" />
            </div>
            <div>
              <Label>Role *</Label>
              <Input {...register('role', { required: true })} className="mt-1 text-base" />
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <Textarea {...register('bio')} className="mt-1 text-base" rows={3} />
          </div>
          <div>
            <input type="hidden" {...register('image')} />
            <ImageField
              label="Profile photo"
              value={watch('image') || ''}
              onChange={(url) => setValue('image', url)}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full bg-primary text-white sm:w-auto">Save</Button>
          </div>
        </form>
      )}

      {/* Mobile: Card View */}
      <div className="grid gap-3 sm:hidden">
        {members.map((m) => (
          <div key={m._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-slate-900">{m.name}</h3>
                <p className="text-sm text-slate-600">{m.role}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50 flex-shrink-0"
                onClick={() => deleteMember(m._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            {m.bio && <p className="text-sm text-slate-600 line-clamp-2">{m.bio}</p>}
          </div>
        ))}
        {members.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
            No team members yet
          </div>
        )}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden overflow-hidden rounded-xl border bg-white shadow-sm sm:block">
        <div className="overflow-x-auto">
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
                  <TableCell className="flex justify-end gap-2">
                    <Button size="sm" variant="destructive" onClick={() => deleteMember(m._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-slate-500">
                    No team members yet
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
