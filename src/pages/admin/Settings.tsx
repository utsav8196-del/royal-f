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
import { Loader2, Mail, MapPin, Phone } from 'lucide-react'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, reset, setValue, watch } = useForm()

  useEffect(() => {
    api
      .get('/settings')
      .then((res) => reset(res.data))
      .finally(() => setLoading(false))
  }, [reset])

  const onSubmit = async (data: Record<string, unknown>) => {
    setSubmitting(true)
    try {
      await api.put('/settings', data)
      window.dispatchEvent(new Event('site-settings-updated'))
      toast.success('Settings saved — footer & site updated')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-slate-600">
        Changes here update the footer, contact page, and site-wide details automatically.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-6"
      >
        {/* Footer & contact — primary section */}
        <section className="space-y-4 rounded-xl border border-primary/20 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-slate-900">Footer & contact info</h2>
          </div>
          <p className="text-sm text-slate-500">
            Phone, email, and address shown in the website footer and on the Contact page.
          </p>
          <div>
            <Label className="flex items-center gap-1">
              <Phone size={14} /> Phone number
            </Label>
            <Input {...register('phone')} className="mt-1" placeholder="+91 9876543210" />
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <Mail size={14} /> Email
            </Label>
            <Input type="email" {...register('email')} className="mt-1" placeholder="info@royalacademy.com" />
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <MapPin size={14} /> Address
            </Label>
            <Textarea {...register('address')} className="mt-1" rows={2} placeholder="Rajkot, Gujarat" />
          </div>
          <div>
            <Label>Working hours</Label>
            <Input {...register('workingHours')} className="mt-1" placeholder="Mon – Sat : 8 AM – 8 PM" />
          </div>
        </section>

        {/* General site */}
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">General site</h2>
          <input type="hidden" {...register('logoUrl')} />
          <ImageField
            label="Site logo"
            value={watch('logoUrl') || ''}
            onChange={(url) => setValue('logoUrl', url)}
            hint="Shown in header and footer."
            logoPreview
          />
          <div>
            <Label>Site name</Label>
            <Input {...register('siteName')} className="mt-1" />
          </div>
          <div>
            <Label>Tagline (footer)</Label>
            <Input {...register('tagline')} className="mt-1" />
          </div>
          <div>
            <Label>JustDial profile URL</Label>
            <Input {...register('justDialUrl')} className="mt-1" />
          </div>
        </section>

        {/* Home hero */}
        <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Home page hero</h2>
          <div>
            <Label>Hero title</Label>
            <Input {...register('heroTitle')} className="mt-1" />
          </div>
          <div>
            <Label>Hero subtitle</Label>
            <Textarea {...register('heroSubtitle')} className="mt-1" rows={2} />
          </div>
          <p className="text-sm text-slate-500">
            More home sections:{' '}
            <Link to="/admin/home" className="font-medium text-primary underline">
              Admin → Home Page
            </Link>
          </p>
        </section>

        <Button type="submit" className="w-full bg-primary text-white sm:w-auto" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            'Save all settings'
          )}
        </Button>
      </form>
    </div>
  )
}
