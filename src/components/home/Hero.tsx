import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const HEADLINE_LINES = [
  { text: 'FLAWLESS WALLS.', highlight: null },
  { text: 'PERFECT CEILINGS.', highlight: 'PERFECT' },
  { text: 'DONE RIGHT.', highlight: null },
]

function renderLine(text: string, highlight: string | null) {
  if (!highlight) return text
  const [before, after] = text.split(highlight)
  return (
    <>
      {before}
      <span className="text-amber">{highlight}</span>
      {after}
    </>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Load-in timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '.hero-bg-img',
        { scale: reduced ? 1 : 1.1 },
        { scale: 1, duration: 1.4 },
        0,
      )
        .fromTo('.hero-gradient', { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
        .fromTo('.hero-eyebrow-rule', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0.3)
        .fromTo('.hero-eyebrow-text', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.35)
        .fromTo(
          '.hero-line-inner',
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, stagger: 0.14 },
          0.5,
        )
        .fromTo(
          '.hero-fade',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          1.1,
        )
        .fromTo(
          '.hero-btn',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          1.3,
        )
        .fromTo('.hero-stats', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.6)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.7)

      if (!reduced) {
        // Parallax: image 0.3x, headline 0.15x (depth effect)
        gsap.to('.hero-bg-img', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        gsap.to('.hero-headline-block', {
          yPercent: 15,
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
      className="relative -mt-16 flex min-h-[100dvh] flex-col justify-end overflow-hidden bg-charcoal md:-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/hero.jpg"
          alt=""
          className="hero-bg-img h-full w-full object-cover will-change-transform"
        />
        <div
          className="hero-gradient absolute inset-0"
          style={{
            background:
              'linear-gradient(to top right, rgba(22,21,19,0.75) 0%, rgba(22,21,19,0.45) 45%, rgba(22,21,19,0.25) 100%)',
          }}
        />
      </div>

      {/* Content — bottom-left */}
      <div className="container relative z-10 pb-24 pt-40 md:pb-28">
        <div className="hero-headline-block flex gap-6">
          {/* Amber plumb line */}
          <div className="hero-fade hidden w-0.5 shrink-0 bg-amber md:block md:h-[120px] md:self-start" />
          <div>
            <span className="inline-flex items-center gap-3 font-display text-[13px] font-bold uppercase tracking-[0.22em] text-amber max-md:text-[12px]">
              <span
                className="hero-eyebrow-rule inline-block h-0.5 w-6 origin-left bg-amber"
                aria-hidden="true"
              />
              <span className="hero-eyebrow-text">Sydney&apos;s Gyprock Specialists</span>
            </span>

            <h1 className="mt-6 font-display text-[44px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[96px]">
              {HEADLINE_LINES.map((line) => (
                <span key={line.text} className="block overflow-hidden">
                  <span className="hero-line-inner block will-change-transform">
                    {renderLine(line.text, line.highlight)}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-fade mt-6 font-serif text-[26px] italic leading-[1.35] text-bone-soft">
              “We do it right. We are Gyprockers.”
            </p>

            <p className="hero-fade mt-4 max-w-[480px] text-base leading-[1.7] text-bone-soft">
              Premium gyprock installation, plastering and repairs across Greater Sydney. Licensed,
              insured, and obsessed with the finish.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="hero-btn btn-primary">
                Get a Free Quote
              </Link>
              <Link to="/projects" className="hero-btn btn-outline-dark">
                See Our Work <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip — bottom-right */}
      <div className="hero-stats absolute bottom-24 right-6 z-10 hidden items-center gap-3 text-[13px] font-medium tracking-[0.04em] text-bone-soft md:right-12 lg:flex">
        <span>15+ Years</span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
        <span>1,200+ Projects</span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
        <span>5.0★ Rated</span>
      </div>

      {/* Scroll indicator — bottom-center */}
      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="h-8 w-px bg-bone/50" aria-hidden="true" />
        <span className="animate-scroll-pulse text-[10px] font-medium uppercase tracking-[0.3em] text-bone-soft">
          Scroll
        </span>
      </div>
    </section>
  )
}
