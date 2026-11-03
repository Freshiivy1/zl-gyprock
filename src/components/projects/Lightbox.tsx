import { useCallback, useEffect } from 'react'
import { Link } from 'react-router'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import type { Project } from './data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface LightboxProps {
  projects: Project[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/**
 * Full-screen project detail lightbox (projects.md §3).
 * Radix Dialog supplies Esc-to-close, focus trap and scroll lock;
 * Framer Motion supplies the panel spring, curtain reveal, Ken Burns
 * drift and prev/next cross-fades.
 */
export default function Lightbox({ projects, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null
  const project = open ? projects[index] : null

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + projects.length) % projects.length)
  }, [index, projects.length, onNavigate])

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % projects.length)
  }, [index, projects.length, onNavigate])

  // Keyboard navigation: ← / → (Esc handled by Radix Dialog)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, goPrev, goNext])

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose()
      }}
    >
      <AnimatePresence>
        {open && project && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop: charcoal 96% + blur 8px, fade 0.25s */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[70] bg-charcoal/95 backdrop-blur-[8px]"
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 24 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 30 }}
                className="fixed inset-0 z-[80] flex items-center justify-center p-4 outline-none md:p-10"
              >
                <div className="relative max-h-[88dvh] w-full max-w-[1100px] overflow-hidden border border-line-dark bg-charcoal-800 shadow-elevated">
                  {/* Close: X top-right, hover amber + rotate 90° */}
                  <DialogPrimitive.Close
                    aria-label="Close project details"
                    className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center border border-line-dark bg-charcoal/70 text-bone backdrop-blur-sm transition-all duration-300 hover:rotate-90 hover:border-amber hover:text-amber"
                  >
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex max-h-[88dvh] flex-col md:grid md:grid-cols-[3fr_2fr]"
                    >
                      {/* Left 60% — image with Ken Burns drift + curtain reveal */}
                      <div className="relative h-64 shrink-0 overflow-hidden sm:h-80 md:h-auto md:min-h-[560px]">
                        <motion.img
                          src={project.img}
                          alt={project.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          animate={{ scale: [1, 1.05] }}
                          transition={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: 'mirror',
                            ease: 'easeInOut',
                          }}
                        />
                        <motion.div
                          initial={{ x: '0%' }}
                          animate={{ x: '100%' }}
                          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
                          className="absolute inset-0 z-10 bg-charcoal-800"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Right 40% — details (scrollable) */}
                      <div className="flex min-h-0 flex-col gap-5 overflow-y-auto p-6 md:p-9">
                        <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-amber">
                          {project.category}
                        </p>
                        <DialogPrimitive.Title asChild>
                          <h2 className="font-display text-[26px] font-bold uppercase leading-[1.05] tracking-[-0.015em] text-bone md:text-[34px]">
                            {project.title}
                          </h2>
                        </DialogPrimitive.Title>
                        <p className="flex items-center gap-2 text-[13px] font-medium tracking-[0.04em] text-bone-soft">
                          <MapPin className="h-4 w-4 text-amber" />
                          {project.location}
                        </p>
                        <DialogPrimitive.Description asChild>
                          <p className="text-[15px] leading-[1.7] text-bone-soft">
                            {project.scope}
                          </p>
                        </DialogPrimitive.Description>

                        {/* Details spec list — hairline rows */}
                        <div className="mt-1">
                          <p className="mb-2 font-display text-[12px] font-bold uppercase tracking-[0.22em] text-amber">
                            Details
                          </p>
                          <dl className="border-t border-line-dark">
                            {(
                              [
                                ['Suburb', project.spec.suburb],
                                ['Service', project.spec.service],
                                ['Finish level', project.spec.finish],
                                ['Duration', project.spec.duration],
                              ] as const
                            ).map(([label, value]) => (
                              <div
                                key={label}
                                className="flex items-center justify-between gap-4 border-b border-line-dark py-3"
                              >
                                <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-bone-soft">
                                  {label}
                                </dt>
                                <dd className="text-right text-[13px] font-semibold text-bone">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        {/* Prev / next */}
                        <div className="mt-1 flex items-center gap-3">
                          <button
                            onClick={goPrev}
                            aria-label="Previous project"
                            className="flex h-11 w-11 items-center justify-center border border-line-dark text-bone transition-colors duration-300 hover:border-amber hover:text-amber"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={goNext}
                            aria-label="Next project"
                            className="flex h-11 w-11 items-center justify-center border border-line-dark text-bone transition-colors duration-300 hover:border-amber hover:text-amber"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          <span className="tnum ml-2 text-[13px] font-medium tracking-[0.08em] text-bone-soft">
                            {index + 1} / {projects.length}
                          </span>
                        </div>

                        <Link to="/contact" className="btn-primary mt-2 w-full" onClick={onClose}>
                          Get a similar finish
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
