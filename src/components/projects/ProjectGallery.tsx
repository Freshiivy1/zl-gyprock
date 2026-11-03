import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { FILTERS, PROJECTS } from './data'
import type { FilterKey } from './data'
import ProjectCard from './ProjectCard'
import Lightbox from './Lightbox'

/**
 * Filter bar + masonry-feel gallery grid (projects.md §2).
 * Filter switching uses Framer Motion layout animations — cards reflow
 * with a spring (stiffness 260, damping 30), non-matching cards
 * fade + scale 0.95 out.
 */
export default function ProjectGallery() {
  const [filter, setFilter] = useState<FilterKey>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  /** After the first filter interaction, re-entering cards skip the curtain reveal */
  const interacted = useRef(false)

  const filtered =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.filter === filter)

  const select = (f: FilterKey) => {
    interacted.current = true
    setFilter(f)
  }

  return (
    <section className="bg-paper">
      {/* Sticky-under-nav filter bar */}
      <div className="sticky top-16 z-30 border-b border-line-light bg-paper md:top-20">
        <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {FILTERS.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => select(f)}
                  className={`rounded-none px-4 py-2 font-display text-[12px] font-bold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active
                      ? 'bg-amber text-charcoal'
                      : 'border border-line-light text-ink-soft hover:border-amber hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>
          <p className="tnum text-[13px] font-medium tracking-[0.04em] text-ink-soft">
            Showing {filtered.length} / {PROJECTS.length}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="container py-16 md:py-24">
        <motion.div layout className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                instant={interacted.current}
                onOpen={() =>
                  setOpenIndex(PROJECTS.findIndex((p) => p.id === project.id))
                }
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink-soft">
            No {filter.toLowerCase()} projects shown here yet — ask us for recent examples when
            you&nbsp;
            <Link
              to="/contact"
              className="font-semibold text-amber-deep underline underline-offset-4"
            >
              request a quote
            </Link>
            .
          </p>
        )}
      </div>

      <Lightbox
        projects={PROJECTS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </section>
  )
}
