import { memo } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Phone, Star } from 'lucide-react'
import QuoteCTA from '@/components/QuoteCTA'
import CategoryHighlights from '@/components/reviews/CategoryHighlights'
import TestimonialWall from '@/components/reviews/TestimonialWall'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PLATFORMS = ['Google', 'Facebook', 'HiPages']

/** Perpetual amber glow behind the star row — isolated + memoized (react-dev perf rule) */
const StarGlow = memo(function StarGlow() {
  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: 'radial-gradient(closest-side, #E8A617, transparent)' }}
      animate={{ opacity: [0.12, 0.2, 0.12] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
})

/* ------------------------------------------------------------------ */
/* Section 1 — Page hero + rating summary (dark, centered)             */
/* ------------------------------------------------------------------ */
function ReviewsHero() {
  return (
    <section className="relative -mt-16 flex min-h-[60dvh] flex-col items-center justify-center overflow-hidden bg-charcoal text-center md:-mt-20">
      <div className="container relative z-10 flex flex-col items-center pb-20 pt-36 md:pt-44">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="eyebrow"
        >
          Reviews
        </motion.span>

        {/* Split-line headline reveal */}
        <h1 className="mt-6 font-display text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[80px]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
              className="block"
            >
              Sydney Rates Us
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.47, ease: EASE }}
              className="block text-amber"
            >
              5.0 Out of 5.
            </motion.span>
          </span>
        </h1>

        {/* Star row — the hero moment. Stars pop in one-by-one (scale 0→1.15→1) */}
        <div className="relative mt-8">
          <StarGlow />
          <div className="relative flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.15, 1] }}
                transition={{
                  delay: 0.9 + i * 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 18,
                }}
              >
                <Star className="h-8 w-8 fill-amber text-amber" />
              </motion.span>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-[1.7] text-bone-soft"
        >
          120+ verified reviews across Google, Facebook and HiPages — homeowners, builders and
          project managers.
        </motion.p>

        {/* Platform chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PLATFORMS.map((platform, i) => (
            <motion.span
              key={platform}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 + i * 0.06, ease: EASE }}
              className="border border-line-dark px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-bone-soft"
            >
              {platform} <span className="tnum text-amber">5.0</span>
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Review CTA strip (dark)                                 */
/* ------------------------------------------------------------------ */
function ReviewCtaStrip() {
  return (
    <section className="bg-charcoal">
      <div className="container grid gap-10 py-16 md:py-20 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <h3 className="font-display text-[22px] font-bold uppercase leading-[1.15] text-bone md:text-[26px]">
            Had work done by us?
          </h3>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-bone-soft">
            We&rsquo;d love to hear how we went — and if you&rsquo;re researching, ask us for
            references you can actually call.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="flex flex-col gap-4 sm:flex-row lg:justify-end"
        >
          <Link to="/contact" className="btn-primary">
            Get a Free Quote
          </Link>
          <a href="tel:1300000000" className="btn-outline-dark">
            <Phone className="h-4 w-4" />
            Call 1300 000 000
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default function Reviews() {
  return (
    <>
      <ReviewsHero />
      <CategoryHighlights />
      <TestimonialWall />
      <ReviewCtaStrip />
      <QuoteCTA />
    </>
  )
}
