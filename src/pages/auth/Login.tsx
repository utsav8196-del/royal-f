import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { useAuth, getErrorMessage } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageMeta from '@/components/layout/PageMeta'
import Logo from '@/components/brand/Logo'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const { login, user, token } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from || '/'
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (token && user) {
      navigate(user.role === 'admin' ? '/admin' : '/', { replace: true })
    }
  }, [token, user, navigate])
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const user = await login(data.email, data.password)
      toast.success(user.isFirstLogin ? `Welcome to Royal Academy, ${user.name}!` : `Welcome back, ${user.name}!`)
      navigate(user.role === 'admin' ? '/admin' : from)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageMeta title="Login" description="Sign in to your Royal Academy account" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-white px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
        >
          <div className="mb-4 flex justify-center">
            <Logo linkToHome />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Student Login</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in with your registered account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} className="mt-1" />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} className="mt-1" />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary text-white" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Log In'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-primary hover:underline">Register first</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/admin/login" className="text-slate-500 hover:text-primary">Admin login →</Link>
          </p>
          <p className="mt-2 text-center text-sm">
            <Link to="/" className="text-slate-500 hover:text-primary">Back to Home</Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}
