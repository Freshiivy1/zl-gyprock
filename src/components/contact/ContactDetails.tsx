import { motion } from 'framer-motion'
import { Check, Clock, Mail, MapPin, Phone, ShieldCheck, Star } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Detail = {
  icon: LucideIcon
  label: string
  value: string
  sub: string
  href?: string
}

const DETAILS: Detail[] = [
  {
    icon: Phone,
    label: 'Phone',
    value: '1300 000 000',
    sub: 'Mon–Sat, 7am–5pm',
    href: 'tel:1300000000',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@zlgyprock.com.au',
    sub: 'We reply within one business day',
    href: 'mailto:info@zlgyprock.com.au',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Sydney NSW',
    sub: 'Servicing all Greater Sydney',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Monday–Saturday 7:00am–5:00pm',
    sub: 'Sunday closed',
  },
]

const REGIONS = [
  'Eastern Suburbs',
  'North Shore',
  'Inner West',
  'Western Sydney',
  'Sutherland Shire',
  'Northern Beaches',
  'Hills District',
  'CBD',
]

const ASSURANCES = [
  { icon: ShieldCheck, text: 'Licensed & insured' },
  { icon: Star, text: '5.0 rated across Sydney' },
  { icon: Check, text: 'Fixed quote in 24 hours' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
}

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
}

function DetailRow({ icon: Icon, label, value, sub, href }: Detail) {
  const inner = (
    <>
      <Icon
        className="mt-1 h-5 w-5 shrink-0 text-amber transition-transform duration-300 group-hover:translate-x-[3px]"
        aria-hidden="true"
      />
      <div>
        <div className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-soft">
          {label}
        </div>
        <div className="mt-1 text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-amber-deep">
          {value}
        </div>
        <div className="mt-0.5 text-sm text-ink-soft">{sub}</div>
      </div>
    </>
  )

  const className = 'group flex items-start gap-4 py-5'
  return href ? (
    <a href={href} className={className}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  )
}

/** Section 2 (right) — contact details, service-area card, assurance strip. */
export default function ContactDetails() {
  return (
    <motion.aside
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8"
      aria-label="Contact details"
    >
      {/* Hairline-divided detail list */}
      <motion.div variants={item} className="divide-y divide-line-light border-y border-line-light">
        {DETAILS.map((d) => (
          <DetailRow key={d.label} {...d} />
        ))}
      </motion.div>

      {/* Service area card */}
      <motion.div variants={item} className="bg-charcoal p-6 md:p-8">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-amber" aria-hidden="true" />
          <h3 className="font-display text-base font-bold uppercase tracking-[0.08em] text-bone">
            We Come to You
          </h3>
        </div>
        <motion.div
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
          }}
          className="mt-5 flex flex-wrap gap-2"
        >
          {REGIONS.map((region) => (
            <motion.span
              key={region}
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: EASE } },
              }}
              className="inline-flex items-center gap-2 border border-line-dark px-3 py-1.5 text-[13px] font-medium tracking-[0.04em] text-bone-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
              {region}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Assurance strip */}
      <motion.div variants={item} className="flex flex-col gap-3">
        {ASSURANCES.map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-3">
            <Icon className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
            <span className="text-sm font-semibold text-ink">{text}</span>
          </div>
        ))}
      </motion.div>
    </motion.aside>
  )
}
