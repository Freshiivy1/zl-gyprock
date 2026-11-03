import { motion } from 'framer-motion'
import { Clock, MapPin, ShieldCheck, Star } from 'lucide-react'

const ITEMS = [
  { icon: ShieldCheck, label: 'Licensed & Insured', sub: 'Fully covered, fully compliant' },
  { icon: Star, label: '5.0 Star Rated', sub: 'Across Google & Facebook' },
  { icon: MapPin, label: 'All Greater Sydney', sub: 'Eastern Suburbs to the Hills' },
  { icon: Clock, label: 'On Time, Every Time', sub: 'Mon–Sat, 7am–5pm' },
]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function TrustBar() {
  return (
    <section className="border-y border-line-light bg-paper">
      <div className="container grid grid-cols-2 gap-y-8 py-8 lg:grid-cols-4 lg:py-0">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.85 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
            className="flex items-center gap-4 lg:py-6"
          >
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.85 }}
              transition={{ duration: 0.5, delay: i * 0.08 + 0.1, ease: EASE }}
            >
              <item.icon className="h-6 w-6 text-amber" />
            </motion.span>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.06em] text-ink">
                {item.label}
              </p>
              <p className="mt-0.5 text-[13px] font-medium tracking-[0.04em] text-ink-soft">
                {item.sub}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
