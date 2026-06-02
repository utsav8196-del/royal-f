import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.image || 'https://via.placeholder.com/400x200'}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold">{course.title}</h3>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
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