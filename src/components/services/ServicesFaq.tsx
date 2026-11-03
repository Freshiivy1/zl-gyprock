import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const FAQS = [
  {
    q: 'How much does gyprock installation cost in Sydney?',
    a: 'It depends on area, access and finish level. Most residential rooms land between $45–$75 per m² installed and flushed. We give fixed, itemised quotes — no allowances, no surprises.',
  },
  {
    q: 'Can you match my existing cornice?',
    a: 'In most cases, yes. We carry common profiles and can source or reproduce heritage profiles for period homes.',
  },
  {
    q: 'How long does a typical repair take?',
    a: 'Small patches are often same-day. Ceiling replacements usually take 1–2 days including flush and sand.',
  },
  {
    q: 'Do you do Level 5 finishes?',
    a: 'Yes — we recommend it for raking light, dark or gloss paints, and feature walls. Ask at quote stage.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Fully. Licensed, insured, and all work backed by a 7-year workmanship warranty.',
  },
  {
    q: 'Which areas do you service?',
    a: 'All of Greater Sydney — Eastern Suburbs, North Shore, Inner West, Western Sydney, Sutherland Shire, Northern Beaches and the Hills District.',
  },
]

export default function ServicesFaq() {
  return (
    <section className="bg-paper py-24 md:py-[140px]">
      <div className="mx-auto max-w-[800px] px-6 md:px-12">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow !text-amber-deep"
        >
          Straight Answers
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mt-4 font-display text-[34px] font-bold uppercase leading-none tracking-[-0.015em] text-ink md:text-[56px]"
        >
          Common Questions
        </motion.h2>

        <Accordion type="single" collapsible className="mt-10 md:mt-14">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
            >
              <AccordionItem value={`faq-${i}`} className="border-b border-line-light">
                <AccordionTrigger className="py-6 font-display text-[15px] font-bold uppercase tracking-[0.06em] text-ink no-underline transition-colors duration-300 hover:text-amber-deep hover:no-underline data-[state=open]:text-amber-deep md:text-lg [&>svg]:text-amber [&>svg]:size-5 [&>svg]:transition-transform [&>svg]:duration-300">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] leading-[1.7] text-ink-soft md:text-base data-[state=closed]:animate-[accordion-up_0.35s_cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-[accordion-down_0.35s_cubic-bezier(0.22,1,0.36,1)]">
                  <p className="pb-2">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
