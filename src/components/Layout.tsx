import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import { getLenis, initLenis } from '@/lib/lenis'

export default function Layout() {
  const { pathname } = useLocation()

  // Lenis smooth scrolling site-wide (design.md §5)
  useEffect(() => {
    initLenis()
  }, [])

  // Reset scroll position on route change
  useEffect(() => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-[100dvh] bg-paper">
      <Navbar />
      {/* Nav is fixed (80px desktop / 64px mobile) — offset owned here.
          Full-bleed heroes opt out inside the page with a matching negative margin. */}
      <main className="pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
