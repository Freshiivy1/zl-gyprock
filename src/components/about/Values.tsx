import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const VALUES = [
  {
    numeral: '01',
    title: 'The Finish Is Everything',
    body: "Raking-light checks before we call a job done. If we can see a joint, so can you — so we fix it.",
  },
  {
    numeral: '02',
    title: 'Straight Talk, Fixed Quotes',
    body: 'Itemised quotes within 24 hours. No allowances, no variations games, no pushy upsells.',
  },
  {
    numeral: '03',
    title: 'Clean Sites, Daily',
    body: 'Drop sheets down, dust controlled, rubbish out. We leave homes cleaner than we found them.',
  },
  {
    numeral: '04',
    title: 'On Time, Every Time',
    body: 'We turn up when we say we will — and if anything changes, you hear it from us first.',
  },
]

export default function Values() {
  return (
    <section className="bg-charcoal py-24 md:py-[140px]">
      <div className="container">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow"
        >
          How We Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-4 max-w-3xl font-display text-[34px] font-bold uppercase leading-[1.0] tracking-[-0.015em] text-bone md:text-[56px]"
        >
          Four things we don't compromise
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.numeral}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className="group border border-line-dark p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber md:p-10"
            >
              <span className="tnum inline-block origin-left font-display text-[40px] font-extrabold leading-none text-amber transition-transform duration-300 group-hover:scale-[1.08] md:text-[48px]">
                {v.numeral}
              </span>
              <h3 className="mt-6 font-display text-[22px] font-bold uppercase leading-[1.15] text-bone md:text-[26px]">
                {v.title}
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-bone-soft md:text-base">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
