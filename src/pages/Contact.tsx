import ContactHero from '@/components/contact/ContactHero'
import QuoteForm from '@/components/contact/QuoteForm'
import ContactDetails from '@/components/contact/ContactDetails'
import FaqTeaser from '@/components/contact/FaqTeaser'

export default function Contact() {
  return (
    <>
      <ContactHero />

      {/* Section 2 — form + details split. Negative margin pulls the card over the hero. */}
      <section className="bg-paper pb-24 md:pb-32">
        <div className="container">
          <div className="-mt-[60px] grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <QuoteForm />
            </div>
            <div className="lg:col-span-5 lg:pt-[76px]">
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — FAQ teaser. Marquee + Footer are provided by the shared Layout.
          No Quote CTA band on this page — the page itself is the CTA. */}
      <FaqTeaser />
    </>
  )
}
