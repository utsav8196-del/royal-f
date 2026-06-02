import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-gray-600">Page not found</p>
      <Button asChild className="mt-6">
        <Link to="/">Go Home</Link>
      </Button>
    </div>
  )
}