import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(10),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post('http://localhost:5000/api/contact', data)
      toast.success('Message sent!')
      reset()
    } catch {
      toast.error('Failed to send.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label>Name</Label>
        <Input {...register('name')} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <Label>Phone</Label>
        <Input {...register('phone')} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>
      <div>
        <Label>Subject</Label>
        <Input {...register('subject')} />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>
      <div>
        <Label>Message</Label>
        <Textarea {...register('message')} />
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full">Send Message</Button>
    </form>
  )
}