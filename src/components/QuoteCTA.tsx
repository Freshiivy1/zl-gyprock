import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

/** Shared Quote CTA band (design.md §6.6). Used on multiple pages. */
export default function QuoteCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      {/* Faint diagonal "board joint" texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #2C2925 0px, #2C2925 1px, transparent 1px, transparent 14px)',
        }}
        aria-hidden="true"
      />
      {/* Amber radial glow, subtle pulse */}
      <motion.div
        className="pointer-events-none absolute left-1/4 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, #E8A617, transparent)' }}
        animate={{ opacity: [0.15, 0.22, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="container relative flex flex-col gap-10 py-24 md:py-32 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Get Started</span>
          <h2 className="mt-4 font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-bone md:text-[56px]">
            Ready for walls done right?
          </h2>
          <p className="mt-5 max-w-xl text-base leading-[1.7] text-bone-soft md:text-lg">
            Get a fixed quote within 24 hours. No obligation, no pushy sales — just straight advice
            from real gyprockers.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 sm:flex-row lg:flex-col"
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
