import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Section 3 — FAQ teaser strip (light, paper-dim). Slides in from left on scroll. */
export default function FaqTeaser() {
  return (
    <section className="border-y border-line-light bg-paper-dim">
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="container flex flex-col gap-5 py-14 md:flex-row md:items-center md:justify-between md:py-16"
      >
        <div>
          <h3 className="font-display text-[22px] font-bold uppercase leading-[1.15] text-ink md:text-[26px]">
            Questions First?
          </h3>
          <p className="mt-2 text-base leading-[1.7] text-ink-soft">
            Check the common questions on our services page.
          </p>
        </div>
        <Link
          to="/services#faq"
          className="group inline-flex shrink-0 items-center gap-2 font-display text-[14px] font-bold uppercase tracking-[0.12em] text-ink"
        >
          <span className="relative">
            Read the FAQ
            <span
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-out group-hover:scale-x-100"
              aria-hidden="true"
            />
          </span>
          <ArrowRight
            className="h-4 w-4 text-amber transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </section>
  )
}
