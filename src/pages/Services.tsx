import { useEffect } from 'react'
import { useLocation } from 'react-router'
import ServicesHero, { scrollToService } from '@/components/services/ServicesHero'
import ServiceBlocks from '@/components/services/ServiceBlocks'
import FinishLevels from '@/components/services/FinishLevels'
import ServicesFaq from '@/components/services/ServicesFaq'
import QuoteCTA from '@/components/QuoteCTA'

export default function Services() {
  const { hash } = useLocation()

  // Handle deep links like /services#repairs (and footer slugs) with Lenis
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = window.setTimeout(() => scrollToService(id), 150)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      <ServicesHero />
      <ServiceBlocks />
      <FinishLevels />
      <ServicesFaq />
      <QuoteCTA />
    </>
  )
}
