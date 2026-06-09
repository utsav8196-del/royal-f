import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api, getErrorMessage } from '@/lib/api'
import toast from 'react-hot-toast'
import { Loader2, Star } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  role: z.string().optional(),
  message: z.string().min(10, 'Review must be at least 10 characters'),
  rating: z.number().min(1, 'Rating is required').max(5),
})

type FormData = z.infer<typeof schema>

interface ReviewFormProps {
  onSuccess?: () => void
}

export default function ReviewForm({ onSuccess }: ReviewFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0 }
  })

  const rating = watch('rating')

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      await api.post('/testimonials', data)
      toast.success('Thank you for your review!')
      reset()
      setHoverRating(0)
      onSuccess?.()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="John Doe" {...register('name')} className="mt-1" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="role">Your Role (Optional)</Label>
        <Input id="role" placeholder="e.g., JEE Student, NEET Student" {...register('role')} className="mt-1" />
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
      </div>

      <div>
        <Label>Rating</Label>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue('rating', star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`transition-colors ${
                  (hoverRating || rating) >= star
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>}
      </div>

      <div>
        <Label htmlFor="message">Your Review</Label>
        <Textarea
          id="message"
          placeholder="Share your experience with Royal Academy..."
          {...register('message')}
          className="mt-1"
          rows={4}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-primary text-white" disabled={submitting}>
        {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Review'}
      </Button>
    </form>
  )
}
