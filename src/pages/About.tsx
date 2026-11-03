import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import Values from '@/components/about/Values'
import Credentials from '@/components/about/Credentials'
import ServiceArea from '@/components/about/ServiceArea'
import CraftStatement from '@/components/about/CraftStatement'
import QuoteCTA from '@/components/QuoteCTA'

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Values />
      <Credentials />
      <ServiceArea />
      <CraftStatement />
      <QuoteCTA />
    </>
  )
}
