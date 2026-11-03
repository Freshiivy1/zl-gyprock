import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { getLenis } from '@/lib/lenis'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const SERVICE_CHIPS = [
  { id: 'installation', label: 'Installation' },
  { id: 'repairs', label: 'Repairs' },
  { id: 'plastering', label: 'Plastering' },
  { id: 'cornice', label: 'Cornice' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'renovations', label: 'Renovations' },
]

export function scrollToService(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) lenis.scrollTo(el, { offset: -96, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ServicesHero() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string>('installation')

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.sv-eyebrow-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.2)
        .fromTo('.sv-eyebrow-text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.3)
        .fromTo(
          '.sv-line-inner',
          { yPercent: reduced ? 0 : 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.12 },
          0.4,
        )
        .fromTo('.sv-body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.0)
        .fromTo(
          '.sv-chip',
          { y: reduced ? 0 : 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          1.1,
        )
        .fromTo('.sv-plumb', { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, 0.3)
    },
    { scope: root },
  )

  // Track which service block is in view to highlight the chip nav
  useEffect(() => {
    const sections = SERVICE_CHIPS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={root}
      className="relative -mt-16 flex min-h-[55dvh] flex-col justify-end overflow-hidden bg-charcoal md:-mt-20"
    >
      {/* Faint diagonal board-joint texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #2C2925 0px, #2C2925 1px, transparent 1px, transparent 14px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="flex gap-6">
          {/* Amber plumb line */}
          <div
            className="sv-plumb hidden w-0.5 shrink-0 origin-top self-start bg-amber md:block md:h-[120px]"
            aria-hidden="true"
          />
          <div>
            <span className="inline-flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-amber md:text-[13px]">
              <span className="sv-eyebrow-rule inline-block h-0.5 w-6 origin-left bg-amber" />
              <span className="sv-eyebrow-text">Our Services</span>
            </span>
            <h1 className="mt-5 font-display text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[80px]">
              <span className="block overflow-hidden">
                <span className="sv-line-inner block will-change-transform">Every wall.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="sv-line-inner block will-change-transform">
                  Every <span className="text-amber">finish.</span>
                </span>
              </span>
            </h1>
            <p className="sv-body mt-6 max-w-[520px] text-[15px] leading-[1.7] text-bone-soft md:text-base">
              From a single patch to a full commercial fit-out — one crew, one standard: flawless.
            </p>
          </div>
        </div>

        {/* Anchor chip nav */}
        <nav
          className="mt-10 flex gap-3 overflow-x-auto pb-1 md:mt-12 md:flex-wrap md:overflow-visible"
          aria-label="Jump to a service"
        >
          {SERVICE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => scrollToService(chip.id)}
              className={`sv-chip shrink-0 whitespace-nowrap border px-5 py-2.5 font-display text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                active === chip.id
                  ? 'border-amber text-amber'
                  : 'border-line-dark text-bone-soft hover:border-amber hover:text-amber'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}
