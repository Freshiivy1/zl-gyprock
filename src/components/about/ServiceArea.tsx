import { memo } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const REGIONS = [
  'Eastern Suburbs',
  'North Shore',
  'Inner West',
  'Western Sydney',
  'Sutherland Shire',
  'Northern Beaches',
  'Hills District',
  'Sydney CBD',
  'Canterbury-Bankstown',
  'St George',
]

/** Perpetual pulse ring isolated + memoized so it never restarts on parent renders */
const PulsingMapPin = memo(function PulsingMapPin() {
  return (
    <span className="relative flex h-12 w-12 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border border-amber"
        animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        aria-hidden="true"
      />
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-amber bg-amber/10">
        <MapPin className="h-5 w-5 text-amber" />
      </span>
    </span>
  )
})

export default function ServiceArea() {
  return (
    <section className="bg-charcoal py-24 md:py-[140px]">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow"
          >
            Where We Work
          </motion.span>
          <h2 className="mt-4 font-display text-[34px] font-bold uppercase leading-[1.0] tracking-[-0.015em] text-bone md:text-[56px]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                className="block will-change-transform"
              >
                All of
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
                className="block will-change-transform"
              >
                Greater Sydney
              </motion.span>
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="mt-6 max-w-[520px] text-[15px] leading-[1.7] text-bone-soft md:text-base"
          >
            Based in Sydney and servicing the entire metro. If you're in Greater Sydney, we'll come
            to you — measure, quote and deliver.
          </motion.p>
        </div>

        {/* Right — coverage panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="border border-line-dark bg-charcoal-800 p-8 md:p-10"
        >
          <PulsingMapPin />
          <div className="mt-8 flex flex-wrap gap-3">
            {REGIONS.map((region, i) => (
              <motion.span
                key={region}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.04, ease: EASE }}
                className="inline-flex items-center gap-2 border border-line-dark px-4 py-2 text-[13px] font-medium tracking-[0.04em] text-bone transition-colors duration-300 hover:border-amber"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                {region}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-[13px] leading-[1.5] tracking-[0.04em] text-bone-soft"
          >
            Outside these areas? Ask us — we travel for the right projects.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
