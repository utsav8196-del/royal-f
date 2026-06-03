import { Card, CardContent } from '@/components/ui/card'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_PLACEHOLDER } from '@/lib/images'

interface Testimonial {
  _id: string
  name: string
  role?: string
  image?: string
  rating: number
  message: string
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="min-w-[280px] p-4">
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <ResponsiveImage
            src={testimonial.image}
            alt={testimonial.name}
            fallbackSrc={IMAGE_PLACEHOLDER}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            {testimonial.role && <p className="text-xs text-gray-500">{testimonial.role}</p>}
          </div>
        </div>
        <div className="flex text-yellow-500">
          {'★'.repeat(testimonial.rating)}
          {'☆'.repeat(5 - testimonial.rating)}
        </div>
        <p className="text-sm text-gray-600">{testimonial.message}</p>
      </CardContent>
    </Card>
  )
}
