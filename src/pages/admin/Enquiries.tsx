import { useEffect, useState } from 'react'
import { api, getErrorMessage } from '@/lib/api'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/public/LoadingSpinner'
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
      <h1 className="text-2xl font-bold">Admission Enquiries</h1>
      <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
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
                <TableCell>{enq.email}</TableCell>
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
  )
}
