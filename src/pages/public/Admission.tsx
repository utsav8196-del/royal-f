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
            <h1 className="text-center text-4xl font-bold">Admission Enquiry</h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
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
