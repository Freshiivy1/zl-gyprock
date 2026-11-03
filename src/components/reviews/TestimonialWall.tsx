import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from './data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

/** Masonry testimonial wall (reviews.md §3) */
export default function TestimonialWall() {
  return (
    <section className="bg-paper py-24 md:py-[140px]">
      <div className="container">
        {/* Masonry via CSS columns — cards vary in length naturally */}
        <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ y: 36, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: EASE }}
              className={`mb-8 break-inside-avoid border border-l-[3px] p-8 transition-all duration-300 last:mb-0 hover:-translate-y-1 hover:border-amber hover:border-l-amber hover:shadow-elevated ${
                t.featured
                  ? 'border-line-dark bg-charcoal'
                  : 'border-line-light bg-paper'
              }`}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <motion.span
                    key={s}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: (i % 3) * 0.08 + 0.3 + s * 0.05,
                      ease: EASE,
                    }}
                  >
                    <Star className="h-4 w-4 fill-amber text-amber" />
                  </motion.span>
                ))}
              </div>
              <blockquote
                className={`mt-5 text-base leading-[1.7] ${
                  t.featured ? 'text-bone' : 'text-ink'
                }`}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p
                  className={`font-display text-sm font-bold uppercase tracking-[0.08em] ${
                    t.featured ? 'text-bone' : 'text-ink'
                  }`}
                >
                  {t.name}
                </p>
                <p
                  className={`mt-1 text-[13px] font-medium tracking-[0.04em] ${
                    t.featured ? 'text-bone-soft' : 'text-ink-soft'
                  }`}
                >
                  {t.role}, {t.suburb}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
