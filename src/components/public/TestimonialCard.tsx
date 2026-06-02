import { Card, CardContent } from '@/components/ui/card'
import { API_BASE } from '@/lib/api'

interface Testimonial {
  _id: string
  name: string
  role?: string
  image?: string
  rating: number
  message: string
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const imageUrl = testimonial.image
    ? testimonial.image.startsWith('http')
      ? testimonial.image
      : `${API_BASE}${testimonial.image.startsWith('/') ? testimonial.image : `/${testimonial.image}`}`
    : 'https://via.placeholder.com/40'

  return (
    <Card className="p-4 min-w-[280px]">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <img src={imageUrl} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            {testimonial.role && <p className="text-xs text-gray-500">{testimonial.role}</p>}
          </div>
        </div>
        <div className="flex text-yellow-500">{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</div>
        <p className="text-gray-600 text-sm">{testimonial.message}</p>
      </CardContent>
    </Card>
  )
}