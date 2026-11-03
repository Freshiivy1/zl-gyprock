import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ROWS: { label: string; l4: string; l5: string }[] = [
  {
    label: 'Best for',
    l4: 'Most rooms, standard lighting',
    l5: 'Raking light, gloss paint, feature walls',
  },
  { label: 'Process', l4: '3-coat joint system, sanded', l5: 'Level 4 + full skim coat' },
  { label: 'Look', l4: 'Flat, paint-ready', l5: 'Glass-flat, critical-light ready' },
  { label: 'Cost', l4: 'Included standard', l5: 'Quoted upgrade' },
]

export default function FinishLevels() {
  return (
    <section className="bg-paper-dim py-24 md:py-[140px]">
      <div className="container">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow !text-amber-deep"
        >
          Know Your Finish
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-4 font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]"
        >
          Level 4 vs Level 5
        </motion.h2>

        <div className="mt-12 md:mt-16">
          {/* Column headers */}
          <div className="grid grid-cols-[0.7fr_1fr_1fr] gap-4 border-b-2 border-ink pb-4 md:gap-8">
            <span className="sr-only">Attribute</span>
            {['Level 4 — Standard', 'Level 5 — Premium'].map((h, i) => (
              <motion.p
                key={h}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                className={`font-display text-[13px] font-bold uppercase tracking-[0.14em] md:text-[15px] ${
                  i === 1 ? 'text-amber-deep' : 'text-ink'
                }`}
              >
                {h}
              </motion.p>
            ))}
          </div>

          {/* Spec rows */}
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="group relative grid grid-cols-[0.7fr_1fr_1fr] gap-4 border-b border-line-light py-5 transition-colors duration-300 hover:bg-paper md:gap-8 md:py-6"
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-amber transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <p className="pl-3 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-ink-soft md:text-[13px]">
                {row.label}
              </p>
              <p className="text-[14px] leading-relaxed text-ink md:text-base">{row.l4}</p>
              <p className="text-[14px] leading-relaxed text-ink md:text-base">{row.l5}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-2xl text-[13px] leading-[1.5] tracking-[0.04em] text-ink-soft"
        >
          Not sure which you need? We'll tell you straight at the quote — we only recommend Level 5
          where light actually demands it.
        </motion.p>
      </div>
    </section>
  )
}
