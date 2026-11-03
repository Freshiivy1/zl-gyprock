import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STEPS = [
  {
    n: '01',
    title: 'Measure & Quote',
    body: 'Site visit or plans assessment. Fixed, itemised quote within 24 hours.',
  },
  {
    n: '02',
    title: 'Set & Sheet',
    body: 'Framing checked, sheets hung, joints set. Clean site, daily.',
  },
  {
    n: '03',
    title: 'Flush & Finish',
    body: 'Three-coat flush, sanded between coats. Level 5 on request.',
  },
  {
    n: '04',
    title: 'Inspect & Handover',
    body: "Walkthrough under raking light. We don't leave until it's right.",
  },
]

export default function ProcessStrip() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (reduced) {
          gsap.set('.process-step', { opacity: 1, x: 0 })
          gsap.set('.process-numeral', { color: '#E8A617' })
          gsap.set('.process-fill', { scaleY: 1 })
          return
        }

        const steps = gsap.utils.toArray<HTMLElement>('.process-step')
        const numerals = gsap.utils.toArray<HTMLElement>('.process-numeral')

        // Initial state: first step active, rest dimmed & offset
        gsap.set(steps, { opacity: 0.15, x: 60 })
        gsap.set(steps[0], { opacity: 1, x: 0 })
        gsap.set(numerals[0], { color: '#E8A617' })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.5,
          },
        })

        steps.forEach((_, i) => {
          if (i === 0) return
          tl.to(steps[i - 1], { opacity: 0.4, duration: 1 }, i)
            .fromTo(steps[i], { opacity: 0.15, x: 60 }, { opacity: 1, x: 0, duration: 1 }, i)
            .to(numerals[i], { color: '#E8A617', duration: 0.4 }, i + 0.3)
        })

        // Progress rail fill tied to scroll progress
        gsap.fromTo(
          '.process-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: '+=180%',
              scrub: true,
            },
          },
        )
      })

      // Mobile / tablet: simple stagger-up reveals
      mm.add('(max-width: 1023px)', () => {
        const steps = gsap.utils.toArray<HTMLElement>('.process-step')
        steps.forEach((step) => {
          gsap.fromTo(
            step,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: reduced ? 0 : 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 85%', once: true },
            },
          )
        })
        gsap.set('.process-numeral', { color: '#E8A617' })
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} className="bg-paper py-24 md:py-[140px]">
      <div className="container grid gap-16 lg:grid-cols-5">
        {/* Left — sticky intro (40%) */}
        <div className="lg:col-span-2 lg:self-start lg:sticky lg:top-32">
          <span className="eyebrow">How We Work</span>
          <h2 className="mt-4 font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]">
            Four Steps to a Flawless Finish
          </h2>
          <p className="mt-6 max-w-md text-base leading-[1.7] text-ink-soft">
            A tight process is why our finishes hold up. No shortcuts, no surprises.
          </p>
        </div>

        {/* Right — step panels (60%) + progress rail */}
        <div className="relative lg:col-span-3">
          <div className="flex flex-col gap-10 lg:gap-16">
            {STEPS.map((step) => (
              <div key={step.n} className="process-step border-t border-line-light pt-8">
                <span
                  className="process-numeral tnum font-display text-[64px] font-extrabold leading-none md:text-[96px]"
                  style={{ WebkitTextStroke: '2px #E8A617', color: 'transparent' }}
                >
                  {step.n}
                </span>
                <h3 className="mt-4 font-display text-[22px] font-bold uppercase leading-[1.15] text-ink md:text-[26px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Progress rail — far right, desktop */}
          <div
            className="absolute -right-2 top-0 hidden h-full w-px bg-line-light lg:block"
            aria-hidden="true"
          >
            <div className="process-fill h-full w-full origin-top scale-y-0 bg-amber" />
          </div>
        </div>
      </div>
    </section>
  )
}
