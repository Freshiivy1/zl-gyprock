import { Link } from 'react-router'
import { ArrowUp, Clock, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import { scrollToTop } from '@/lib/lenis'

const MARQUEE_ITEMS = [
  'Gyprock Installation',
  'Repairs',
  'Plastering',
  'Cornice',
  'Fit-Outs',
  'Renovations',
]

const SERVICE_LINKS = [
  { label: 'Gyprock Installation', to: '/services#gyprock-installation' },
  { label: 'Repairs & Patching', to: '/services#repairs-patching' },
  { label: 'Plastering & Flushing', to: '/services#plastering-flushing' },
  { label: 'Cornice & Decorative', to: '/services#cornice-decorative' },
  { label: 'Commercial Fit-Outs', to: '/services#commercial-fit-outs' },
  { label: 'Renovations & Extensions', to: '/services#renovations-extensions' },
]

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get a Quote', to: '/contact' },
]

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-display text-lg font-extrabold uppercase tracking-[0.08em] text-charcoal"
        >
          <span className="px-6">{item}</span>
          <span className="text-charcoal/70">✦</span>
        </span>
      ))}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-charcoal">
      {/* Amber marquee band (design.md §6.2) */}
      <div className="group overflow-hidden border-y border-amber-deep/40 bg-amber py-4">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          <MarqueeRow />
          <MarqueeRow />
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>

      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        {/* Col 1 — brand */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ZL Gyprock logo" className="h-12 w-12 object-contain" />
            <span className="font-display text-lg font-bold uppercase tracking-[0.08em] text-bone">
              ZL Gyprock
            </span>
          </div>
          <p className="font-serif text-xl italic text-bone-soft">
            “We do it right. We are Gyprockers.”
          </p>
          <p className="text-sm leading-relaxed text-bone-soft">
            Premium gyprock installation, plastering and repairs across Greater Sydney. Licensed,
            insured, and obsessed with the finish.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber text-amber transition-colors duration-300 hover:bg-amber hover:text-charcoal"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-amber text-amber transition-colors duration-300 hover:bg-amber hover:text-charcoal"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Col 2 — services */}
        <div>
          <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-amber">
            Services
          </h4>
          <ul className="flex flex-col gap-3">
            {SERVICE_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-bone-soft transition-colors duration-300 hover:text-amber"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — quick links */}
        <div>
          <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-amber">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-sm text-bone-soft transition-colors duration-300 hover:text-amber"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — contact */}
        <div>
          <h4 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-amber">
            Contact
          </h4>
          <ul className="flex flex-col gap-4 text-sm text-bone-soft">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-amber" />
              <a href="tel:1300000000" className="transition-colors hover:text-bone">
                1300 000 000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-amber" />
              <a href="mailto:info@zlgyprock.com.au" className="transition-colors hover:text-bone">
                info@zlgyprock.com.au
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-amber" />
              Sydney NSW
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-4 w-4 shrink-0 text-amber" />
              Mon–Sat 7am–5pm
            </li>
          </ul>
          <p className="mt-4 text-xs text-bone-soft/70">ABN 00 000 000 000</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line-dark">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-[13px] text-bone-soft">© 2025 ZL Gyprock. All rights reserved.</p>
          <p className="text-[13px] text-bone-soft">
            Licensed &amp; Insured · Servicing Greater Sydney
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center border border-amber text-amber transition-colors duration-300 hover:bg-amber hover:text-charcoal"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
