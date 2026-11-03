import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PARAGRAPHS = [
  "ZL Gyprock started the way good trades businesses do — on the tools. After years sheeting and flushing across Sydney's eastern suburbs, we saw the same thing over and over: rushed jobs, hollow-sounding walls, and finishes that fall apart under afternoon light.",
  "So we built a crew that does it properly. Fixed quotes. Clean sites. Three-coat flushes sanded between coats and checked under raking light. Level 5 where the light demands it — and honest advice where it doesn't.",
  'Today we handle everything from single patches to full commercial fit-outs across Greater Sydney. Same crew, same standard, same promise: we do it right.',
]

export default function OurStory() {
  return (
    <section className="bg-paper py-24 md:py-[140px]">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left — sticky header */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow !text-amber-deep"
            >
              Our Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mt-4 font-display text-[34px] font-bold uppercase leading-[1.0] tracking-[-0.015em] text-ink md:text-[56px]"
            >
              Built on the tools, not in an office
            </motion.h2>
          </div>
        </div>

        {/* Right — scrolling body copy */}
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-6">
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={p.slice(0, 24)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: EASE }}
                className="text-[15px] leading-[1.7] text-ink-soft md:text-base"
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, skewX: -4, y: 16 }}
              whileInView={{ opacity: 1, skewX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="mt-4 font-serif text-[24px] italic leading-[1.35] text-ink md:text-[28px]"
            >
              — The ZL Gyprock team, Sydney
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
