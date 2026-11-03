import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import QuoteCTA from '@/components/QuoteCTA'
import ProjectGallery from '@/components/projects/ProjectGallery'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Count-up stat (design.md §5 — counters) */
function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => `${Math.round(v).toLocaleString('en-AU')}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, to, value])

  return (
    <motion.span ref={ref} className="tnum">
      {text}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/* Section 1 — Page hero (dark, compact)                               */
/* ------------------------------------------------------------------ */
function ProjectsHero() {
  return (
    <section className="relative -mt-16 flex min-h-[50dvh] flex-col justify-end overflow-hidden bg-charcoal md:-mt-20">
      {/* Board-joint diagonal pattern at 4% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #2C2925 0px, #2C2925 1px, transparent 1px, transparent 14px)',
        }}
        aria-hidden="true"
      />
      {/* Amber plumb-line motif */}
      <div
        className="pointer-events-none absolute bottom-0 left-6 top-0 hidden w-px bg-amber/40 lg:block"
        aria-hidden="true"
      >
        <span className="absolute -left-[3px] bottom-24 h-[7px] w-[7px] rotate-45 bg-amber" />
      </div>

      <div className="container relative z-10 pb-16 pt-36 md:pb-20 md:pt-44">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="eyebrow"
        >
          Our Work
        </motion.span>

        {/* Split-line headline reveal */}
        <h1 className="mt-6 font-display text-[44px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[80px]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="block"
            >
              <span className="text-amber">Proof</span>,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.47, ease: EASE }}
              className="block"
            >
              Not Promises.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          className="mt-6 max-w-[480px] text-base leading-[1.7] text-bone-soft"
        >
          A selection of recent gyprock, plastering and fit-out projects across Sydney. Every one
          finished to the same standard — flawless.
        </motion.p>

        {/* Small stat row */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
          className="mt-8 flex items-baseline gap-3 border-t border-line-dark pt-6"
        >
          <span className="font-display text-[32px] font-extrabold leading-none text-amber md:text-[40px]">
            <CountUp to={1200} suffix="+" />
          </span>
          <span className="text-[13px] font-medium tracking-[0.04em] text-bone-soft">
            projects completed across Greater Sydney
          </span>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Process micro-band (dark strip, 64px)                   */
/* ------------------------------------------------------------------ */
function ProcessMicroBand() {
  return (
    <section className="bg-charcoal-800">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="container flex min-h-16 flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4 text-center"
      >
        <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-bone md:text-base">
          Want results like these?
        </span>
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.14em] text-amber"
        >
          Start with a free quote
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5 — Testimonial pull-quote (light)                          */
/* ------------------------------------------------------------------ */
const QUOTE =
  'You can drag a light across the walls at night and not find a single ridge. Best trades we\u2019ve had through the house.'

function PullQuote() {
  const words = QUOTE.split(' ')

  return (
    <section className="bg-paper py-24 md:py-[140px]">
      <div className="container">
        <div className="mx-auto max-w-[800px] text-center">
          {/* Hairline rule draws in */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto h-px w-24 origin-left bg-line-light"
          />

          {/* Stars pop sequentially */}
          <div className="mt-8 flex justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                whileInView={{ scale: [0, 1.15, 1] }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, times: [0, 0.6, 1] }}
              >
                <Star className="h-5 w-5 fill-amber text-amber" />
              </motion.span>
            ))}
          </div>

          {/* Quote — word-by-word fade */}
          <motion.blockquote
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ staggerChildren: 0.03 }}
            className="mt-8 font-serif text-[26px] italic leading-[1.35] text-ink md:text-[34px]"
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-6 text-[13px] font-medium tracking-[0.04em] text-ink-soft"
          >
            <span className="font-display font-bold uppercase tracking-[0.08em] text-ink">
              Sarah M.
            </span>
            {' — Vaucluse renovation'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-8"
          >
            <Link
              to="/reviews"
              className="group inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber-deep"
            >
              More reviews
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto mt-8 h-px w-24 origin-right bg-line-light"
          />
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  return (
    <>
      <ProjectsHero />
      <ProjectGallery />
      <ProcessMicroBand />
      <PullQuote />
      <QuoteCTA />
    </>
  )
}
