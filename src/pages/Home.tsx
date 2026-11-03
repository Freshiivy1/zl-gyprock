import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import Intro from '@/components/home/Intro'
import ServicesPreview from '@/components/home/ServicesPreview'
import ProcessStrip from '@/components/home/ProcessStrip'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Testimonials from '@/components/home/Testimonials'
import QuoteCTA from '@/components/QuoteCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Intro />
      <ServicesPreview />
      <ProcessStrip />
      <FeaturedProjects />
      <Testimonials />
      <QuoteCTA />
    </>
  )
}
