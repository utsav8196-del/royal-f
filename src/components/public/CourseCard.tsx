import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { IMAGE_PLACEHOLDER } from '@/lib/images'

interface Course {
  _id: string
  title: string
  slug: string
  image?: string
  duration: string
  fee: string
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }}>
      <Card className="overflow-hidden shadow-md">
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <ResponsiveImage
            src={course.image}
            alt={course.title}
            fallbackSrc={IMAGE_PLACEHOLDER}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold">{course.title}</h3>
          <div className="mt-2 flex justify-between text-sm text-gray-600">
            <span>⏱️ {course.duration}</span>
            <span>💰 {course.fee}</span>
          </div>
          <Button asChild className="mt-4 w-full bg-primary text-white">
            <Link to={`/courses/${course.slug}`}>View Details</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
