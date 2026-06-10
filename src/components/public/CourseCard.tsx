import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, IndianRupee } from 'lucide-react'
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
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden border-slate-200 shadow-sm transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <ResponsiveImage
            src={course.image}
            alt={course.title}
            fallbackSrc={IMAGE_PLACEHOLDER}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 min-h-[3.5rem] text-xl font-semibold text-slate-900">{course.title}</h3>
          <div className="mt-3 grid gap-2 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              {course.duration}
            </span>
            <span className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              {course.fee}
            </span>
          </div>
          <Button asChild className="mt-auto w-full bg-primary text-white">
            <Link to={`/courses/${course.slug}`}>View Details</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
