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
      <Card className="overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-lg dark:shadow-lg">
        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <ResponsiveImage
            src={course.image}
            alt={course.title}
            fallbackSrc={IMAGE_PLACEHOLDER}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-4 dark:bg-slate-900">
          <h3 className="text-xl font-semibold dark:text-slate-100">{course.title}</h3>
          <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>⏱️ {course.duration}</span>
            <span>💰 {course.fee}</span>
          </div>
          <Button asChild className="mt-4 w-full bg-primary text-white hover:bg-blue-700 dark:hover:bg-blue-800">
            <Link to={`/courses/${course.slug}`}>View Details</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
