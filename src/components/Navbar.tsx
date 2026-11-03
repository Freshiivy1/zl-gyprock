import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, X } from 'lucide-react'

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
]

function DesktopLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `group relative font-sans text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
          isActive ? 'text-amber' : 'text-bone hover:text-amber'
        }`
      }
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </NavLink>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled || open
            ? 'border-b border-line-dark bg-charcoal'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3" aria-label="ZL Gyprock home">
            <img src="/logo.png" alt="ZL Gyprock logo" className="h-10 w-10 object-contain" />
            <span className="font-display text-base font-bold uppercase tracking-[0.08em] text-bone">
              ZL Gyprock
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <DesktopLink key={l.to} {...l} />
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href="tel:1300000000"
              className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.04em] text-bone-soft transition-colors hover:text-bone"
            >
              <Phone className="h-4 w-4 text-amber" />
              1300 000 000
            </a>
            <Link to="/contact" className="btn-primary !px-6 !py-3">
              Get a Free Quote Today
            </Link>
          </div>

          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-amber" />
            <span className="h-0.5 w-6 bg-amber" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal"
          >
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="ZL Gyprock logo" className="h-10 w-10 object-contain" />
                <span className="font-display text-base font-bold uppercase tracking-[0.08em] text-bone">
                  ZL Gyprock
                </span>
              </div>
              <button
                className="flex h-11 w-11 items-center justify-center text-bone"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            <nav className="container flex flex-1 flex-col justify-center" aria-label="Mobile">
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-line-dark"
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-4 font-display text-[32px] font-bold uppercase tracking-tight ${
                        isActive ? 'text-amber' : 'text-bone'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="container flex flex-col gap-4 pb-10"
            >
              <a href="tel:1300000000" className="flex items-center gap-2 text-bone-soft">
                <Phone className="h-4 w-4 text-amber" /> 1300 000 000
              </a>
              <Link to="/contact" className="btn-primary w-full" onClick={() => setOpen(false)}>
                Get a Free Quote
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
