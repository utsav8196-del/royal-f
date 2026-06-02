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

export default function AdminTeam() {
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm()

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
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button className="bg-primary text-white" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Member'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-6 grid gap-4 rounded-xl border bg-white p-6 shadow-sm sm:grid-cols-2">
          <div>
            <Label>Name *</Label>
            <Input {...register('name', { required: true })} className="mt-1" />
          </div>
          <div>
            <Label>Role *</Label>
            <Input {...register('role', { required: true })} className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <Label>Bio</Label>
            <Textarea {...register('bio')} className="mt-1" />
          </div>
          <div className="sm:col-span-2">
            <input type="hidden" {...register('image')} />
            <ImageField
              label="Profile photo"
              value={watch('image') || ''}
              onChange={(url) => setValue('image', url)}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="bg-primary text-white">Save</Button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((m) => (
              <TableRow key={m._id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell>
                  <Button size="sm" variant="destructive" onClick={() => deleteMember(m._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
