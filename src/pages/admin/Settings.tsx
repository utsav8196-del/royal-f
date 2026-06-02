import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getErrorMessage } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import LoadingSpinner from '@/components/public/LoadingSpinner'
import ImageField from '@/components/admin/ImageField'
import { Loader2 } from 'lucide-react'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm()

  useEffect(() => {
    api.get('/settings')
      .then((res) => reset(res.data))
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data: Record<string, unknown>) => {
    setSubmitting(true)
    try {
      await api.put('/settings', data)
      window.dispatchEvent(new Event('site-settings-updated'))
      toast.success('Settings saved')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Site Settings</h1>
      <p className="mt-1 text-slate-600">Manage global website content from the admin panel</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <input type="hidden" {...register('logoUrl')} />
        <ImageField
          label="Site logo"
          value={watch('logoUrl') || ''}
          onChange={(url) => setValue('logoUrl', url)}
          hint="Default: /logo.png. Upload your ROYAL logo file or paste a URL."
          logoPreview
        />
        <div>
          <Label>JustDial profile URL</Label>
          <Input {...register('justDialUrl')} className="mt-1" />
        </div>
        <div>
          <Label>Site Name</Label>
          <Input {...register('siteName')} className="mt-1" />
        </div>
        <div>
          <Label>Tagline</Label>
          <Input {...register('tagline')} className="mt-1" />
        </div>
        <div>
          <Label>Hero Title</Label>
          <Input {...register('heroTitle')} className="mt-1" />
        </div>
        <div>
          <Label>Hero Subtitle</Label>
          <Textarea {...register('heroSubtitle')} className="mt-1" rows={2} />
        </div>
        <p className="text-sm font-medium text-slate-700">
          Home sections are also managed under{' '}
          <Link to="/admin/home" className="text-primary underline">Admin → Home Page</Link>.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Footer Phone</Label>
            <Input {...register('phone')} className="mt-1" placeholder="+91 9876543210" />
          </div>
          <div>
            <Label>Footer Email</Label>
            <Input {...register('email')} className="mt-1" placeholder="info@royalacademy.com" />
          </div>
        </div>
        <div>
          <Label>Footer Address</Label>
          <Input {...register('address')} className="mt-1" placeholder="Rajkot, Gujarat" />
        </div>
        <Button type="submit" className="bg-primary text-white" disabled={submitting}>
          {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Settings'}
        </Button>
      </form>
    </div>
  )
}
