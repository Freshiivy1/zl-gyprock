import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATEMENT =
  'ZL GYPROCK IS A SYDNEY TEAM OF CAREER PLASTERERS. FROM NEW BUILDS TO HERITAGE CORNICE RESTORATION, WE DELIVER WALLS AND CEILINGS THAT BUILDERS PHOTOGRAPH.'

const STATS = [
  { value: 15, suffix: '+', label: 'Years on the tools' },
  { value: 1200, suffix: '+', label: 'Projects completed' },
  { value: 100, suffix: '%', label: 'Level 4–5 finish guarantee' },
]

export default function Intro() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Word-by-word scrub reveal (opacity 0.15 → 1 per word)
      const words = gsap.utils.toArray<HTMLElement>('.intro-word')
      if (reduced) {
        gsap.set(words, { opacity: 1 })
      } else {
        gsap.to(words, {
          opacity: 1,
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: '.intro-statement',
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
      }

      // Hairline dividers draw in
      gsap.fromTo(
        '.intro-divider',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.intro-stats', start: 'top 85%' },
        },
      )

      // Counter stats: count up 0 → target, 1.6s power2.out
      gsap.utils.toArray<HTMLElement>('.intro-count').forEach((el) => {
        const target = Number(el.dataset.target ?? '0')
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: reduced ? 0 : 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-AU')
          },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper py-24 md:py-[140px]">
      <div className="mx-auto max-w-[900px] px-6 text-center md:px-12">
        <span className="eyebrow">Who We Are</span>
        <p className="intro-statement mt-8 font-display text-[28px] font-bold uppercase leading-[1.2] tracking-[-0.015em] text-ink md:text-[40px]">
          {STATEMENT.split(' ').map((word, i) => (
            <span key={`${word}-${i}`} className="intro-word inline-block opacity-[0.15]">
              {word}
              {'\u00A0'}
            </span>
          ))}
        </p>

        <div className="intro-stats mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="relative px-6">
              {i > 0 && (
                <span
                  className="intro-divider absolute left-0 top-1/2 hidden h-16 w-px origin-left -translate-y-1/2 bg-line-light sm:block"
                  aria-hidden="true"
                />
              )}
              <p className="tnum font-display text-[48px] font-extrabold leading-none tracking-[-0.02em] text-ink md:text-[72px]">
                <span className="intro-count" data-target={stat.value}>
                  0
                </span>
                {stat.suffix}
              </p>
              <p className="mt-3 text-[13px] font-medium tracking-[0.04em] text-ink-soft">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/about"
          className="group mt-14 inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber-deep"
        >
          <span className="border-b border-transparent transition-colors duration-300 group-hover:border-amber-deep">
            More about us
          </span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
