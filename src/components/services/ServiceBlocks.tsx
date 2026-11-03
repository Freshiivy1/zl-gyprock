import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Service {
  id: string
  /** Secondary anchor matching footer links (e.g. /services#gyprock-installation) */
  footerId: string
  index: string
  name: string
  lead: string
  inclusions: string[]
  meta: [string, string, string]
  img: string
  imgAlt: string
  dark: boolean
  imageLeft: boolean
}

const META_LABELS = ['Typical timeframe', 'Warranty', 'Finish level'] as const

const SERVICES: Service[] = [
  {
    id: 'installation',
    footerId: 'gyprock-installation',
    index: '01',
    name: 'Gyprock & Plasterboard Installation',
    lead: 'Complete plasterboard supply and installation for new builds, extensions and granny flats. Walls and ceilings hung straight, set square, and ready for paint.',
    inclusions: [
      'New build & extension sheeting',
      'Timber & steel stud framing checks',
      'Square-set and corniced ceilings',
      'Wet-area board (bathrooms/laundries)',
      'Insulation & acoustic upgrades',
    ],
    meta: ['1–5 days typical', '7-year workmanship warranty', 'Level 4 standard, 5 on request'],
    img: '/work-2.jpg',
    imgAlt: 'Tradesman screwing gyprock sheets onto a timber stud frame at a clean new-build site',
    dark: false,
    imageLeft: false,
  },
  {
    id: 'repairs',
    footerId: 'repairs-patching',
    index: '02',
    name: 'Repairs & Patching',
    lead: "Holes, cracks, dents and water damage repaired so cleanly you'll forget where they were. We match existing textures and cornice profiles.",
    inclusions: [
      'Hole & crack repairs',
      'Water-damaged ceiling replacement',
      'Sagging ceiling re-strapping',
      'Cornice re-attachment & matching',
      'Insurance work welcome',
    ],
    meta: ['Same-day small jobs', 'Blended-in guarantee', 'Matched to existing finish'],
    img: '/work-1.jpg',
    imgAlt: 'Finished luxury living room with smooth plasterboard walls and shadow-line cornices',
    dark: true,
    imageLeft: true,
  },
  {
    id: 'plastering',
    footerId: 'plastering-flushing',
    index: '03',
    name: 'Plastering & Flushing',
    lead: 'The finish is everything. Three-coat flushing, machine-sanded between coats, checked under raking light. Level 5 and Venetian-style feature finishes available.',
    inclusions: [
      'Level 4 & Level 5 finishes',
      'Venetian / polished plaster features',
      'Skim coating over old surfaces',
      'Raking-light inspection',
      'Paint-ready handover',
    ],
    meta: ['2–4 days typical', 'Crack-free guarantee', 'Level 5 available'],
    img: '/work-5.jpg',
    imgAlt: 'Luxury bathroom renovation with a Venetian-style plaster finish and brass fixtures',
    dark: false,
    imageLeft: false,
  },
  {
    id: 'cornice',
    footerId: 'cornice-decorative',
    index: '04',
    name: 'Cornice & Decorative Plasterwork',
    lead: 'From crisp modern shadow-lines to full heritage restoration — ceiling roses, ornate cornice, arches and period profiles reproduced and installed.',
    inclusions: [
      'Heritage cornice restoration',
      'Ceiling roses & panels',
      'Shadow-line / P50 details',
      'Ornate profile matching',
      'Archways & curved details',
    ],
    meta: ['Quoted per profile', 'Period-accurate matching', 'Restoration-grade finish'],
    img: '/work-3.jpg',
    imgAlt: 'Ornate heritage cornice and ceiling rose detail in freshly painted white plasterwork',
    dark: true,
    imageLeft: true,
  },
  {
    id: 'commercial',
    footerId: 'commercial-fit-outs',
    index: '05',
    name: 'Commercial Fit-Outs',
    lead: 'Offices, retail and hospitality fit-outs delivered after-hours or staged around trading. Curved feature walls, bulkheads, acoustic and fire-rated systems.',
    inclusions: [
      'Office & retail partitions',
      'Curved plasterboard feature walls',
      'Suspended ceilings & bulkheads',
      'Acoustic & fire-rated systems',
      'After-hours works available',
    ],
    meta: ['Programmed to your fit-out', 'Fully insured commercial', 'Spec-compliant systems'],
    img: '/work-4.jpg',
    imgAlt: 'Modern commercial office fit-out with curved plasterboard feature walls and cove lighting',
    dark: false,
    imageLeft: false,
  },
  {
    id: 'renovations',
    footerId: 'renovations-extensions',
    index: '06',
    name: 'Renovations & Extensions',
    lead: 'Bathrooms, kitchens, raked ceilings and seamless joins between old and new. We make the extension disappear into the original house.',
    inclusions: [
      'Bathroom & kitchen renovations',
      'Raked / cathedral ceilings',
      'Bulkheads & cove lighting details',
      'Old-to-new seamless joins',
      'Rendering-ready surfaces',
    ],
    meta: ['Scoped with your builder', 'Dust-controlled sanding', 'Level 4–5 finishes'],
    img: '/work-6.jpg',
    imgAlt: 'Raked cathedral ceiling with plasterboard lining and warm LED cove light',
    dark: true,
    imageLeft: true,
  },
]

function ServiceBlock({ service }: { service: Service }) {
  const root = useRef<HTMLElement>(null)
  const { dark } = service

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const st = { trigger: root.current, start: 'top 72%', once: true }

      // Image curtain reveal + scale settle
      gsap.fromTo(
        '.svc-curtain',
        { xPercent: 0 },
        { xPercent: 100, duration: reduced ? 0 : 0.8, ease: 'power3.out', scrollTrigger: st },
      )
      gsap.fromTo(
        '.svc-img',
        { scale: reduced ? 1 : 1.08 },
        { scale: 1, duration: reduced ? 0 : 0.9, ease: 'power3.out', scrollTrigger: st },
      )

      // Outline numeral fades + slides down
      gsap.fromTo(
        '.svc-numeral',
        { y: reduced ? 0 : -20, opacity: 0 },
        { y: 0, opacity: 1, duration: reduced ? 0 : 0.7, ease: 'power3.out', scrollTrigger: st },
      )

      // Eyebrow rule-draw then text
      gsap.fromTo(
        '.svc-eyebrow-rule',
        { scaleX: 0 },
        { scaleX: 1, duration: reduced ? 0 : 0.6, ease: 'power3.out', scrollTrigger: st },
      )
      gsap.fromTo(
        '.svc-eyebrow-text',
        { opacity: 0 },
        { opacity: 1, duration: reduced ? 0 : 0.4, delay: 0.15, scrollTrigger: st },
      )

      // H2 mask reveal
      gsap.fromTo(
        '.svc-h2-inner',
        { yPercent: reduced ? 0 : 110 },
        {
          yPercent: 0,
          duration: reduced ? 0 : 0.9,
          ease: 'power3.out',
          delay: 0.1,
          scrollTrigger: st,
        },
      )

      // Lead + inclusions stagger in from the left
      gsap.fromTo(
        '.svc-lead',
        { y: reduced ? 0 : 20, opacity: 0 },
        { y: 0, opacity: 1, duration: reduced ? 0 : 0.7, delay: 0.2, scrollTrigger: st },
      )
      gsap.fromTo(
        '.svc-inclusion',
        { x: reduced ? 0 : -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: reduced ? 0 : 0.5,
          stagger: 0.06,
          delay: 0.25,
          scrollTrigger: st,
        },
      )

      // Meta row rules scaleX in
      gsap.fromTo(
        '.svc-meta-rule',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: reduced ? 0 : 0.7,
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: st,
        },
      )
      gsap.fromTo(
        '.svc-meta-cell',
        { y: reduced ? 0 : 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: reduced ? 0 : 0.5,
          stagger: 0.08,
          delay: 0.4,
          scrollTrigger: st,
        },
      )
      gsap.fromTo(
        '.svc-cta',
        { opacity: 0 },
        { opacity: 1, duration: reduced ? 0 : 0.5, delay: 0.55, scrollTrigger: st },
      )
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id={service.id}
      className={`relative scroll-mt-24 ${dark ? 'bg-charcoal' : 'bg-paper'}`}
    >
      {/* Secondary anchor for footer links (e.g. /services#gyprock-installation) */}
      <span id={service.footerId} className="absolute -top-16 md:-top-20" aria-hidden="true" />

      <div className="container grid items-center gap-12 py-24 md:py-[140px] lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <div
          className={`lg:col-span-5 ${service.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
            <img
              src={service.img}
              alt={service.imgAlt}
              className="svc-img h-full w-full object-cover will-change-transform"
              loading="lazy"
            />
            <div
              className={`svc-curtain absolute inset-0 z-10 will-change-transform ${
                dark ? 'bg-charcoal' : 'bg-paper'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={`relative lg:col-span-7 ${service.imageLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {/* Huge outline numeral behind content */}
          <span
            className="svc-numeral pointer-events-none absolute -top-10 left-0 select-none font-display text-[120px] font-extrabold leading-none text-amber/20 md:-top-14"
            aria-hidden="true"
          >
            {service.index}
          </span>

          <span
            className={`relative inline-flex items-center gap-3 font-display text-[12px] font-bold uppercase tracking-[0.22em] md:text-[13px] ${
              dark ? 'text-amber' : 'text-amber-deep'
            }`}
          >
            <span className="svc-eyebrow-rule inline-block h-0.5 w-6 origin-left bg-amber" />
            <span className="svc-eyebrow-text">Service {service.index}</span>
          </span>

          <h2
            className={`mt-4 overflow-hidden font-display text-[34px] font-bold uppercase leading-[1.0] tracking-[-0.015em] md:text-[56px] ${
              dark ? 'text-bone' : 'text-ink'
            }`}
          >
            <span className="svc-h2-inner block will-change-transform">{service.name}</span>
          </h2>

          <p
            className={`svc-lead mt-6 max-w-xl text-[17px] leading-[1.6] tracking-[-0.01em] md:text-[20px] ${
              dark ? 'text-bone-soft' : 'text-ink-soft'
            }`}
          >
            {service.lead}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {service.inclusions.map((item) => (
              <li
                key={item}
                className={`svc-inclusion group flex items-center gap-3 text-[15px] md:text-base ${
                  dark ? 'text-bone' : 'text-ink'
                }`}
              >
                <Check
                  className="h-4 w-4 shrink-0 text-amber transition-transform duration-300 group-hover:scale-125"
                  strokeWidth={3}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Meta row — hairline-top spec table */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {service.meta.map((value, i) => (
              <div key={META_LABELS[i]} className="relative">
                <span
                  className={`svc-meta-rule absolute left-0 top-0 h-px w-full origin-left ${
                    dark ? 'bg-line-dark' : 'bg-line-light'
                  }`}
                  aria-hidden="true"
                />
                <div className="svc-meta-cell pt-4">
                  <p
                    className={`font-display text-[11px] font-bold uppercase tracking-[0.18em] ${
                      dark ? 'text-bone-soft' : 'text-ink-soft'
                    }`}
                  >
                    {META_LABELS[i]}
                  </p>
                  <p
                    className={`mt-2 text-[15px] font-medium leading-snug ${
                      dark ? 'text-bone' : 'text-ink'
                    }`}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="svc-cta mt-8">
            <Link
              to="/contact"
              className={`group inline-flex items-center gap-2 font-display text-[14px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                dark ? 'text-amber hover:text-bone' : 'text-amber-deep hover:text-ink'
              }`}
            >
              <span className="relative">
                Get a quote for this
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    dark ? 'bg-bone' : 'bg-ink'
                  }`}
                />
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServiceBlocks() {
  return (
    <>
      {SERVICES.map((service) => (
        <ServiceBlock key={service.id} service={service} />
      ))}
    </>
  )
}
