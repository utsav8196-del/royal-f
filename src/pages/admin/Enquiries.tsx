import { useEffect, useState } from 'react'
import { api, getErrorMessage } from '@/lib/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import { Trash2 } from 'lucide-react'
import { format } from 'date-fns'

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = () =>
    api.get('/enquiries')
      .then((res) => setEnquiries(res.data))
      .finally(() => setLoading(false))

  useEffect(() => { fetch() }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/enquiries/${id}`, { status })
      toast.success('Status updated')
      fetch()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const deleteEnquiry = async (id: string) => {
    if (!confirm('Delete this enquiry?')) return
    try {
      await api.delete(`/enquiries/${id}`)
      toast.success('Deleted')
      fetch()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admission Enquiries</h1>
        <p className="mt-1 text-sm text-slate-600">Manage student admission inquiries</p>
      </div>

      {/* Mobile: Card View */}
      <div className="grid gap-3 sm:hidden">
        {enquiries.map((enq) => (
          <div key={enq._id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-2">
              <h3 className="font-semibold text-slate-900">{enq.name}</h3>
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={() => deleteEnquiry(enq._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="truncate text-right">{enq.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Phone:</span>
                <span>{enq.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Course:</span>
                <span>{enq.course || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span>{format(new Date(enq.createdAt), 'dd MMM yyyy')}</span>
              </div>
              <div className="flex justify-between items-center gap-2 pt-2">
                <span className="text-slate-600">Status:</span>
                <Select value={enq.status} onValueChange={(v) => updateStatus(enq._id, v)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ))}
        {enquiries.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
            No enquiries yet
          </div>
        )}
      </div>

      {/* Desktop: Table View */}
      <div className="hidden sm:block overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enq) => (
                <TableRow key={enq._id}>
                  <TableCell>{enq.name}</TableCell>
                  <TableCell className="text-sm">{enq.email}</TableCell>
                  <TableCell>{enq.phone}</TableCell>
                  <TableCell>{enq.course || '—'}</TableCell>
                  <TableCell>
                    <Select value={enq.status} onValueChange={(v) => updateStatus(enq._id, v)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{format(new Date(enq.createdAt), 'dd MMM yyyy')}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive" onClick={() => deleteEnquiry(enq._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
              {enquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-slate-500">No enquiries yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
