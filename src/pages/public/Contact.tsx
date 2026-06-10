import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import AnimatedSection from '@/components/public/AnimatedSection'
import PageMeta from '@/components/layout/PageMeta'
import { useSiteSettings } from '@/context/SiteSettingsContext'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }

export default function Contact() {
  const { address, phone, email, workingHours } = useSiteSettings()

  const contactDetails = [
    { icon: MapPin, label: 'Address', value: address },
    { icon: Phone, label: 'Phone', value: phone },
    { icon: Mail, label: 'Email', value: email },
    { icon: Clock, label: 'Working Hours', value: workingHours },
  ].filter((d) => d.value)

  return (
    <>
      <PageMeta title="Contact" description="Get in touch with Royal Academy Rajkot." />
      <div className="overflow-x-hidden">
        <section className="relative bg-gradient-to-br from-primary to-primary/70 py-12 text-white sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold sm:text-4xl md:text-5xl"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mx-auto mt-3 max-w-2xl text-base opacity-90 sm:mt-4 sm:text-lg"
            >
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </motion.p>
          </div>
        </section>

        <section className="bg-gray-50 py-10 sm:py-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:gap-12 lg:grid-cols-3">
            <div className="space-y-4 sm:space-y-6 lg:col-span-1">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6"
              >
                {contactDetails.map((detail) => (
                  <motion.div
                    key={detail.label}
                    variants={item}
                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm sm:gap-4"
                  >
                    <detail.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-1 sm:h-6 sm:w-6" />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">{detail.label}</h3>
                      <p className="break-words text-sm text-gray-600">{detail.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="h-48 overflow-hidden rounded-xl bg-white shadow-sm sm:h-64">
                <iframe
                  title="Royal Academy location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.529272871115!2d70.8023293150091!3d22.30349948532181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca9b3e6d7b0f%3A0x8b8c9b3e6d7b0f!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">Send us a Message</h2>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
