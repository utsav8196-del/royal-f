import AdmissionForm from '@/components/forms/AdmissionForm'
import PageMeta from '@/components/layout/PageMeta'
import AnimatedSection from '@/components/public/AnimatedSection'

export default function Admission() {
  return (
    <>
      <PageMeta title="Admission" description="Submit an admission enquiry to Royal Academy." />
      <div className="page-section">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <h1 className="text-center text-3xl font-bold sm:text-4xl">Admission Enquiry</h1>
            <p className="mx-auto mt-3 max-w-xl px-2 text-center text-sm text-slate-600 sm:mt-4 sm:text-base">
              Fill in your details and our team will reach out within 24 hours.
            </p>
          </AnimatedSection>
          <div className="mt-10">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </>
  )
}
