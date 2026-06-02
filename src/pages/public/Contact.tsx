import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import AnimatedSection from '@/components/public/AnimatedSection'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }

export default function Contact() {
  const [settings, setSettings] = useState({
    address: 'Royal Academy, Rajkot - 360001, Gujarat',
    phone: '+91 98765 43210',
    email: 'info@royalacademy.com',
  })

  useEffect(() => {
    // Try to fetch from backend – if fails, fallback to default
    axios.get('http://localhost:5000/api/settings')
      .then(res => {
        if (res.data) setSettings(prev => ({ ...prev, ...res.data }))
      })
      .catch(() => {})
  }, [])

  const contactDetails = [
    { icon: MapPin, label: 'Address', value: settings.address },
    { icon: Phone, label: 'Phone', value: settings.phone },
    { icon: Mail, label: 'Email', value: settings.email },
    { icon: Clock, label: 'Working Hours', value: 'Mon – Sat : 8 AM – 8 PM' },
  ]

  return (
    <div>
      {/* Hero Section with background gradient */}
      <section className="relative bg-gradient-to-br from-primary to-primary/70 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-4 text-lg opacity-90 max-w-2xl mx-auto"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid gap-12 lg:grid-cols-3">
          
          {/* Left Column – Contact Details */}
          <div className="space-y-6 lg:col-span-1">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm"
                >
                  <detail.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{detail.label}</h3>
                    <p className="text-gray-600 text-sm">{detail.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Google Maps Embed (static iframe) */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.529272871115!2d70.8023293150091!3d22.30349948532181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca9b3e6d7b0f%3A0x8b8c9b3e6d7b0f!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column – Form */}
          <div className="lg:col-span-2">
            <AnimatedSection direction="right">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  )
}