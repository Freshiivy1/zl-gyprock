import { motion } from 'framer-motion'
import { PRAISE_CATEGORIES } from './data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Category highlight cards (reviews.md §2) */
export default function CategoryHighlights() {
  return (
    <section className="bg-paper pt-24 md:pt-[140px]">
      <div className="container">
        <span className="eyebrow">What People Praise</span>
        <div className="mt-4 overflow-hidden">
          <motion.h2
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="max-w-3xl font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]"
          >
            The same four things, every time
          </motion.h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRAISE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.keyword}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="group flex flex-col border border-line-light bg-paper p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber"
            >
              <cat.icon
                className="h-8 w-8 text-amber transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.75}
              />
              <h3 className="mt-6 font-display text-[28px] font-extrabold uppercase leading-[1.1] tracking-[-0.01em] text-ink">
                <span className="relative inline-block">
                  {cat.keyword}
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </span>
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink-soft">{cat.line}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
