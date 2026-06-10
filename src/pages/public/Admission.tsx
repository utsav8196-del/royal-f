import AdmissionForm from '@/components/forms/AdmissionForm'
import PageMeta from '@/components/layout/PageMeta'
import AnimatedSection from '@/components/public/AnimatedSection'

export default function Admission() {
  return (
    <>
      <PageMeta title="Admission" description="Submit an admission enquiry to Royal Academy." />
      <section
        className="relative flex min-h-[40vh] items-center bg-cover bg-center bg-no-repeat sm:min-h-[50vh] md:min-h-[60vh]"
        style={{ backgroundImage: "url('/images/about-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-primary/80" />
        <AnimatedSection className="relative z-10 w-full px-4 py-12 text-center text-white sm:py-16 md:py-20">
          <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">Admission Enquiry</h1>
          <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-blue-50 sm:mt-4 sm:text-lg md:text-xl">
            Fill in your details and our team will reach out within 24 hours.
          </p>
        </AnimatedSection>
      </section>

      <div className="py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div>
            <AdmissionForm />
          </div>
        </div>
      </div>
    </>
  )
}
