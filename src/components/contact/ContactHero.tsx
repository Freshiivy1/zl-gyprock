import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Section 1 — Page hero (dark, minimal): compact band, bottom-left content, amber plumb-line. */
export default function ContactHero() {
  return (
    <section className="relative -mt-16 flex min-h-[40vh] flex-col justify-end overflow-hidden bg-charcoal pb-32 pt-32 md:-mt-20 md:pb-36 md:pt-40">
      {/* Board-joint diagonal pattern at 4% opacity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #2C2925 0px, #2C2925 1px, transparent 1px, transparent 14px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="flex gap-6">
          {/* Amber plumb-line motif */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            className="hidden w-0.5 shrink-0 origin-top self-stretch bg-amber md:block"
            aria-hidden="true"
          />
          <div>
            {/* Eyebrow with rule-draw */}
            <span className="eyebrow">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                Get a Free Quote
              </motion.span>
            </span>

            {/* H1 — split-line clip reveal */}
            <h1 className="mt-5 font-display text-[40px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-bone md:text-[80px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                >
                  Let&rsquo;s <span className="text-amber">Talk</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="block will-change-transform"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
                >
                  Your Project.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
              className="mt-6 max-w-[480px] text-base leading-[1.7] text-bone-soft md:text-lg"
            >
              Fixed, itemised quote within 24 hours. No obligation, no pushy sales — just straight
              advice from real gyprockers.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
