import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const ROWS: { label: string; value: string; rating?: boolean }[] = [
  { label: 'Licence', value: 'Licensed plasterboard contractor, NSW (placeholder #000000)' },
  { label: 'Insurance', value: 'Public liability — $20M' },
  { label: 'Warranty', value: '7-year workmanship warranty' },
  { label: 'ABN', value: '00 000 000 000 (placeholder)' },
  { label: 'Hours', value: 'Monday–Saturday, 7:00am–5:00pm' },
  { label: 'Rating', value: '5.0', rating: true },
]

export default function Credentials() {
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
          Credentials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-4 font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]"
        >
          Licensed. Insured. Guaranteed.
        </motion.h2>

        <div className="mt-12 border-t border-line-light md:mt-16">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
              className="group relative grid grid-cols-1 gap-1 border-b border-line-light py-5 transition-colors duration-300 hover:bg-paper sm:grid-cols-[240px_1fr] sm:gap-8 md:py-6"
            >
              <span
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-amber transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <p className="pl-3 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-ink-soft md:text-[13px]">
                {row.label}
              </p>
              <p className="pl-3 flex items-center gap-2 text-[15px] font-medium text-ink md:text-base">
                {row.rating ? (
                  <>
                    <span className="tnum">{row.value}</span>
                    <span className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-amber text-amber" />
                      ))}
                    </span>
                    <span className="font-normal text-ink-soft">across Google &amp; Facebook</span>
                  </>
                ) : (
                  row.value
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
