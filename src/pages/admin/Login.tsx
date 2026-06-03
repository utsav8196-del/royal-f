import { useState, useEffect } from 'react'
import { useAuth, getErrorMessage } from '@/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PageMeta from '@/components/layout/PageMeta'
import Logo from '@/components/brand/Logo'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

type FormData = z.infer<typeof schema>

export default function AdminLogin() {
  const { login, logout, user, token, loading } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && token && user?.role === 'admin') {
      navigate('/admin', { replace: true })
    }
  }, [loading, token, user, navigate])
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const user = await login(data.email, data.password)
      if (user.role !== 'admin') {
        logout()
        toast.error('This account is not an admin. Use student login at /login instead.')
        return
      }
      toast.success('Welcome, Admin!')
      navigate('/admin')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageMeta title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-primary to-slate-800 px-4">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        >
          <div className="mb-4 flex justify-center">
            <Logo linkToHome />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in with administrator credentials</p>
          <div className="mt-6 space-y-4">
            <div>
              <Label>Email</Label>
              <Input type="email" {...register('email')} className="mt-1" />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" {...register('password')} className="mt-1" />
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-primary text-white" disabled={submitting}>
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Login'}
            </Button>
          </div>
          <p className="mt-4 text-center text-sm">
            <Link to="/" className="text-slate-500 hover:text-primary">← Back to website</Link>
          </p>
        </motion.form>
      </div>
    </>
  )
}
