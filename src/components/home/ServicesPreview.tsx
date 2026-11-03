import { motion } from 'framer-motion'
import { Link } from 'react-router'
import {
  ArrowRight,
  Building2,
  Crown,
  Hammer,
  Layers,
  PaintRoller,
  Ruler,
} from 'lucide-react'

export const SERVICES = [
  {
    index: '01',
    title: 'Gyprock Installation',
    icon: Layers,
    anchor: 'gyprock-installation',
    body: 'New builds, extensions & full sheet installation — square-set or corniced, nailed off and flushed.',
  },
  {
    index: '02',
    title: 'Repairs & Patching',
    icon: Hammer,
    anchor: 'repairs-patching',
    body: 'Holes, cracks, water damage and sagging ceilings made invisible.',
  },
  {
    index: '03',
    title: 'Plastering & Flushing',
    icon: PaintRoller,
    anchor: 'plastering-flushing',
    body: 'Level 4 & 5 finishes, Venetian-style feature walls, glass-flat surfaces.',
  },
  {
    index: '04',
    title: 'Cornice & Decorative',
    icon: Crown,
    anchor: 'cornice-decorative',
    body: 'Heritage restoration, ceiling roses, ornate profiles, shadow-line details.',
  },
  {
    index: '05',
    title: 'Commercial Fit-Outs',
    icon: Building2,
    anchor: 'commercial-fit-outs',
    body: 'Offices, retail & hospitality — curved walls, bulkheads, acoustic systems.',
  },
  {
    index: '06',
    title: 'Renovations & Extensions',
    icon: Ruler,
    anchor: 'renovations-extensions',
    body: 'Bathrooms, raked ceilings, bulkheads and seamless old-to-new joins.',
  },
]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function ServicesPreview() {
  return (
    <section className="bg-charcoal py-24 md:py-[140px]">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">What We Do</span>
            <div className="mt-4 overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-bone md:text-[56px]"
              >
                Gyprock, Done Properly
              </motion.h2>
            </div>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber"
          >
            All Services
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px border border-line-dark bg-line-dark md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: EASE }}
              className="group relative flex h-full flex-col bg-charcoal-800 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:bg-charcoal-800 hover:shadow-elevated"
            >
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-amber" />
              <div className="flex items-start justify-between">
                <s.icon className="h-8 w-8 text-amber transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110" />
                <span className="font-display text-sm font-bold tracking-[0.14em] text-bone-soft/60">
                  {s.index}
                </span>
              </div>
              <h3 className="mt-8 font-display text-[22px] font-bold uppercase leading-[1.15] text-bone md:text-[26px]">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-bone-soft">{s.body}</p>
              <Link
                to={`/services#${s.anchor}`}
                className="mt-6 inline-flex items-center gap-2 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-amber"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
