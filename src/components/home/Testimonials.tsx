import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { ArrowRight, Star } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const TESTIMONIALS = [
  {
    quote:
      'The finish on our walls is honestly perfect. You can drag a light across them at night and not find a single ridge. Best trades we\u2019ve had through the house.',
    name: 'Sarah M.',
    role: 'Homeowner — Maroubra',
  },
  {
    quote:
      "ZL sheet and flush faster than any crew I've used, and their Level 5 work passes inspection first go. They're on every one of my builds now.",
    name: 'Dave T.',
    role: 'Builder — Inner West',
  },
  {
    quote:
      'Water-damaged ceiling gone without a trace. Turned up when they said, sheeted off everything, and left the place cleaner than they found it.',
    name: 'Priya K.',
    role: 'Homeowner — Chatswood',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-charcoal py-24 md:py-[140px]">
      <div className="container">
        <div className="text-center">
          <span className="eyebrow">Word on the Street</span>
          <div className="mt-4 overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-bone md:text-[56px]"
            >
              Sydney Rates Us 5.0
            </motion.h2>
          </div>
        </div>

        <div className="mt-14 grid gap-6 max-lg:snap-x max-lg:grid-flow-col max-lg:overflow-x-auto md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className="relative flex flex-col border border-line-dark border-l-2 border-l-amber bg-charcoal-800 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber hover:border-l-amber max-lg:min-w-[300px] max-lg:snap-start"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.12 + 0.3 + s * 0.05, ease: EASE }}
                  >
                    <Star className="h-4 w-4 fill-amber text-amber" />
                  </motion.span>
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-[1.7] text-bone">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-display text-sm font-bold uppercase tracking-[0.08em] text-bone">
                  {t.name}
                </p>
                <p className="mt-1 text-[13px] font-medium tracking-[0.04em] text-bone-soft">
                  {t.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <Link
            to="/reviews"
            className="group inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber"
          >
            Read more reviews
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-bone-soft">
            Google 5.0 ✦ Facebook 5.0 ✦ HiPages 5.0
          </p>
        </div>
      </div>
    </section>
  )
}
