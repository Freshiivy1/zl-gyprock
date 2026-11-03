import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function AboutHero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.ab-bg-img',
        { scale: reduced ? 1 : 1.08 },
        { scale: 1, duration: reduced ? 0 : 1.2 },
        0,
      )
        .fromTo('.ab-gradient', { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
        .fromTo('.ab-plumb', { scaleY: 0 }, { scaleY: 1, duration: 0.8 }, 0.3)
        .fromTo('.ab-eyebrow-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.3)
        .fromTo('.ab-eyebrow-text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.4)
        .fromTo(
          '.ab-line-inner',
          { yPercent: reduced ? 0 : 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.5,
        )
        .fromTo('.ab-body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)

      if (!reduced) {
        // Parallax 0.25x on scroll
        gsap.to('.ab-bg-img', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      className="relative -mt-16 flex min-h-[65dvh] flex-col justify-end overflow-hidden bg-charcoal md:-mt-20"
    >
      {/* Background image + charcoal gradient (80% left → 40% right) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/hero.jpg"
          alt=""
          className="ab-bg-img h-full w-full object-cover will-change-transform"
        />
        <div
          className="ab-gradient absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(22,21,19,0.8) 0%, rgba(22,21,19,0.6) 50%, rgba(22,21,19,0.4) 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 pb-20 pt-40 md:pb-24">
        <div className="flex gap-6">
          {/* Amber plumb line */}
          <div
            className="ab-plumb hidden w-0.5 shrink-0 origin-top self-start bg-amber md:block md:h-[120px]"
            aria-hidden="true"
          />
          <div>
            <span className="inline-flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-amber md:text-[13px]">
              <span className="ab-eyebrow-rule inline-block h-0.5 w-6 origin-left bg-amber" />
              <span className="ab-eyebrow-text">About ZL Gyprock</span>
            </span>
            <h1 className="mt-5 font-display text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[80px]">
              <span className="block overflow-hidden">
                <span className="ab-line-inner block will-change-transform">We do it right.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="ab-line-inner block text-amber will-change-transform">
                  We are{' '}
                  <span className="font-serif normal-case italic tracking-normal">
                    Gyprockers.
                  </span>
                </span>
              </span>
            </h1>
            <p className="ab-body mt-6 max-w-[520px] text-[15px] leading-[1.7] text-bone-soft md:text-base">
              A Sydney crew of career plasterers who treat every wall like it's our own name on it —
              because it is.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
