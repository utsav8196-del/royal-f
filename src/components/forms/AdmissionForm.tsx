import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { api, getErrorMessage } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  course: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function AdmissionForm() {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { user, token } = useAuth()

  const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    }
  })

  useEffect(() => {
    if (!token || !user) {
      toast.error('Please log in to submit an enquiry.')
      navigate('/login', { state: { from: '/admission' } })
    }
  }, [token, user, navigate])

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
    }
  }, [user, setValue])

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await api.post('/enquiries', data)
      toast.success('Enquiry submitted! We will contact you soon.')
      reset()
      setStep(1)
      navigate('/', { replace: true })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  const nextStep = async () => {
    if (step === 1) {
      const valid = await trigger(['name', 'email', 'phone'])
      if (valid) setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 flex-1 rounded-full transition-colors ${step >= s ? 'bg-primary' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <h2 className="text-xl font-bold">Personal Details</h2>
          <div>
            <Label>Name</Label>
            <Input {...register('name')} className="mt-1" />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register('email')} className="mt-1" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Phone</Label>
            <Input {...register('phone')} className="mt-1" />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>
          <Button type="button" className="bg-primary text-white" onClick={nextStep}>Next</Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Course Selection</h2>
          <div>
            <Label>Preferred Course</Label>
            <Select onValueChange={(val) => setValue('course', val)}>
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
          <div>
            <Label>Message (optional)</Label>
            <Textarea {...register('message')} className="mt-1" rows={3} />
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button type="button" className="bg-primary text-white" onClick={nextStep}>Next</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Confirmation</h2>
          <p className="text-slate-600">Review and submit your admission enquiry.</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button type="submit" className="bg-primary text-white" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Enquiry'}
            </Button>
          </div>
        </div>
      )}
    </form>
  )
}
